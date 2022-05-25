import supertest from 'supertest';
import { Cart,  Order } from '../Models/order'
import app from '../server';
const request = supertest(app);
const cart = new Cart() ;


describe('endpoint test /orders', () => {
    it(' endpoint: get /orders', async () => {
      const response = await request.get(
        '/orders'
      );
      expect(response.status).toBe(200);
      
      });
  
     it(' endpoint: get /orders/:id', async () => {
        const response = await request.get(
          '/orders/1'
        );
        expect(response.status).toBe(200);
        
        
      } );


     
  });


  describe(' orders CRUD operations', () => {
    it('create order', async () => {
        const result = await cart.create(1, "pending" )
        expect(result.status).toEqual("pending")
  
     
  }); 
  it('Add product to order', async () => {
    const result = await cart.addProduct(1,1,1,1 )
    expect(result.user_id).toEqual(1)

 
});



}) ;
