"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//npm import
const express_1 = __importDefault(require("express"));
const gamesController_1 = require("../controllers/gamesController");
// instantiate router to map url requests to the correct methods
const router = express_1.default.Router();
// map standard rest api urls to the crud function in controller
router.get('/', gamesController_1.getGames);
router.post('/', gamesController_1.createGame);
router.put('/:id', gamesController_1.updateGame);
router.delete('/:id', gamesController_1.deleteGame);
exports.default = router;
