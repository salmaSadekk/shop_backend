import express, { Request, Response } from 'express'
//import { Article, ArticleStore } from '../models/article'
import { Order , Cart} from '../Models/order' ;
import jwt from 'jsonwebtoken';

const cart = new Cart() ;
const token_secret = process.env.TOKEN_SECRET as string ;

const index = async (_req: Request, res: Response) => {
  const products = await cart.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
   const product = await cart.show(req.params.id)
   res.json(product)
} 

const create = async (req: Request, res: Response) => {
    
  try {

 
     const authorizationHeader= req.headers.authorization   as string 
     const token =  authorizationHeader.split(' ')[1]

     jwt.verify(token, token_secret)
   
 } catch(err) {
     res.status(401)
     res.json(err)
     return
 }
  
  try {
        const order: Order = {
          //   id:2 ,
             user_id: Number( req.body.user_id ) ,
             status: req.body.status
            
        }

        

        const newOrder = await cart.create( Number( req.body.user_id ) ,  req.body.status)
        res.json( newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await cart.delete(req.params.id)
    res.json(deleted)
} 

const deleteproduct = async (req: Request, res: Response) => {
    const deleted = await cart.deleteProduct(req.body.product_id ,req.body.order_id )
    res.json(deleted)
} 

const addProduct = async (req: Request, res: Response) => {
    const orderId: string = req.params.id
    const product_id: string = req.body.product_id
    const quantity: number = parseInt(req.body.quantity)
    const user_id : string =  req.body.user_id ;

    try {

      // console.log(req.headers.authorization   as string )
       const authorizationHeader= req.headers.authorization   as string 
       const token =  authorizationHeader.split(' ')[1]
console.log(token)
     //  console.log(token as string )
       jwt.verify(token, token_secret)
     
   } catch(err) {
       res.status(401)
       res.json(err)
       return
   }
  

    console.log( "orderId: " + orderId + " productId: " +  product_id + "uantity: " + quantity)
    try {
      const addedProduct = await cart.addProduct(quantity, Number(orderId),Number(product_id) , Number(user_id) )
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  } 

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index) //tested
    app.get('/orders/:id', show) //tested
    app.post('/orders', create) //tested
    app.post('/orders/:id/products',  addProduct)//tested
    app.delete('/orders/:id' , destroy) //tested but should return smth
    app.delete('/orders/:id/products' , deleteproduct)


}

export default  orderRoutes