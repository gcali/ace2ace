import { Range, List, Seq, Collection } from "immutable";
import { allSuits } from "../models/registry/suit";
import Card from "../models/card";
import { padLeft } from "./utils";

export interface DrawResult {
	drawn: Deck,
	newDeck: Deck
}


class Deck {
	readonly cards: List<Card>;
	constructor(cards: List<Card> = null, shouldShuffle: boolean = false) {
		if (cards !== null) {
			this.cards = cards;
		}
		else {
			let cards = allSuits.map(
				suit => Range(1, 14).map(
					i => (new Card(i, suit))
				)
			).flatten(true).toList();
			if (shouldShuffle) {
				cards = Deck._shuffleCards(cards);
			}
			this.cards = cards;
		}
	}

	public shuffle(): Deck {
		return new Deck(Deck._shuffleCards(this.cards));
	}

	private static _shuffleCards(cards: List<Card>): List<Card> {
		return cards.sortBy(Math.random).toList();
	}

	public drawCards(n: number = 1): DrawResult {
		let takenCards = this.cards.take(n);
		return {
			drawn: new Deck(takenCards.toList()),
			newDeck: new Deck(this.cards.skip(n).toList())
		};
		//return [new Deck(this.cards.skip(n).toList()), new Deck(takenCards.toList())];
	}

	public serialize(): string {
		let serializedCards = List(this.chunkSerialize());
		return serializedCards.join("");
	}

	public chunkSerialize(): Iterator<string> {
		return this.cards.map(card => padLeft(card.serialize().toString(16), 2)).values();
	}

	public concat(other: Deck): Deck {
		return new Deck(this.cards.concat(other.cards).toList());
	}

	public static empty(): Deck {
		return new Deck(List<Card>());
	}

	public length(): number {
		return this.cards.count();
	}

	public static fromSerialized(serialized: string): Deck {

		function chunk(arr: string, len: number): (string)[] {
			var chunks = [],
				i = 0,
				n = arr.length;

			while (i < n) {
				chunks.push(arr.slice(i, i += len));
			}

			return chunks;
		}

		let chunks = chunk(serialized, 2);
		let cards = chunks.map(chunk => Card.fromSerialized(parseInt(chunk, 16)));
		return new Deck(List(cards));
	}

}

export default Deck;