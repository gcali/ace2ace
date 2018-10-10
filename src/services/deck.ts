import { Range, List, Seq, Collection } from "immutable";
import { allSuits } from "../models/registry/suit";
import Card from "../models/card";

class Deck {
	readonly cards: Collection.Indexed<Card>;
	constructor(cards: List<Card> = null) {
		if (cards !== null) {
			this.cards = cards;
		}
		else {
			console.log(allSuits);
			this.cards = allSuits.map(
				suit => Range(1, 14).map(
					i => (new Card(i, suit))
				)
			).flatten().sortBy(Math.random).toList();
			console.log(this.cards);
		}
	}

	public drawCards(n: number = 1): [Deck, Deck] {
		let takenCards = this.cards.take(n);
		return [new Deck(this.cards.skip(n).toList()), new Deck(takenCards.toList())];
	}

	public serialize(): string {
		let serializedCards = this.cards.map(card => card.serialize().toString(16));
		return serializedCards.join("");
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

		/*
		let compatCards = parseInt(serialized, 16);
		let cards: List<Card> = List<Card>();
		while (compatCards > 0) {
			let currentCard = compatCards & (0xFF);
			cards = cards.push(Card.fromSerialized(currentCard));
			compatCards >>= 8;
		}

		return new Deck(cards);
		*/
	}

}

export default Deck;