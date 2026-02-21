const resultLocators = {
  input: {
    name: '[data-cy="first-name"]',
    lastName: '[data-cy="last-name"]',
    phone: '[data-cy="phone-number"]',
    email: '[data-cy="email"]',
  },
  buttons: {
    scheduleConsultation: '[data-cy="result-request-consultation"]',
  },
  text: {
    angebot: '[class="question"]',
  },
};
class Result {
  get nameInput() {
    return cy.get(resultLocators.input.name).should("be.visible");
  }

  get lastNameInput() {
    return cy.get(resultLocators.input.lastName).should("be.visible");
  }

  get phoneInput() {
    return cy.get(resultLocators.input.phone).should("be.visible");
  }

  get emailInput() {
    return cy.get(resultLocators.input.email).should("be.visible");
  }

  get scheduleConsultationOption() {
    return cy.get(resultLocators.buttons.scheduleConsultation).should("be.visible");
  }

  scheduleConsultation() {
    this.scheduleConsultationOption.first().click();
  }

  verifyAngebot({ text }) {
    cy.get(resultLocators.text.angebot).should("be.visible").and("contain.text", text);
  }

  fillResultPage({ name, lastName, phone, email }) {
    this.nameInput.clear().type(name);
    this.lastNameInput.clear().type(lastName);
    this.phoneInput.clear().type(phone);
    this.emailInput.clear().type(email);
  }
}

export default Result;
