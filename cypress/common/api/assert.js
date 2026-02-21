import { ROUTES } from "../api/routes";
import { ENDPOINTS } from "../api/endpoints";
import { testData } from "../../fixtures/api/testData";

/**
 * @typedef {Object} GetOptions
 * @property {boolean} [failOnStatusCode=true]
 */

/**
 * Base GET request (Node layer).
 * @param {string} url
 * @param {GetOptions} [options]
 */
const requestGET = (url, options = {}) => {
  const { failOnStatusCode = true } = options;

  return cy.request({
    method: "GET",
    url,
    failOnStatusCode,
  });
};

/**
 * Build and send GET request to PokeAPI resource.
 * @param {string} type - Resource type (e.g. "pokemon", "ability")
 * @param {string} [name] - Optional resource name or id
 * @returns {Cypress.Chainable<Cypress.Response<any>>}
 */
const getResponse = (type, name = "") => {
  const url = name ? `${ROUTES.API}/${type}/${name}` : `${ROUTES.API}/${type}`;
  return requestGET(url);
};

/**
 * Request pokemon by name and assert response.
 * All checks are optional via expected.
 *
 * @param {string} name
 * @param {{
 *   status?: number,
 *   ability?: string,
 *   isHidden?: boolean,
 *   id?: number,
 *   height?: number,
 *   heldItem?: string
 * }} [expected]
 */
export const verifyPokemon = (name, expected = {}) => {
  const {
    status = testData.statusCodes.status200,
    ability,
    isHidden,
    id,
    height,
    heldItem,
  } = expected;

  return getResponse(ENDPOINTS.POKEMON, name).then((res) => {
    expect(res.status).to.eq(status);
    expect(res.body.name).to.eq(name);

    if (typeof id === "number") {
      expect(res.body.id).to.eq(id);
    }

    if (typeof height === "number") {
      expect(res.body.height).to.eq(height);
    }

    if (ability) {
      const abilities = res.body.abilities || [];
      const found = abilities.find((a) => a.ability?.name === ability);
      expect(found, `ability ${ability} exists`).to.exist;

      if (typeof isHidden === "boolean") {
        expect(found.is_hidden).to.eq(isHidden);
      }
    }

    if (heldItem) {
      const items = (res.body.held_items || []).map((i) => i.item?.name).filter(Boolean);

      expect(items).to.include(heldItem);
    }

    return res;
  });
};
