"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username
    };
    const jwtOptions = { expires: '1hr' };
    return jsonwebtoken_1.default.sign(payload, process.env.PASSPORT_SECRET, jwtOptions);
};
const setTokenCookie = (res, token) => {
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
};
const clearTokenCookie = (res) => {
    res.clearCookie('authToken');
};
const register = async (req, res) => {
    try {
        // duplicate username check
        const duplicateUser = await user_1.User.findOne({ username: req.body.username });
        if (duplicateUser) {
            throw new Error('User already exists');
        }
        // manual password val. can add regex later
        if (req.body.password.length < 8) {
            throw new Error('Password must be min 8 characters');
        }
        // create new user first from username
        const user = new user_1.User({ username: req.body.username });
        // hash password
        await user.setPassword(req.body.password);
        // save new user
        await user.save();
        // return response
        return res.status(201).json({ _id: user._id, username: user.username });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const user = await user_1.User.findOne({ username: req.body.username });
        if (!user) {
            throw new Error();
        }
        const result = await user.authenticate(req.body.password);
        if (!result.user)
            throw new Error;
        const authToken = generateToken(result.user);
        setTokenCookie(res, authToken);
        return res.status(200).json({ success: true });
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid Login' });
    }
};
exports.login = login;
const logout = async (req, res) => {
    clearTokenCookie(res);
    return res.status(200).json({ message: 'User Logged Out' });
};
exports.logout = logout;
