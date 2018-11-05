import Deck from "./deck";
import { expect } from "chai";
import Card from "../models/card";
import { List } from "immutable";

function repeatTenTimes(callback: (() => void)): void {
    for (let i = 0; i < 10; i++) {
        callback();
    }
}
describe("Deck", () => {
    it("serializes a deck", () => {
        const deck = new Deck();
        const serialized = deck.serialize();
        expect(serialized).to.have.lengthOf(52 * 2);
    });

    it('deserializes a full deck', () => {
        const deck = new Deck();
        const serialized = deck.serialize();
        const deserialized = Deck.fromSerialized(serialized);
        expect(deserialized.cards.count()).to.be.equal(deck.cards.count());
    });

    it('deserialies a full deck in order', () => {
        const deck = new Deck();
        const serialized = deck.serialize();
        const deserialized = Deck.fromSerialized(serialized);
        deck.cards.zip(deserialized.cards).forEach(t => {
            const o: Card = t[0];
            const d: Card = t[0];
            expect(o.equals(d)).to.be.true;
        });
    });

    it('shuffles at least one of two decks', () => {
        let atLeastOnce = false;
        for (let i = 0; i < 2; i++) {
            var deck = new Deck();
            atLeastOnce = atLeastOnce || deck.shuffle().serialize() !== deck.serialize();
        }
        expect(atLeastOnce).to.be.true;
    });
    it('keeps the same length when shuffling', () => {
        let deck = new Deck();
        expect(deck.cards.count()).to.be.equal(deck.shuffle().cards.count());
    });

    it('has 0 cards in an empty deck', () => {
        expect(Deck.empty().cards.isEmpty()).to.be.true;
    });

    it('concatenates decks', () => {
        const firstDrawn = new Deck().drawCards(10).drawn
        const secondDrawn = new Deck().drawCards(10).newDeck.drawCards(10).drawn;

        const concatenated = firstDrawn.concat(secondDrawn);
        expect(concatenated.serialize()).to.be.equal(firstDrawn.serialize() + secondDrawn.serialize());
    });

    it('mantains card numbers when chunk-serializing', () => {
        const deck = new Deck();
        const chunkSerialized = deck.chunkSerialize();
        expect(List(chunkSerialized).count()).to.be.equal(deck.length());
    });

});