"use strict";
// @ts-ignore
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
//https://e2e.utopiops.com/run-postgresql-with-docker-locally-and-connect-to-it-with-nodejs
const database_1 = __importDefault(require("../database"));
class Shop {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM  products WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            //console.log("val" +id)
            const result = await conn.query(sql, [id]);
            conn.release();
            //console.log(result.rows[0])
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create(pro) {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [pro.name, pro.price]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not add new product. Error: ${err}`);
        }
    }
}
exports.Shop = Shop;
exports.default = Shop;
