import express, { Request, Response, Router } from 'express';
import Game from '../models/game';

// instantiate router to map url requests to the correct methods
const router: Router = express.Router();

// mock data for CRUD
// interface Game {
//    id: number,
//    title: string
//};

// let games: Game[] = [
//     { id: 1, title: 'SpongeBob Cosmic Shake' },
//     { id: 2, title: 'Roblox' },
//     { id: 3, title: 'Donkey Kong Country Returns' }
// ];

/**
 * @swagger
 * /api/v1/games:
 *   get:
 *     summary: Retrieve all games
 *     responses:
 *       200:
 *         description: A list of games
 */
router.get('/', async (req: Request, res: Response) => {
    // use model to query mongodb for game docs
    const games = await Game.find();
    if (!games || games.length === 0){
        return res.status(404).json({ message: 'No'})
    }
    return res.status(200).json(games);
});

/**
 * @swagger
 * /api/v1/games:
 *   post:
 *     summary: Create a new game
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Game created
 *       400:
 *         description: Bad request
 */
router.post('/', async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ 'err': 'Invalid Request Body' }); // 400: Bad Request
    }

    // add new game to db from request body via Game model
    await Game.create(req.body);

    return res.status(201).json(); // 201: resource created
});

/* PUT: /api/v1/games/35 */
router.put('/:id', async (req: Request, res: Response) => {

    if (!req.params.id){
        return res.status(400).json({'error': 'Bad Request - Id parameter missing'});
    }

    await Game.findByIdAndUpdate(req.params.id, req.body);
//     // search array for id in url param.  Use == as req.params has a type of "any"
//     const index: number = games.findIndex(g => g.id == req.params.id);

//     if (index === -1) {
//         return res.status(404).json({ 'err': 'Game Not Found' });
//     }

//     games[index].title = req.body.title; // update array element from http request body
    return res.status(204).json({ 'msg': 'Game Updated' }); // 204: No Content
 });

/* DELETE: /api/v1/games/35 */
// router.delete('/:id', (req: Request, res: Response) => {
//      // search array for id in url param.  Use == as req.params has a type of "any"
//     const index: number = games.findIndex(g => g.id == req.params.id);

//     if (index === -1) {
//         return res.status(404).json({ 'err': 'Game Not Found' });
//     }

//     games.splice(index, 1);
//      return res.status(204).json({ 'msg': 'Game Deleted' }); // 204: No Content
// })

router.delete('/:id', async (req: Request, res: Response) => {

    if (!req.params.id){
        return res.status(400).json({'error': 'Bad Request - Id parameter missing'});
    }

    await Game.findByIdAndDelete(req.params.id);
//     // search array for id in url param.  Use == as req.params has a type of "any"
//     const index: number = games.findIndex(g => g.id == req.params.id);

//     if (index === -1) {
//         return res.status(404).json({ 'err': 'Game Not Found' });
//     }

//     games[index].title = req.body.title; // update array element from http request body
    return res.status(204).json({ 'msg': 'Game Deleted' }); // 204: No Content
 });

// make controller public
export default router;