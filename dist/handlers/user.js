"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { Article, ArticleStore } from '../models/article'
const user_1 = require("../Models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_c = new user_1.UserClass();
const token_secret = process.env.TOKEN_SECRET;
const create = async (req, res) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    };
    try {
        const newUser = await user_c.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, token_secret);
        res.json(token); //returns the token to be used by client side
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const authenticate = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    try {
        const u = await user_c.authenticate(user.email, user.password);
        const token = jsonwebtoken_1.default.sign({ user: u }, token_secret);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};
const show = async (req, res) => {
    try {
        // console.log(req.headers.authorization   as string )
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        // console.log(token)
        //  console.log(token as string )
        jsonwebtoken_1.default.verify(token, token_secret);
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
    const product = await user_c.show(req.params.id);
    res.json(product);
};
const UserRoutes = (app) => {
    app.post('/users', create); //tested
    app.post('/users/auth', authenticate); //tested
    app.get('/users/:id', show); //tested
};
exports.default = UserRoutes;
