import { testData } from "../../../fixtures/api/testData";
import { verifyPokemon } from "../../../common/api/assert";
import { verifyMocked404 } from "../../../common/api/browserFetch";

describe("PokeAPI tests", () => {
  it("GET pikachu - assertions 200", () => {
    verifyPokemon(testData.pokemon.name, {
      ability: testData.pokemon.ability,
      isHidden: testData.pokemon.isHidden,
      id: testData.pokemon.id,
      height: testData.pokemon.height,
      heldItem: testData.pokemon.heldItem,
    });
  });

  it("GET charmander - check 404 Not Found", () => {
    verifyMocked404({
      type: testData.pokemon.name,
      name: testData.charmander.name,
    });
  });
});
