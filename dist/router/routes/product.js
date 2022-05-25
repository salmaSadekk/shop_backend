"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products = express_1.default.Router();
products.get('/products', async (req, res) => {
    try {
        // @ts-ignore
        const conn = await Client.connect();
        const sql = 'SELECT * FROM products';
        const result = await conn.query(sql);
        conn.release();
        // return result.rows 
        res.send("here");
    }
    catch (err) {
        throw new Error(`Could not get books. Error: ${err}`);
    }
});
exports.default = products;
