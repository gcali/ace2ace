import Deck from "./deck";

interface BoardArgs {
	deck?: Deck,
	discards?: Deck,
	firstHand?: Deck,
	secondHand?: Deck
}

export default class Board {
	public readonly deck: Deck;
	public readonly discards: Deck;
	public readonly firstHand: Deck;
	public readonly secondHand: Deck;

	public readonly HOW_MANY_PER_HANDS: number = 5;

	constructor({ deck, discards, firstHand, secondHand }: BoardArgs = {}) {
		if (!deck) {
			deck = new Deck(null, false).concat(new Deck(null, false)).shuffle();
		}
		if (!discards) {
			discards = Deck.empty();
		}
		if (!firstHand) {
			firstHand = Deck.empty();
		}
		if (!secondHand) {
			secondHand = Deck.empty();
		}
		this.deck = deck;
		this.discards = discards;
		this.firstHand = firstHand;
		this.secondHand = secondHand;
	}

	public isDeckEmpty(): boolean {
		return this.deck.length() === 0;
	}

	public drawForFirst(n: number): Board {
		const drawResult = this.deck.drawCards(n);
		return new Board({
			deck: drawResult.newDeck,
			firstHand: this.firstHand.concat(drawResult.drawn),
			secondHand: this.secondHand,
			discards: this.discards
		});
	}

	public drawForSecond(n: number): Board {
		const drawResult = this.deck.drawCards(n);
		return new Board({
			deck: drawResult.newDeck,
			firstHand: this.firstHand,
			secondHand: this.secondHand.concat(drawResult.drawn),
			discards: this.discards
		});
	}

	public setUpTable(): Board {
		if (this.firstHand.length() > 0 || this.secondHand.length() > 0) {
			throw new Error("Cannot set up board if it's already initialized");
		}
		return this.drawForFirst(this.HOW_MANY_PER_HANDS).drawForSecond(this.HOW_MANY_PER_HANDS);
	}
}