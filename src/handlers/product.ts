import express, { Request, Response } from 'express'
//import { Article, ArticleStore } from '../models/article'
import { Product , Shop} from '../Models/product' ;
import jwt from 'jsonwebtoken';

const shop = new Shop() ;
const token_secret = process.env.TOKEN_SECRET as string ;

const index = async (_req: Request, res: Response) => {
 // console.log( process.env.ENV   as string)

 try{
  const products = await shop.index()
  res.json(products)
 }
 catch (err) {
   console.log(err)
   res.send("couldn't GET products")
 }
 
}

const show = async (req: Request, res: Response) => {
//  console.log("handler "+ req.params.id)
try{
  const product = await shop.show(req.params.id)
   res.json(product)

}
catch(err) {
  console.log(err)
  res.send("couldn't GET product with required id")
}
   
} 

const create = async (req: Request, res: Response) => {

  try {

    // console.log(req.headers.authorization   as string )
     const authorizationHeader= req.headers.authorization   as string 
     const token =  authorizationHeader.split(' ')[1]

   //  console.log(token as string )
     jwt.verify(token, token_secret)
   
 } catch(err) {
     res.status(401)
     res.json(err)
     return
 }



    try {
        const product: Product = {
          name: req.body.name,
     price: req.body.price
        }

        const newProduct= await shop.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
} /*

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
} */

const ProductRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', create)
  //app.delete('/articles', destroy)
}

export default ProductRoutes 