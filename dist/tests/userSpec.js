"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
const user_1 = __importDefault(require("../Models/user"));
const user_c = new user_1.default();
const token = process.env.TEST_TOKEN;
/*

 app.get('/users', index) //tested

    app.post('/users/auth', authenticate) //tested
    app.get('/users/:id', show) //tested
*/
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
    it(' endpoint: post /users/auth', async () => {
        const response = await request.post("/users/auth").send({
            "email": "salma.sadek@gmail.com",
            "password": "pass123"
        });
        expect(response.status).toBe(200);
    });
    it(' endpoint: GET /users', async () => {
        const response = await request.get('/users').set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it(' endpoint: GET /users/:id', async () => {
        const response = await request.get('/users/1').set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});
describe('users CRUD operations', () => {
    it('create user ', async () => {
        const result = await user_c.create({
            "firstname": "Salma",
            "lastname": "Sadek",
            "email": "salma.sadek@gmail.com",
            "password": "pass123"
        });
        expect(result.id).toBeDefined;
    });
    it('authenticate user ', async () => {
        const result = await user_c.authenticate("salma.sadek@gmail.com", "pass123");
        expect(result != null ? result.id : undefined).toBeDefined;
    });
    it('show user with id ', async () => {
        const result = await user_c.show('1');
        expect(result[0].id).toEqual(1);
    });
    it('show all users -> index', async () => {
        const result = await user_c.index();
        expect(result[0].id).toBeDefined;
    });
    /*
    
    it('Add product to order', async () => {
        const result = await cart.addProduct(1,1,1,1 )
       // expect(result[0].).toEqual(1)
    
     
    }); */
});
