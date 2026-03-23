//npm import
import express, {Router} from 'express';
import { getGames, createGame, updateGame, deleteGame, createReview, getGame} from '../controllers/gamesController'
import { verifyToken } from '../middleware/auth';

// instantiate router to map url requests to the correct methods
const router: Router = express.Router();

// map standard rest api urls to the crud function in controller
router.get('/', getGames);
router.get('/:id', getGame);
router.post('/', verifyToken, createGame);
router.put('/:id', verifyToken, updateGame);
router.delete('/:id', verifyToken, deleteGame);
router.put('/:id/reviews', verifyToken, createReview)

export default router;