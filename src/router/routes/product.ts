import express, { Request, Response } from 'express';
import { promises as fspromises } from 'fs';
import path from 'path';
import fs from 'fs';
import client from '../../database';

 

const products = express.Router();
export type Product= {
    id: number;
    name: string;
    price: number;



}


products.get('/products', async (req : Request, res : Response)  :Promise<void>=> { 
    try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM products'
  
        const result = await conn.query(sql)
  
        conn.release()
  
       // return result.rows 
       res.send("here")
      } catch (err) {
        throw new Error(`Could not get books. Error: ${err}`)
      }

} )

export default products ;