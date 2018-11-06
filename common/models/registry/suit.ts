import { Set } from "@node/immutable";
enum Suit {
    Hearts = 0,
    Spades = 1,
    Clubs = 2,
    Diamonds = 3
}


export const allSuits = Set.of<Suit>(Suit.Hearts, Suit.Spades, Suit.Clubs, Suit.Diamonds);
export default Suit;