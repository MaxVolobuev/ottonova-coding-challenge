import { testData } from "../../fixtures/api/testData";
import { ROUTES } from "../api/routes";

/**
 * Browser fetch to allow cy.intercept mocking.
 * @param {string} url
 */
const browserFetch = (url) => {
  cy.visit("/");
  cy.log(`browserFetch → ${url}`);
  return cy.window({ log: false }).then((win) => win.fetch(url));
};

/**
 * Mock GET request and assert status via browser fetch.
 * Returns intercepted response for further assertions.
 *
 * @param {Object} params
 * @param {string} params.type - API resource type (e.g. "pokemon")
 * @param {string} params.name - Resource identifier (e.g. "charmander")
 * @param {number} params.statusCode - Expected mocked status code
 * @param {string} [params.result="Not Found"] - Mocked response message
 * @param {string} [params.alias="mocked404"] - Alias name for cy.intercept
 * @returns {Cypress.Chainable<any>}
 */
export const verifyMocked404 = ({
  type,
  name,
  statusCode = testData.statusCodes.status404,
  result = testData.charmander.message,
  alias = testData.alias.mocked404,
}) => {
  const url = `${ROUTES.API}/${type}/${name}`;

  cy.intercept("GET", url, {
    statusCode: statusCode,
    body: { message: result },
  }).as(alias);

  browserFetch(url);

  return cy.wait(`@${alias}`).then((interception) => {
    expect(interception.response?.statusCode).to.eq(statusCode);
    expect(interception.response?.body?.message).to.eq(result);
    return interception.response;
  });
};
