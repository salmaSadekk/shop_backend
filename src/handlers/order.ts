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
             id:2 ,
             user_id: Number( req.params.user_id ) ,
             status: req.params.status
            
        }

        const newOrder = await cart.create( Number( req.params.user_id ) ,  req.params.status)
        res.json( newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await cart.delete(req.body.id)
    res.json(deleted)
} 

const deleteproduct = async (req: Request, res: Response) => {
    const deleted = await cart.deleteProduct(req.body.product_id ,req.body.order_id )
    res.json(deleted)
} 

const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id
    const productId: string = _req.params.productId
    const quantity: number = parseInt(_req.params.quantity)
  
    try {
      const addedProduct = await cart.addProduct(quantity, Number(orderId),Number(productId) )
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  } 

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create) // 
    app.post('/orders/:id/products',  addProduct)
    app.delete('/orders/:id' , destroy)
    app.delete('/orders/:id/products' , deleteproduct)


}

export default  orderRoutes