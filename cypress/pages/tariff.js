const insuranceLocators = {
  tariffType: {
    recommended: '[data-cy="tariff-options-recommended-continue"]',
    configuration: '[data-cy="tariff-options-configure-continue"]',
  },
  buttons: {
    back: '[class="btn outline back-button"] ', // TODO add data-cy="tariff-back"
  },
};

class Tariff {
  get recommendedTariffOption() {
    return cy.get(insuranceLocators.tariffType.recommended).should("be.visible");
  }

  get configurationTariffOption() {
    return cy.get(insuranceLocators.tariffType.configuration).should("be.visible");
  }

  get backBtn() {
    return cy.get(insuranceLocators.buttons.back).should("be.visible");
  }

  selectRecommendedTariff() {
    this.recommendedTariffOption.click();
  }

  selectConfigurationTariff() {
    this.configurationTariffOption.click();
  }

  backBtnClick() {
    this.backBtn.click();
  }

  fillTariffPage({ tariffType = "recommended" }) {
    if (tariffType === "recommended") {
      this.selectRecommendedTariff();
    } else if (tariffType === "configuration") {
      this.selectConfigurationTariff();
    } else {
      throw new Error(`Unknown tariff type: ${tariffType}`);
    }
    cy.contains("Perfekt. Wir erstellen dein Angebot!");
  }
}

export default Tariff;
