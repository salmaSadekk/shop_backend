import express, { Request, Response } from 'express'
//import { Article, ArticleStore } from '../models/article'
import { Product , Shop} from '../Models/product' ;

const shop = new Shop() ;

const index = async (_req: Request, res: Response) => {
  const products = await shop.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
   const product = await shop.show(req.body.id)
   res.json(shop)
} /*

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            title: req.body.title,
            content: req.body.content,
        }

        const newArticle = await store.create(article)
        res.json(newArticle)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
} */

const ProductRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  //app.post('/articles', create)
  //app.delete('/articles', destroy)
}

export default ProductRoutes 