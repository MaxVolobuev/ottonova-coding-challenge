import { testData } from "../../fixtures/testData.js";
import { almost16, almost18, over101, futureBirthdate } from "../../utils/dates.js";
import { locales } from "../../fixtures/locales.js";
import { goToBirthdateStep } from "../../common/preconditions.js";
import Birthdate from "../../pages/birthdate.js";
import { getBirthdateValidation } from "../../fixtures/birthdateValidation.js";
import { incomeThresholds } from "../../fixtures/businessRules.js";
import { EMPLOYMENT_STATUS } from "../../fixtures/employmentStatus.js";

const birthday = new Birthdate();

describe("Birthdate field validations", () => {
  locales.forEach((locale) => {
    const { name, startPath, cookie, employmentStatus } = locale;

    const data = {
      startPath,
      cookieText: cookie.accept,
      employmentStatus: EMPLOYMENT_STATUS.EMPLOYED,
      incomeThreshold: incomeThresholds.pkv2026,
      employmentStatusText: employmentStatus.salaryMore69750,
      startInsuranceDate: testData.startInsuranceDate.firstJune26,
    };

    const BIRTHDATE_VALIDATION = () => getBirthdateValidation(locale);
    const BV = BIRTHDATE_VALIDATION();

    it(`Birthdate validation 60k & Clinic insurance validation (${name}) - min age 16`, () => {
      goToBirthdateStep({ ...data, salary: testData.prices.price77400 });
      birthday.fillBirthdate({ ...almost16, validation: BV.MIN_AGE_16 });
    });

    it(`Birthdate validation (${name}) - min age 18`, () => {
      goToBirthdateStep({ ...data, salary: testData.prices.price80k });
      birthday.fillBirthdate({ ...almost18, validation: BV.MIN_AGE_18 });
    });

    it(`Birthdate validation (${name}) - max age 101`, () => {
      goToBirthdateStep({ ...data, salary: testData.prices.price100k });
      birthday.fillBirthdate({ ...over101, validation: BV.MAX_AGE });
    });

    it(`Birthdate validation (${name}) - future birthdate`, () => {
      goToBirthdateStep({ ...data, salary: testData.prices.price77500 });
      birthday.fillBirthdate({ ...futureBirthdate, validation: BV.FUTURE_DATE });
    });
  });
});
