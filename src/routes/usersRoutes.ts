import express, {Request, Response, Router} from 'express'
import {register} from '../controllers/usersController'
import {login} from '../controllers/usersController'

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);


export default router;