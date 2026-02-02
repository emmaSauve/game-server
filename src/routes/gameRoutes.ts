//npm import
import express, {Router} from 'express';
import { getGames, createGame, updateGame, deleteGame} from '../controllers/gamesController'

// instantiate router to map url requests to the correct methods
const router: Router = express.Router();

// map standard rest api urls to the crud function in controller
router.get('/', getGames);
router.post('/', createGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

export default router;