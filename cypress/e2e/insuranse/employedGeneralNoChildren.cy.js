import { testData } from "../../fixtures/testData";
import { locales } from "../../fixtures/locales";
import { justOver18 } from "../../utils/dates";
import { incomeThresholds } from "../../fixtures/businessRules";
import { completeForm } from "../../common/completeFlow";
import { generateEmail } from "../../utils/generateEmail";
import { EMPLOYMENT_STATUS } from "../../fixtures/employmentStatus";

describe("Calculation form complete", () => {
  locales.forEach((locale) => {
    const { name, startPath, cookie, employmentStatus, resultText } = locale;
    const data = {
      startPath: startPath,
      cookieText: cookie.accept,
      employmentStatus: EMPLOYMENT_STATUS.EMPLOYED,
      salary: testData.prices.price80k,
      incomeThreshold: incomeThresholds.pkv2026,
      employmentStatusText: employmentStatus.salaryMore69750,
      startInsuranceDate: testData.startInsuranceDate.firstJune26,
      birthdate: justOver18,

      insuranceStatus: testData.insuranceStatus.general,
      hasChildren: testData.hasChildren.no,
      tariff: testData.tarrifs.recommended,
      resultText: resultText,

      user: {
        name: testData.user.name,
        lastName: testData.user.lastName,
        phone: testData.user.phone,
        email: generateEmail(),
      },
    };

    it(`Full Insurance employed 80k per year (${name})`, () => {
      completeForm({ ...data });
    });
  });
});
