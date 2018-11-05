import { expect } from "chai";
import Board from "./board";

describe("Board", () => {
    it("creates an empty new game", () => {
        const game = new Board();
        expect(game.deck.length()).to.be.equal(104);
        expect(game.discards.length()).to.be.equal(0);
        expect(game.firstHand.length()).to.be.equal(0);
        expect(game.secondHand.length()).to.be.equal(0);
    });

    it("sets up table with the same cards for each hand", () => {
        const game = new Board();
        var totalCards = game.deck.length();
    });
});
