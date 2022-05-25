import supertest from 'supertest';
import { Cart,  Order } from '../Models/order'
import { Shop ,Product } from '../Models/product'
import UserClass, {  } from '../Models/user'


import app from '../server';
const request = supertest(app);
const cart = new Cart() ;
const shop = new Shop() ;
const user_c = new UserClass() ;


describe('endpoint test /orders', () => {
    it(' endpoint: get /orders', async () => {
      const response = await request.get(
        '/orders'
      );
      expect(response.status).toBe(200);
      
      });
  
     it(' endpoint: get /orders/:id', async () => {

         const token = process.env.TEST_TOKEN as string ;
 
        const response = await request.get(
          '/orders/1'
        ).set("Authorization", `Bearer ${token}`);;
        expect(response.status).toBe(200);
        
        
      } );


     
  });


  describe(' orders CRUD operations', () => {

    it('create order', async () => {
        const result = await cart.create(1, "pending" )
        expect(result.status).toEqual("pending")
  
     
  }); 


  it('Add product to order', async () => {
//to make sure at least one user is created and one product
/*
await shop.create( {
  name : "test " ,
  price: 200
})

await user_c.create( {
  "firstname": "Salma",
  "lastname": "Sadek",
  "email" : "salma.sadek2@gmail.com",
  "password" : "pass123"
}) */
    const result = await cart.addProduct(10,1,1,1 )
    expect(Number (result.user_id )).toEqual(1)

 
});

it('show all orders -> index', async () => {
  const result = await cart.index()
  expect(result[0].id ).toBeGreaterThanOrEqual(1)


});

it('show order by user ', async () => {
    const result = await cart.show(1)
    expect(result[0].status).toBeDefined

 
});






}) ;
