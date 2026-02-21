import { toNumber } from "../utils/numbers";
import { EMPLOYMENT_STATUS } from "../fixtures/employmentStatus";

const professionalStatusLocators = {
  status: {
    [EMPLOYMENT_STATUS.EMPLOYED]: "employment-status-option-employed",
    [EMPLOYMENT_STATUS.SELF_EMPLOYED]: "employment-status-option-self-employed",
    [EMPLOYMENT_STATUS.CIVIL_SERVANT]: "employment-status-option-civil-servant",
    [EMPLOYMENT_STATUS.CIVIL_SERVANT_CANDIDATE]: "employment-status-option-civil-servant-candidate",
    [EMPLOYMENT_STATUS.STUDENT]: "employment-status-option-student",
    [EMPLOYMENT_STATUS.TRAINEE]: "employment-status-option-trainee",
  },
  inputs: {
    income: '[data-cy="income-input"]',
  },
  buttons: {
    continue: '[data-cy="employment-status-continue"]',
    back: '[class="btn outline back-button"]', // TODO add data-cy="employment-status-back"
  },
  ui: {
    incomeDisclaimer: ".income-limit-disclaimer-balloon",
  },
};

class ProfessionalStatus {
  statusOption(statusKey) {
    const status = professionalStatusLocators.status[statusKey];
    if (!status) throw new Error(`Unknown employment status: ${statusKey}`);

    return cy.get(`[data-cy="${status}"]`).should("be.visible");
  }

  get yearlyAmountInput() {
    return cy.get(professionalStatusLocators.inputs.income).should("be.visible");
  }

  get nextBtn() {
    return cy.get(professionalStatusLocators.buttons.continue).should("be.visible");
  }

  get incomeLimitDisclaimerBalloon() {
    return cy.get(professionalStatusLocators.ui.incomeDisclaimer).should("be.visible");
  }

  selectStatus(statusKey) {
    this.statusOption(statusKey).click();
  }

  nextBtnClick() {
    this.nextBtn.click();
  }

  yearlyAmountType(amount) {
    this.yearlyAmountInput.type(amount);
  }

  incomeLimitDisclaimerBalloonText(text) {
    this.incomeLimitDisclaimerBalloon
      .invoke("text")
      .then((t) => t.replace(/\u00A0/g, " "))
      .should("include", text);
  }

  fillProfessionalStatusPage({ employmentStatus, salary, incomeThreshold, employmentStatusText }) {
    const numericIncome = toNumber(salary);

    this.selectStatus(employmentStatus);
    this.yearlyAmountType(numericIncome);
    if (numericIncome > incomeThreshold) {
      cy.log("Full insurance income > 77400");
      this.incomeLimitDisclaimerBalloonText(employmentStatusText);
      this.nextBtnClick();
    } else {
      cy.log("Clinic insurance income < 77400");
      this.nextBtnClick();
    }
  }
}

export default ProfessionalStatus;
