"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { Article, ArticleStore } from '../models/article'
const product_1 = require("../Models/product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const shop = new product_1.Shop();
const token_secret = process.env.TOKEN_SECRET;
const index = async (_req, res) => {
    // console.log( process.env.ENV   as string)
    try {
        const products = await shop.index();
        res.json(products);
    }
    catch (err) {
        console.log(err);
        res.send("couldn't GET products");
    }
};
const show = async (req, res) => {
    //  console.log("handler "+ req.params.id)
    try {
        const product = await shop.show(req.params.id);
        res.json(product);
    }
    catch (err) {
        console.log(err);
        res.send("couldn't GET product with required id");
    }
};
const create = async (req, res) => {
    try {
        // console.log(req.headers.authorization   as string )
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        //  console.log(token as string )
        jsonwebtoken_1.default.verify(token, token_secret);
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
    try {
        const product = {
            name: req.body.name,
            price: req.body.price
        };
        const newProduct = await shop.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
}; /*

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
} */
const ProductRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
    //app.delete('/articles', destroy)
};
exports.default = ProductRoutes;
