import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import rawBody from "raw-body";
import { stripe } from "../../../lib/servers/stripe";
import env from "../../../env";
import db from "../../../lib/servers/prismadb";
import { Status } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = await rawBody(req);
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    return res.status(400).end();
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (ex) {
    if (ex instanceof Error) {
      return res.status(400).send(`Webhook error: ${ex.message}`);
    } else {
      return res.status(400).send("Webhook error occurred");
    }
  }

  const eventObj = event.data.object as Stripe.PaymentIntent;
  const stripePaymentIntentId = eventObj.id;
  const stripePaymentIntentClientSecret = eventObj.client_secret;

  let status: Status | undefined;

  switch (event.type) {
    case "payment_intent.created":
      status = "Processing";
      break;
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

  if (stripePaymentIntentId && stripePaymentIntentClientSecret && status) {
    await db.order.updateMany({
      where: {
        stripePaymentIntentId,
        stripePaymentClientSecret: stripePaymentIntentClientSecret,
      },
      data: {
        status,
        updatedAt: new Date(),
      },
    });
  }

  res.status(200).end();
}
