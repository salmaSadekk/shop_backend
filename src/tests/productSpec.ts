import supertest from 'supertest';
import app from '../server';
const request = supertest(app);

describe('endpoint test /products', () => {
    it(' endpoint: get /products', async () => {
      const response = await request.get(
        '/products'
      );
      expect(response.status).toBe(200);
      
      });
  
     it(' endpoint: get /products/:id', async () => {
        const response = await request.get(
          '/products/1'
        );
        expect(response.status).toBe(200);
        
        
      } );


  
     
  });