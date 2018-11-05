import * as express from 'express';
import Deck from "../services/deck";
import Card from '../models/card';

class App {
    public express: ReturnType<typeof express>;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes() {
        const router = express.Router();
        router.get('/', (req, res) => {
            let deck = new Deck();
            res.json({
                drawnCards: deck.drawCards(3)[1]
            });
        });
        router.get('/serialized/card', (req, res) => {
            let card = new Deck().drawCards()[1].cards.first();
            res.json({
                drawnCard: JSON.stringify(card),
                serializedCard: card.serialize(),
                deserializedCard: JSON.stringify(Card.fromSerialized(card.serialize()))
            });
        });
        router.get('/serialized/deck', (req, res) => {
            let deck = new Deck().drawCards(3)[1];
            res.json({
                cards: deck.cards,
                serializedDeck: deck.serialize(),
                deserializedCards: Deck.fromSerialized(deck.serialize()).cards
            })
        });
        router.get('/serialized/fulldeck', (req, res) => {
            let deck = new Deck();
            res.json({
                cards: deck.cards,
                serializedDeck: deck.serialize(),
                deserializedCards: Deck.fromSerialized(deck.serialize()).cards
            })
        });
        this.express.all('/*', function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            next();
        });
        this.express.use("/", router);
    }
}

export default new App().express;