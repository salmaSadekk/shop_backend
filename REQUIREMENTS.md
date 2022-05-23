## API Endpoints

#### Products

- Index -> [GET] '/products'
- Show -> [GET] '/products/:id'
- Create -> [token required][post] '/products'

#### Users

- Index -> [token required][post] '/users'
- Show -> [token required][post] '/users/auth'
- Create -> [token required][get] '/users/:id'

#### Orders

- Current Order by user (args: user id)[token required] -> [GET] '/orders/:id'

- Index ->[GET] '/orders'
- Show -> [GET]'/orders/:id'
- Create-> [token required][post] '/orders' --> body [args : user_id , status]
- addProduct-> [token required][post] '/orders/:id/products' -> body [args: product_id , quantity ,user_id ]
- Destroy -> [DELETE] '/orders/:id' -> removes a certain order by it's id
- Delete Products -> [DELETE] '/orders/:id/products' -> removes a product from a certain order with id -> body contains [args: product_id ]

## Data Shapes

#### Product

- id : number;
- name: string;
- price: number;

#### User

- id : number,
- firstname?: string,
- lastname?: string ,
- email: string ,
- password : string

#### Orders

- id : number;
- user_id: number;
- status: string;
- quantity of each product in the order: number
- status of order (active or complete): string
- id of each product in the order: number
