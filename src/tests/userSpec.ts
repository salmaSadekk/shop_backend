import supertest from 'supertest';
import app from '../server';
const request = supertest(app);

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
  
     it(' endpoint: get /products/:id', async () => {
        const response = await request.get(
          '/products/3'
        );
        expect(response.status).toBe(200);
        
        
      } );


  
     
  });