import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import routes from './router'
import client from './database'
import ProductRoutes from './handlers/product'
import orderRoutes from './handlers/order'
import UserRoutes from './handlers/user'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', routes , function (req: Request, res: Response) {
    res.send('Hello World!')
})


ProductRoutes(app) ;
orderRoutes(app) ;
UserRoutes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
