import Suit from "./registry/suit";
import Equatable from "./equatable";

class Card implements Equatable<Card> {

    constructor(public readonly value: number, public readonly suit: Suit) {

    }

    public equals(other: Card): boolean {
        return this.suit === other.suit && this.value === other.value;
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