"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var router_1 = __importDefault(require("./router"));
var product_1 = __importDefault(require("./handlers/product"));
var order_1 = __importDefault(require("./handlers/order"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
app.get('/', router_1["default"], function (req, res) {
    res.send('Hello World!');
});
/*
app.get('/products', async (req : Request, res : Response)  :Promise<void>=> {
    try {
        // @ts-ignore
        const conn = await client.connect()
        const sql = 'SELECT * FROM products'
  
        const result = await conn.query(sql)
  
        conn.release()
  
       // return result.rows
       res.send(result.rows )
      } catch (err) {
        throw new Error(`Could not get books. Error: ${err}`)
      }

} ) */
(0, product_1["default"])(app);
(0, order_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
