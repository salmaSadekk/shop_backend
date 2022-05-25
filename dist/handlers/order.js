"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
//import { Article, ArticleStore } from '../models/article'
var order_1 = require("../Models/order");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var cart = new order_1.Cart();
var token_secret = process.env.TOKEN_SECRET;
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cart.index()];
            case 1:
                products = _a.sent();
                res.json(products);
                return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, token, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    authorizationHeader = req.headers.authorization;
                    token = authorizationHeader.split(' ')[1];
                    jsonwebtoken_1["default"].verify(token, token_secret);
                }
                catch (err) {
                    res.status(401);
                    res.json(err);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, cart.show(req.body.user_id, Number(req.params.id))];
            case 1:
                product = _a.sent();
                res.json(product);
                return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, token, order, newOrder, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    authorizationHeader = req.headers.authorization;
                    token = authorizationHeader.split(' ')[1];
                    jsonwebtoken_1["default"].verify(token, token_secret);
                }
                catch (err) {
                    res.status(401);
                    res.json(err);
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                order = {
                    //   id:2 ,
                    user_id: Number(req.body.user_id),
                    status: req.body.status
                };
                return [4 /*yield*/, cart.create(Number(req.body.user_id), req.body.status)];
            case 2:
                newOrder = _a.sent();
                res.json(newOrder);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, token, deleted, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    authorizationHeader = req.headers.authorization;
                    token = authorizationHeader.split(' ')[1];
                    jsonwebtoken_1["default"].verify(token, token_secret);
                }
                catch (err) {
                    res.status(401);
                    res.json(err);
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, cart["delete"](req.params.id)];
            case 2:
                deleted = _a.sent();
                res.json(deleted);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.json(err_2);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteproduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, token, deleted, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    authorizationHeader = req.headers.authorization;
                    token = authorizationHeader.split(' ')[1];
                    jsonwebtoken_1["default"].verify(token, token_secret);
                }
                catch (err) {
                    res.status(401);
                    res.json(err);
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, cart.deleteProduct(req.body.product_id, Number(req.params.id))];
            case 2:
                deleted = _a.sent();
                res.json(deleted);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.log(err_3);
                res.json(err_3);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
var addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, product_id, quantity, user_id, authorizationHeader, token, addedProduct, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = req.params.id;
                product_id = req.body.product_id;
                quantity = parseInt(req.body.quantity);
                user_id = req.body.user_id;
                try {
                    authorizationHeader = req.headers.authorization;
                    token = authorizationHeader.split(' ')[1];
                    console.log(token);
                    //  console.log(token as string )
                    jsonwebtoken_1["default"].verify(token, token_secret);
                }
                catch (err) {
                    res.status(401);
                    res.json(err);
                    return [2 /*return*/];
                }
                console.log("orderId: " + orderId + " productId: " + product_id + "uantity: " + quantity);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, cart.addProduct(quantity, Number(orderId), Number(product_id), Number(user_id))];
            case 2:
                addedProduct = _a.sent();
                res.json(addedProduct);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(400);
                res.json(err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var orderRoutes = function (app) {
    app.get('/orders', index); //tested
    app.get('/orders/:id', show); //tested
    app.post('/orders', create); //tested
    app.post('/orders/:id/products', addProduct); //tested
    app["delete"]('/orders/:id', destroy); //tested but should return smth
    app["delete"]('/orders/:id/products', deleteproduct);
};
exports["default"] = orderRoutes;
