"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//npm import
const express_1 = __importDefault(require("express"));
const gamesController_1 = require("../controllers/gamesController");
const auth_1 = require("../middleware/auth");
// instantiate router to map url requests to the correct methods
const router = express_1.default.Router();
// map standard rest api urls to the crud function in controller
router.get('/', gamesController_1.getGames);
router.get('/:id', gamesController_1.getGame);
router.post('/', auth_1.verifyToken, gamesController_1.createGame);
router.put('/:id', auth_1.verifyToken, gamesController_1.updateGame);
router.delete('/:id', auth_1.verifyToken, gamesController_1.deleteGame);
router.put('/:id/reviews', auth_1.verifyToken, gamesController_1.createReview);
exports.default = router;
