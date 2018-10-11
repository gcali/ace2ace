import Deck from "./deck";

interface BoardArgs {
	deck?: Deck,
	discards?: Deck,
	firstHand?: Deck,
	secondHand?: Deck
}

class Board {
	public readonly deck: Deck;
	public readonly discards: Deck;
	public readonly firstHand: Deck;
	public readonly secondHand: Deck;

	constructor({ deck, discards, firstHand, secondHand }: BoardArgs) {
		if (!deck) {
			deck = new Deck();
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
}