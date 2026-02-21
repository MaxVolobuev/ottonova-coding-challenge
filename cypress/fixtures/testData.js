import generateEmail from "../utils/generateEmail";

export const testData = {
  user: {
    name: "Automation",
    lastName: "Test",
    phone: "012345678911",
    email: generateEmail,
  },
  prices: {
    price77400: "77.400",
    price77500: "77.500",
    price80k: "80.000",
    price100k: "100.000",
  },
  startInsuranceDate: {
    firstJune26: "01.06.2026",
  },
  insuranceStatus: {
    general: "general",
  },
  hasChildren: {
    yes: "yes",
    no: "no",
  },
  tarrifs: {
    recommended: "recommended",
  },
};
