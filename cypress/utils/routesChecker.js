export const verifyRoute = (routes, key) => {
  if (!routes || !routes[key]) return;
  cy.url().should("include", routes[key]);
};
