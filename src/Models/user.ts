import Client from '../database'
import bcrypt from 'bcrypt' ;

export type User= {
     id?: number,
     firstname?: string,
     lastname?: string ,
     email: string ,
     password : string

 
}

const pepper ='hahahahahah' ;
const saltRounds = '2' ;

export class UserClass {


     async authenticate(email: string, password: string): Promise<User | null> {
          const conn = await Client.connect()
          const sql = 'SELECT password FROM users WHERE email=($1)'
      
          const result = await conn.query(sql, [email])
     
      
          if(result.rows.length) {
      
            const user = result.rows[0]
      
           // console.log(user)
      
            if (bcrypt.compareSync(password+pepper, user.password)) {
              return user
            }
          }
      
          return null
        }
     async create(b: User): Promise<User> {
          try {
        const sql = 'INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *'
        // @ts-ignore
    
        const hash = bcrypt.hashSync(
          b.password + pepper, 
          parseInt(saltRounds)
        );
        const conn = await Client.connect()
    
        const result = await conn
            .query(sql, [b.firstname, b.lastname , b.email , hash])
    
        const product = result.rows[0]
    
        conn.release()
    
        return product
          } catch (err) {
              throw new Error(`Could not add new user. Error: ${err}`)
          }
      }
    
      
    


}