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
        var token = jwt.sign({ user: newUser }, token_secret);
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
        var token = jwt.sign({ user: u },token_secret);
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
  }

  
 



 

const UserRoutes = (app: express.Application) => {

    app.post('/users', create) //tested
    app.post('/users/auth', authenticate) //tested

   


}

export default  UserRoutes