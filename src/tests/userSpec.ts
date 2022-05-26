import supertest from 'supertest';
import app from '../server';
const request = supertest(app);
import UserClass, {  } from '../Models/user'
const user_c= new UserClass() ;

/*

 app.get('/users', index) //tested

    app.post('/users/auth', authenticate) //tested
    app.get('/users/:id', show) //tested
*/

describe('endpoint test /users', () => {
    it(' endpoint: post /users', async () => {
      const response = await request.post("/users").send({ 

        "firstname": "Salma",
        "lastname": "Sadek",
        "email" : "salma.sadek@gmail.com",
        "password" : "pass123"

      })
      expect(response.status).toBe(200);
      
      });
      it(' endpoint: post /users/auth', async () => {
        const response = await request.post("/users/auth").send(
          {
            "email" : "salma.sadek@gmail.com",
            "password" : "pass123"
        }
        )
        expect(response.status).toBe(200);
        
        });
  
     


  
     
  });

  
  describe('users CRUD operations', () => {

    it('create user ', async () => {
      const result = await user_c.create({
        "firstname": "Salma",
        "lastname": "Sadek",
        "email" : "salma.sadek@gmail.com",
        "password" : "pass123"

      })
      expect(result.id).toBeDefined
  
   
  });

    it('authenticate user ', async () => {
        const result = await user_c.authenticate("salma.sadek@gmail.com" ,"pass123")
       
        expect(result != null ? result.id : undefined).toBeDefined
  
     
  }); 

  
  it('show user with id ', async () => {
    const result = await user_c.show('1') ;
   
    expect(result[0].id).toEqual(1)

 
}); 


 
/*

it('Add product to order', async () => {
    const result = await cart.addProduct(1,1,1,1 )
   // expect(result[0].).toEqual(1)

 
}); */



}) ;