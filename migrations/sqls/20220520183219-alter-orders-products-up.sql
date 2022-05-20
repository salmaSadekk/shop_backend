/* Replace with your SQL commands */

ALTER TABLE orders_products
ADD  user_id bigint  REFERENCES orders(id) ON DELETE CASCADE;