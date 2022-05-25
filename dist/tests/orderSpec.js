"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const order_1 = require("../Models/order");
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
const cart = new order_1.Cart();
describe('endpoint test /orders', () => {
    it(' endpoint: get /orders', async () => {
        const response = await request.get('/orders');
        expect(response.status).toBe(200);
    });
    it(' endpoint: get /orders/:id', async () => {
        const response = await request.get('/orders/1');
        expect(response.status).toBe(200);
    });
});
describe(' orders CRUD operations', () => {
    it('create order', async () => {
        const result = await cart.create(1, "pending");
        expect(result.status).toEqual("pending");
    });
});
