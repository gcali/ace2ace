import Card from "./card";
import Suit from "./registry/suit";
import { allSuits } from "./registry/suit";
import { expect } from "chai";
import { Range } from "immutable";

describe("Card", function () {
    it("serializes a card", function () {
        const card = new Card(12, Suit.Clubs);
        expect(card.serialize()).to.be.equal(0x2c);
    });
    it("deserializes a card", function () {
        const serialized = 0x2c;
        const card = Card.fromSerialized(serialized);
        const expectedCard = new Card(12, Suit.Clubs);
        expect(Card.fromSerialized(serialized).equals(expectedCard)).to.be.true;
    });
    it("serializes and back one card", function () {
        const card = new Card(12, Suit.Clubs);
        expect(Card.fromSerialized(card.serialize()).equals(card)).to.be.true;
    })
    it("serializes and back all cards", function () {

        Range(1, 14).map(v => {
            return allSuits.map(s => new Card(v, s)).toList();
        }).toList().flatten().forEach((c: Card) => {
            const serialized = c.serialize();
            expect(Card.fromSerialized(serialized).equals(c)).to.be.true;
            expect(Card.fromSerialized(serialized).serialize()).to.be.equal(serialized);
        });
    });
});