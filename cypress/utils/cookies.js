/**
 * @param {"accept" | "deny"} actionType
 * @param {string} text - The expected text on the button to click
 */
const clickConsent = (actionType, text) => {
  cy.get("body").then(($body) => {
    cy.wait(1000).then(() => {
      const root = $body.find("aside#usercentrics-cmp-ui");

      if (!root.length) return;

      cy.wrap(root)
        .shadow()
        .find(`button[data-action="consent"][data-action-type="${actionType}"]`)
        .contains(text)
        .click({ force: true });
    });
  });
};

export const acceptAllCookies = (text) => clickConsent("accept", text);
export const denyAllCookies = (text) => clickConsent("deny", text);
