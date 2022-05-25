"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClass = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = process.env.PEPPER;
const saltRounds = process.env.SALT_ROUNDS;
class UserClass {
    async authenticate(email, password) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT password FROM users WHERE email=($1)';
        const result = await conn.query(sql, [email]);
        if (result.rows.length) {
            const user = result.rows[0];
            // console.log(user)
            if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                return user;
            }
        }
        return null;
    }
    async create(b) {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *';
            // @ts-ignore
            const hash = bcrypt_1.default.hashSync(b.password + pepper, parseInt(saltRounds));
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [b.firstname, b.lastname, b.email, hash]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT *   FROM  users WHERE  id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find orders ${id}. Error: ${err}`);
        }
    }
}
exports.UserClass = UserClass;
exports.default = UserClass;
