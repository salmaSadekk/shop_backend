import supertest from 'supertest';
import app from '../server';
const request = supertest(app);

import { Shop ,Product } from '../Models/product'
const shop= new Shop() ;
const token = process.env.TEST_TOKEN as string ;


describe('endpoint test /products', () => {


  it(' endpoint: post /products/', async () => {
    const response = await request.post(
      '/products'
    ).send(
      {
        "name": "product",
   "price": "20"
      }
      
    ).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    
    
  } );

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
  describe(' Products CRUD operations', () => {

    it('create product ', async () => {
      const result = await shop.create(
        {
          name : "test " ,
          price: 200
        }
      )
      expect(result.id).toBeDefined
  
   
  });

    it('Get all products -> index ', async () => {
        const result = await shop.index()
       // console.log(result)
        expect(result[0].id).toBeDefined
  
     
  }); 

  
  it('Get product by id -> show ', async () => {
    const result = await shop.show( '1') ;
    expect(result.id).toEqual(1)

 
});


 
/*

it('Add product to order', async () => {
    const result = await cart.addProduct(1,1,1,1 )
   // expect(result[0].).toEqual(1)

 
}); */



}) ;