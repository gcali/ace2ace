import Deck from "./deck";
import { expect } from "chai";
import Card from "../models/card";

function repeatTenTimes(callback: (() => void)): void {
    for (let i = 0; i < 10; i++) {
        callback();
    }
}
describe("Deck", () => {
    it("serializes a deck", () => {
        repeatTenTimes(() => {
            const deck = new Deck();
            const serialized = deck.serialize();
            expect(serialized).to.have.lengthOf(52 * 2);
        });
    });

    it('deserializes a full deck', () => {
        repeatTenTimes(() => {
            const deck = new Deck();
            const serialized = deck.serialize();
            const deserialized = Deck.fromSerialized(serialized);
            expect(deserialized.cards.count()).to.be.equal(deck.cards.count());
        });
    });

    it('deserialies a full deck in order', () => {
        repeatTenTimes(() => {
            const deck = new Deck();
            const serialized = deck.serialize();
            const deserialized = Deck.fromSerialized(serialized);
            deck.cards.zip(deserialized.cards).forEach(t => {
                const o: Card = t[0];
                const d: Card = t[0];
                expect(o.equals(d)).to.be.true;
            });
        });
    });

});