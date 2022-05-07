// @ts-ignore

//https://e2e.utopiops.com/run-postgresql-with-docker-locally-and-connect-to-it-with-nodejs
import Client from '../database'

export type Product= {
     id: number;
     name: string;
     price: number;
 
}

export class Shop {
  

  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
    const sql = 'SELECT * FROM  products WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()
    console.log("val" +id)

    const result = await conn.query(sql, [id])

    conn.release()
    //console.log(result.rows[0])

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

 /* async create(b: Product): Promise<Product> {
      try {
    const sql = 'INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [b.name, b.price])

    const product = result.rows[0]

    conn.release()

    return product
      } catch (err) {
          throw new Error(`Could not add new book. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<Product> {
      try {
    const sql = 'DELETE FROM books WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const product = result.rows[0]

    conn.release()

    return product
      } catch (err) {
          throw new Error(`Could not delete book ${id}. Error: ${err}`)
      }
  } */
}
