import mongoose, {Model, Schema} from 'mongoose';

interface IReview{
    reviewer: string;
    reviewText: string;
    rating: number;
    date: Date;
}

interface IGame{
    title: string;
    developer: string;
    genre: string;
    price: number;
    rating: string;
    reviews: IReview[]; // child property
}

const ReviewSchema = new Schema<IReview>({
    reviewer: {
        type: String,
        required: [true, 'Reviewer Name Required']
    },
    reviewText: {
        type: String,
        required: [true, 'Review Text Required']
    },
    rating: {
        type: Number,
        required: [true, 'Rating Required'],
        min: 1,
        max: 5
    },
    date: {
        type: Date
    }

})

const GameSchema = new Schema<IGame>({
    title: {
        type: String,
        required: [true, 'Title Required']
    },
    developer: {
        type: String,
        required: [true, 'Developer Required']
    },
    genre: {
        type: String,
        required: [true, 'Genre Required']
    },
    price: {
        type: Number
    },
    rating: {
        type: String
    },
    reviews: [ReviewSchema]
});


const Game = mongoose.model<IGame>('Game', GameSchema);
export default Game;