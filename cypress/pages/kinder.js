const kinderLocators = {
  kids: {
    hasKids: '[data-cy="insure-children-button"]',
    noKids: '[data-cy="no-children-button"]',
  },
  buttons: {
    continue: '[data-cy="children-no-kids-continue"]',
    back: '[class="btn outline back-button"]', // TODO add data-cy="children-no-kids-back"
  },
};

class Kinder {
  get hasKidsOption() {
    return cy.get(kinderLocators.kids.hasKids).should("be.visible");
  }

  get noKidsOption() {
    return cy.get(kinderLocators.kids.noKids).should("be.visible");
  }

  get continueBtn() {
    return cy.get(kinderLocators.buttons.continue).should("be.visible");
  }

  selectHasKids() {
    this.hasKidsOption.click();
  }

  selectNoKids() {
    this.noKidsOption.click();
  }

  continueBtnClick() {
    this.continueBtn.click();
  }

  fillKinderPage({ hasKids = false }) {
    if (hasKids) {
      this.selectHasKids();
    } else {
      this.selectNoKids();
    }
    this.continueBtnClick();
  }
}

export default Kinder;
