//all usres can see 
import express, { Request, Response } from 'express'
//import { Article, ArticleStore } from '../models/article'
import { User , UserClass} from '../Models/user' ;
import jwt from 'jsonwebtoken';



const user_c= new UserClass() ;
const token_secret = process.env.TOKEN_SECRET as string ;


const create = async (req: Request, res: Response) => {
    const user: User = {
       firstname: req.body.firstname,
       lastname: req.body.lastname,
       email : req.body.email,
       password : req.body.password 
    }
    try {

        
        const newUser = await user_c.create(user)
        const token = jwt.sign({ user: newUser }, token_secret);
        res.json(token) //returns the token to be used by client side
    } catch(err) {
        res.status(400)
        res.json(err )
    }
}


const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        email : req.body.email , 
      password: req.body.password
    }
    try {
        const u = await user_c.authenticate(user.email, user.password)

     //   console.log(u)
       const  token = jwt.sign({ user: u },token_secret);
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
  }

  const index = async (_req: Request, res: Response) => {

    try {

 
        const authorizationHeader= _req.headers.authorization   as string 
        const token =  authorizationHeader.split(' ')[1]
    
        jwt.verify(token, token_secret)
      
    } catch(err) {
        res.status(401)
        res.json(err)
        return
    }
    // console.log( process.env.ENV   as string)

    try{
        const users = await user_c.index()
     res.json(users)
    }
    catch (err) {
        console.log(err) 
        console.log(process.env.ENV as string)
        res.send("couldn't GET users")
    }
     
   }

  const show = async (req: Request, res: Response) => {
    try {

        // console.log(req.headers.authorization   as string )
         const authorizationHeader= req.headers.authorization   as string 
         const token =  authorizationHeader.split(' ')[1]
 // console.log(token)
       //  console.log(token as string )
         jwt.verify(token, token_secret)
       
     } catch(err) {
         res.status(401)
         res.json(err)
         return
     }  
    const user= await user_c.show(req.params.id)
    res.json(user)
 } 
  

  

  
 



 

const UserRoutes = (app: express.Application) => {

    app.get('/users', index) //tested
    app.post('/users', create) //tested
    app.post('/users/auth', authenticate) //tested
    app.get('/users/:id', show) //tested


   


}

export default  UserRoutes