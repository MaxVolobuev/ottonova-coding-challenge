import { toNumber } from "../utils/numbers";

const insuranceLocators = {
  insuranceType: {
    fullInsurance: '[data-cy="full-insurance"]',
    clinicInsurance: '[data-cy="clinic-insurance"]',
  },
  select: {
    startDate: '[data-cy="ingress-date"]',
  },
  buttons: {
    continue: '[data-cy="insurance-product-continue"]',
  },
};

class Insurance {
  get selectStartDate() {
    return cy.get(insuranceLocators.select.startDate);
  }

  get continueBtn() {
    return cy.get(insuranceLocators.buttons.continue).should("be.visible");
  }

  selectFullInsurance() {
    return cy.get(insuranceLocators.insuranceType.fullInsurance).should("be.visible").click();
  }

  selectClinicInsurance() {
    return cy.get(insuranceLocators.insuranceType.clinicInsurance).should("be.visible").click();
  }

  selectStartDateClick(value) {
    this.selectStartDate.select(value).should("include.text", value);
  }

  continueBtnClick() {
    this.continueBtn.click();
  }

  fillInsurancePage({ salary, incomeThreshold, startInsuranceDate }) {
    const numericIncome = toNumber(salary);

    if (numericIncome > incomeThreshold) {
      this.selectFullInsurance();
    } else {
      this.selectClinicInsurance();
    }

    this.selectStartDateClick(startInsuranceDate);
    this.continueBtnClick();
  }
}

export default Insurance;
