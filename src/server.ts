import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import routes from './router'
import client from './database'
const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())


app.get('/', routes , function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.get('/products', async (req : Request, res : Response)  :Promise<void>=> { 
    try {
        // @ts-ignore
        const conn = await client.connect()
        const sql = 'SELECT * FROM products'
  
        const result = await conn.query(sql)
  
        conn.release()
  
       // return result.rows 
       res.send("here")
      } catch (err) {
        throw new Error(`Could not get books. Error: ${err}`)
      }

} )


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
