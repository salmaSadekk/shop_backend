import express, { Request, Response } from 'express'
//import { Article, ArticleStore } from '../models/article'
import { Order , Cart} from '../Models/order' ;

const cart = new Cart() ;

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

const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id
    const productId: string = _req.body.productId
    const quantity: number = parseInt(_req.body.quantity)
  

    console.log( "orderId: " + orderId + " productId: " +  productId + "uantity: " + quantity)
    try {
      const addedProduct = await cart.addProduct(quantity, Number(orderId),Number(productId) )
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