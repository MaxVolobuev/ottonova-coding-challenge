const insuranceStatusLocators = {
  insuranceType: {
    generalInsurance: '[data-cy="insurance-status-statutory"]',
    privateInsurance: '[data-cy="insurance-status-private"]',
  },
  buttons: {
    continue: '[data-cy="insurance-status-continue"]',
    back: '[class="btn outline back-button"]', // TODO add data-cy="insurance-status-back"
  },
};

class InsuranceStatus {
  selectGeneralInsurance() {
    return cy
      .get(insuranceStatusLocators.insuranceType.generalInsurance)
      .should("be.visible")
      .click();
  }

  selectPrivateInsurance() {
    return cy
      .get(insuranceStatusLocators.insuranceType.privateInsurance)
      .should("be.visible")
      .click();
  }

  continueBtnClick() {
    cy.get(insuranceStatusLocators.buttons.continue).should("be.visible").click();
  }

  backBtnClick() {
    cy.get(insuranceStatusLocators.buttons.back).should("be.visible").click();
  }

  fillInsuranceStatusPage({ insuranceStatus = "general" }) {
    if (insuranceStatus === "general") {
      this.selectGeneralInsurance();
    } else if (insuranceStatus === "private") {
      this.selectPrivateInsurance();
    } else {
      throw new Error(`Unknown insurance status: ${insuranceStatus}`);
    }
    this.continueBtnClick();
  }
}
export default InsuranceStatus;
