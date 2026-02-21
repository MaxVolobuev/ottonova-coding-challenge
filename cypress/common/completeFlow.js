import { goToBirthdateStep } from "./preconditions";
import InsuranceStatus from "../pages/insuranceStatus.js";
import Kinder from "../pages/kinder.js";
import Tariff from "../pages/tariff.js";
import Result from "../pages/result.js";
import { ROUTES as DEFAULT_ROUTES } from "../fixtures/routes";
import { verifyRoute } from "../utils/routesChecker";

const insuranceStatusPage = new InsuranceStatus();
const tariffPage = new Tariff();
const kinderPage = new Kinder();
const resultPage = new Result();

export const completeForm = (data = {}) => {
  goToBirthdateStep(data);

  const {
    routes = DEFAULT_ROUTES,
    insuranceStatus,
    hasChildren,
    tariff,
    resultUrl,
    resultText,
    user,
  } = data;

  verifyRoute(routes, "INSURANCE_STATUS");
  insuranceStatusPage.fillInsuranceStatusPage({ insuranceStatus });

  verifyRoute(routes, "KIDS");
  kinderPage.fillKinderPage({ hasChildren });

  verifyRoute(routes, "TARIFF");
  tariffPage.fillTariffPage({ tariff });

  verifyRoute(routes, "ANGEBOT");
  resultPage.verifyAngebot({ text: resultText });
  resultPage.scheduleConsultation();

  verifyRoute(routes, "RESULT");
  resultPage.fillResultPage(user, { resultUrl });
};
