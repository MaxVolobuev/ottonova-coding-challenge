import { birthdateLocators } from "../pages/birthdate";

export const getBirthdateValidation = (locale) => ({
  MIN_AGE_18: {
    selector: birthdateLocators.validation.MIN_AGE,
    text: locale.birthdateValidation.minAge18,
  },
  MIN_AGE_16: {
    selector: birthdateLocators.validation.MIN_AGE,
    text: locale.birthdateValidation.minAge16,
  },
  FUTURE_DATE: {
    selector: birthdateLocators.validation.FUTURE_DATE,
    text: locale.birthdateValidation.futureDate,
  },
  MAX_AGE: {
    selector: birthdateLocators.validation.MAX_AGE,
    text: locale.birthdateValidation.maxAge101,
  },
});
