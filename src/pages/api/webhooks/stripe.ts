import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import rawBody from "raw-body";
import { stripe } from "../../../lib/servers/stripe";
import env from "../../../env";
import db from "../../../lib/servers/prismadb";
import { Status } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = await rawBody(req);
  const signature = req.headers["stripe-signature"] ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (ex) {
    if (ex instanceof Error) {
      console.error(`Webhook error: ${ex.message}`);
    } else {
      console.error(`Webhook error: ${JSON.stringify(ex)}`);
    }
    return res.status(400).end();
  }

  const eventObj = event.data.object as Stripe.PaymentIntent;
  const stripePaymentIntent = eventObj.id;

  let status: Status | undefined;

  switch (event.type) {
    case "payment_intent.succeeded":
      status = "Paid";
      break;
    case "payment_intent.processing":
      status = "Processing";
      break;
    case "payment_intent.payment_failed":
      status = "Failed";
      break;
    default:
      status = undefined;
      break;
  }

  if (stripePaymentIntent && status) {
    await db.order.updateMany({
      where: {
        stripePaymentIntent,
      },
      data: {
        status,
      },
    });
  }

  res.status(200).end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
