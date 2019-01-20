# Shopify-Summer2019
Back-end Developer coding challenge for Shopify Summer 2019 Internship

I completed the base application as well as the first BONUS feature. The application contains all the functionality of the base application as well as the required bonus functionality.

I built this application using NodeJS, ExpressJS and MongoDB

I have hosted this application at https://shopifysummer2019.herokuapp.com/. You can interact with it and test out the required functions
with POSTMAN or something similar. 

If you wish to setup a local server, the existing code in the repository supports it, it is currently set up to start on localhost:5000 with MongoDB starting on its default port(27017). Note: if you do decide to run a local server, you will have to hit the '/api/demo' route (explained below) to fill the database with some values. Mongo is set up right now to create a database called 'Shopify-Backend' and a collection 'products'

The test server I have setup contains the following products that can be used for testing purposes:
  
apple:
   {title: "apple",
   price: 1,
   inventory_count: 10}

orange:
   {title: "orange",
   price: 5,
   inventory_count: 25}

grape:
   {title: "grape",
   price: 10,
   inventory_count: 0}



Routes:

Route to retrieve the products:
- GET request to route '/api/products/:option'
  - please pass in 'available' in place of 'option' to retrieve only the products that are in stock.
    - eg. '/api/products/available'
  - please pass in 'all' in place of 'option' to retrieve all the products.
    - eg. '/api/products/all'
  - If an invalid command is passed in, the api will return an error message 'invalid command' with status code 400.

Route to retrieve a product by ID:
- GET request to route '/api/products/single/:id'
  - please replace 'id' with the title of a product that is present in the store.
    - eg. '/api/products/single/apple'
  - If the product cannot be found, it will return back a error message stating 'cannot find product' with status code 400.

Route to purchase product by ID:
- POST request to route '/api/products/:id/purchase'
  - please replace 'id' with the title of a product that is present in the store.
    - eg. '/api/products/apple/purchase'
  - If the product cannot be found, it will return back a error message stating 'cannot find product' with status code 400.
  - If the product cannot be purchased due to insufficient inventory, the api will return back a error message stating 'cannot
    purchase, not enough inventory' with an status code of 400.

Route to setup Database:
- POST request to route '/api/demo'
  - This route will delete the 'products' collection and create a new one filled with the values I've outlined above.
  - This route is used to setup/reset the database to contain the values I listed above.
  - Feel free to use or change the route to suit your testing needs.

Route to add to cart:
- POST request to route '/api/products/:id/:number/add'
  - please replace 'id' with an exising product(apple, orange or grape) and replace 'number' with the amount that you wish to add to the     cart.
  - If the product doesn't exist or the number you wish to add exceeds the inventory amount, an error message will be returned.
  - The app will create a "cart" if one doesn't exist, if one already exists, it will add to the existing cart. Note: for the purposes    of this application, I have set it so that only 1 cart will exist at a time.
 
Route to checkout items in the cart:
- POST request to route '/api/checkout'
  - this will 'purchase' all the items present in the cart and update the data on each of the products accordingly
  - this will also delete the cart afterwards
  - If no cart exists, an error message will be returned

Route to get cart:
- GET request to route '/api/cart'
  - This will return the existing cart
  - If no cart exists, an error message will be returned
