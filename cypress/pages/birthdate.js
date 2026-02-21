export const birthdateLocators = {
  inputs: {
    day: '[data-cy="day"]',
    month: '[data-cy="month"]',
    year: '[data-cy="year"]',
  },
  buttons: {
    continue: '[data-cy="birthday-continue"]',
    back: '[class="btn outline back-button"]', // TODO add data-cy="birthday-back"
  },
  validation: {
    MIN_AGE: '[data-cy="min-age-validation-message"]',
    FUTURE_DATE: '[data-cy="negative-age-validation-message"]',
    MAX_AGE: '[data-cy="max-age-validation-message"]',
  },
};

class Birthdate {
  get dayBirthdateInput() {
    return cy.get(birthdateLocators.inputs.day);
  }

  get monthBirthdateInput() {
    return cy.get(birthdateLocators.inputs.month);
  }

  get yearBirthdateInput() {
    return cy.get(birthdateLocators.inputs.year);
  }

  get nextBtn() {
    return cy.get(birthdateLocators.buttons.continue);
  }

  nextBtnClick() {
    this.nextBtn.click();
  }

  fillBirthdate({ day, month, year, validation = null } = {}) {
    this.dayBirthdateInput.clear().type(day);
    this.monthBirthdateInput.clear().type(month);
    this.yearBirthdateInput.clear().type(year);

    if (validation) {
      cy.get(validation.selector).should("be.visible").and("contain.text", validation.text);
      this.nextBtn.should("be.disabled");
    }
  }

  fillBirthdatePage({ birthdate }) {
    this.nextBtn.should("be.disabled");
    this.fillBirthdate(birthdate);
    this.nextBtn.should("not.be.disabled");
    this.nextBtnClick();
  }
}

export default Birthdate;
