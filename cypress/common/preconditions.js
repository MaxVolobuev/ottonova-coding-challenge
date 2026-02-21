import { acceptAllCookies, denyAllCookies } from "../utils/cookies.js";
import ProfessionalStatus from "../pages/professionalStatus";
import Insurance from "../pages/insurance";
import Birthdate from "../pages/birthdate";
import { verifyRoute } from "../utils/routesChecker.js";
import { ROUTES as DEFAULT_ROUTES } from "../fixtures/routes";

const professionalStatusPage = new ProfessionalStatus();
const insurancePage = new Insurance();
const birthdayPage = new Birthdate();

export const goToBirthdateStep = (data = {}) => {
  const {
    startPath,
    routes = DEFAULT_ROUTES,
    cookiesAccept = true,
    cookieText,
    employmentStatus,
    salary,
    incomeThreshold,
    employmentStatusText,
    startInsuranceDate,
    birthdate,
  } = data;

  cy.visit(startPath);
  verifyRoute(routes, "EMPLOYEE_STATUS");

  if (cookiesAccept) acceptAllCookies(cookieText);
  else denyAllCookies(cookieText);

  professionalStatusPage.fillProfessionalStatusPage({
    employmentStatus,
    salary,
    incomeThreshold,
    employmentStatusText,
  });

  verifyRoute(routes, "INSURANCE_REQUEST");
  insurancePage.fillInsurancePage({
    salary,
    incomeThreshold,
    startInsuranceDate,
  });

  verifyRoute(routes, "BIRTHDATE");
  if (birthdate) {
    birthdayPage.fillBirthdatePage({ birthdate });
  }
};
