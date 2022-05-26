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
        ).set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        
        
      } );

  /*
    app.delete('/orders/:id' , destroy) //tested but should return smth
    app.delete('/orders/:id/products' , deleteproduct)
*/

      it(' endpoint: post /orders', async () => {

        const token = process.env.TEST_TOKEN as string ;
      //  console.log(token)

       const response = await request.post(
         '/orders'
       ).send({
         "user_id" : "1",
         "status" : "pending"
         
       })
       expect(response.status).toBe(401);
       
       
     } );
     it(' endpoint: post /orders/:id/products without token', async () => {


      const token = process.env.TEST_TOKEN as string ;

     const response = await request.post(
       '/orders/1/products'
     ).send({
       "product_id" : "1" ,
       "quantity" :"20" ,
       "user_id" : "1"

     })
     expect(response.status).toBe(401);
     
     
   } );
   it(' endpoint: delete /orders/:id', async () => {

    const token = process.env.TEST_TOKEN as string ;

   const response = await request.delete(
     '/orders/1'
   )
   expect(response.status).toBe(401);
   
   
 } );
 it(' endpoint: delete /orders/:id/products ', async () => {

  const token = process.env.TEST_TOKEN as string ;

 const response = await request.delete(
   '/orders/1/products'
 )
 expect(response.status).toBe(401);
 
 
} );


     
  });


  describe(' orders CRUD operations', () => {


    beforeAll(
      async () => {
        await shop.create( {
          name : "test " ,
          price: 200
        })
        
        await user_c.create( {
          "firstname": "Salma",
          "lastname": "Sadek",
          "email" : "salma.sadek2@gmail.com",
          "password" : "pass123"
        }) 

        await cart.create(
          1 , "pending"
        )

        await cart.create(
          1 , "pending"
        )
        await cart.create(
          1 , "pending"
        )

        await cart.addProduct(10,3,1,1)
      }
    )

    it('create order', async () => {
        const result = await cart.create(1, "pending" )
        expect(result.status).toEqual("pending")
  
     
  }); 


  it('Add product to order', async () => {
//to make sure at least one user is created and one product


/*
*/
    const result = await cart.addProduct(10,1,1,1 )
    expect(Number (result.user_id )).toEqual(1)

 
});

it('show all orders -> index', async () => {
  const result = await cart.index()
//  console.log(result[0].id)
  expect(Number(result[0].id )).toBeGreaterThanOrEqual(1)


});

it('show order by user ', async () => {
    const result = await cart.show(1)
    expect(result[0].status).toBeDefined

 
});

it('delete from orders ', async () => {
  const result = await cart.deleteProduct(1 , 3)
  expect(result).toBeDefined


});

it('delete order ', async () => {
  const result = await cart.delete('1000')
  expect(result).toBeNull


});





}) ;
