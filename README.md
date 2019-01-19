# Shopify-Summer2019
Back-end Developer coding challenge for Shopify Summer 2019 Internship

I built this application justing NodeJS, ExpressJS and MongoDB

I have hosted this application at https://shopifysummer2019.herokuapp.com/. You can interact with it and test out the required functions
with Postman or something similar. If you wish to setup a localserver, the existing code in the repository supports.

The test server I have setup contains the following products that can be used for testing purposes:
  
apple:
   title: "apple",
   price: 1,
   inventory_count: 10

orange:
   title: "orange",
   price: 5,
   inventory_count: 25

grape:
   title: "grape",
   price: 10,
   inventory_count: 0



Routes:

Route to retrieve the products:
- POST request to route '/api/products/:option'
  - please pass in 'available' in place of 'option' to retrieve only the products that are in stock.
    - eg. '/api/products/available'
  - please pass in 'all' in place of 'option' to retrieve all the products.
    - eg. '/api/products/all'
  - If an invalid command is passed in, the api will return an error message 'invalid command' with status code 400.

Route to retrieve a product by ID:
- POST request to route '/api/products/single/:id'
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
  - This route is used to setup/reset the database to contain the values I listed above.
  - Feel free to use or change the route to suit your testing needs.
