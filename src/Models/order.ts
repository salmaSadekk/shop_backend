// @ts-ignore
import Client from '../database'

export type Order = {
     id: number;
     user_id: number;
     status: string;
 
}

export class Cart {
  

  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  } 

  async show(id: string): Promise<Order> {
    try {
    const sql = 'SELECT * FROM  orders WHERE user_id=($1)'
    // @ts-ignore
    const conn = await Client.connect()
    console.log("val" +id)

    const result = await conn.query(sql, [id])

    conn.release()
    //console.log(result.rows[0])

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find orders ${id}. Error: ${err}`)
    }
  }

  async create(user_id : number , status: string): Promise<Order> {
      try {
    const sql = 'INSERT INTO orders (user_id , status) VALUES($1, $2) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [user_id, status])

    const product = result.rows[0]

    conn.release()

    return product
      } catch (err) {
          throw new Error(`Could not add new book. Error: ${err}`)
      }
  } 

  async addProduct (quantity : number , orderId : number , productId: number) : Promise<Order>{
    try {

      console.log( ` params quantity: ${quantity} , order: ${orderId} , product: ${productId}`  )
        const sql = 'INSERT INTO orders_products (quantity, product_id,order_id) VALUES($1, $2, $3) RETURNING *'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn
            .query(sql, [quantity, productId , orderId ])
    
        const added_product = result.rows[0]
    
        conn.release()
    
        return added_product
          } catch (err) {
              throw new Error(`Could not add new item. Error: ${err}`)
          }

  }


  async deleteProduct (productId: number , orderId : number ) : Promise<String>{
    try {
        const sql = 'DELETE FROM products_orders WHERE product_id=($1) AND order_id = ($2)'
        
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn
            .query(sql, [productId , orderId])
    
        const added_product = result.rows[0]
    
        conn.release()
    
        return added_product
          } catch (err) {
              throw new Error(`Could not remove product. Error: ${err}`)
          }

  }
  
  async delete(id: string): Promise<Order> {
      try {
    const sql = 'DELETE FROM orders WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const product = result.rows[0]

    conn.release()

    return product
      } catch (err) {
          throw new Error(`Could not delete order ${id}. Error: ${err}`)
      }
  } 
}
