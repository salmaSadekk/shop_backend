"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('endpoint test /users', () => {
    it(' endpoint: post /users', async () => {
        const response = await request.post("/users").send({
            "firstname": "Salma",
            "lastname": "Sadek",
            "email": "salma.sadek@gmail.com",
            "password": "pass123"
        });
        expect(response.status).toBe(200);
    });
    it(' endpoint: get /products/:id', async () => {
        const response = await request.get('/products/3');
        expect(response.status).toBe(200);
    });
});
