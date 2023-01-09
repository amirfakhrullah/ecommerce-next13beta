export const verifySignature = (sig: string | string[] | undefined) => {
  if (typeof sig === "string") {
    const splitSig = sig.split(",");
    let keyVal: { [key: string]: string } = {};
    splitSig.forEach((val) => {
      const splitVal = val.split("=");
      keyVal[splitVal[0]] = keyVal.split[1];
      return 
    });
  }
  return "";
};
