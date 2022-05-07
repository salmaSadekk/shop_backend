/* Replace with your SQL commands */
CREATE TABLE orders_products ( id SERIAL PRIMARY KEY  , quantity integer ,product_id bigint  REFERENCES products(id)  , order_id bigint  REFERENCES orders(id)  ) ;