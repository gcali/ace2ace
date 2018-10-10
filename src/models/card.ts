import Suit from "./registry/suit";

class Card {
    constructor(public readonly value: number, public readonly suit: Suit) {

    }

    public serialize(): number {
        return (this.suit.valueOf() << 4) | this.value;
    }

    public static fromSerialized(serialized: number): Card {
        let value = serialized & 0xF;
        let suit = (serialized >> 4) & 0x3;
        return new Card(value, suit);
    }
}

export default Card;