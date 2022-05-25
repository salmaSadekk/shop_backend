"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { Article, ArticleStore } from '../models/article'
const order_1 = require("../Models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cart = new order_1.Cart();
const token_secret = process.env.TOKEN_SECRET;
const index = async (_req, res) => {
    const products = await cart.index();
    res.json(products);
};
const show = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, token_secret);
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
    const product = await cart.show(Number(req.params.id));
    res.json(product);
};
const create = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, token_secret);
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
    try {
        const order = {
            //   id:2 ,
            user_id: Number(req.body.user_id),
            status: req.body.status
        };
        const newOrder = await cart.create(Number(req.body.user_id), req.body.status);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, token_secret);
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
    try {
        const deleted = await cart.delete(req.params.id);
        res.json(deleted);
    }
    catch (err) {
        res.json(err);
        return;
    }
};
const deleteproduct = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, token_secret);
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
    try {
        const deleted = await cart.deleteProduct(req.body.product_id, Number(req.params.id));
        res.json(deleted);
    }
    catch (err) {
        // console.log(err)
        res.json(err);
        return;
    }
};
const addProduct = async (req, res) => {
    const orderId = req.params.id;
    const product_id = req.body.product_id;
    const quantity = parseInt(req.body.quantity);
    const user_id = req.body.user_id;
    try {
        // console.log(req.headers.authorization   as string )
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        //console.log(token)
        //  console.log(token as string )
        jsonwebtoken_1.default.verify(token, token_secret);
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
    // console.log( "orderId: " + orderId + " productId: " +  product_id + "uantity: " + quantity)
    try {
        const addedProduct = await cart.addProduct(quantity, Number(orderId), Number(product_id), Number(user_id));
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get('/orders', index); //tested
    app.get('/orders/:id', show); //tested
    app.post('/orders', create); //tested
    app.post('/orders/:id/products', addProduct); //tested
    app.delete('/orders/:id', destroy); //tested but should return smth
    app.delete('/orders/:id/products', deleteproduct);
};
exports.default = orderRoutes;
