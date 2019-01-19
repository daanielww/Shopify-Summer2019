# Shopify-Summer2019
Back-end Developer coding challenge for Shopify Summer 2019 Internship


I have hosted this application at https://shopifysummer2019.herokuapp.com/. You can interact with it and test out the required functions
with Postman or something similar.

Route to retrieve the products:
- POST request to route '/api/products/:option'.
  - please pass in 'available' in place of 'option' to retrieve only the products that are in stock.
  - please pass in 'all' in place of ;option to retrieve all the products.
  - If an invalid command is passed in, the api will return an error message 'invalid command' with status code 400.

Route to retrieve a product by ID:
- POST request to route '/api/products/single/:id'.
 - please replace 'id' with the title of a product that is present in the store.
 - If the product cannot be found, it will return back a error message stating 'cannot find product' with status code 400.

Route to purchase product by ID:
 - POST request to route '/api/products/:id/purchase'
  - please replace 'id' with the title of a product that is present in the store.
  - If the product cannot be found, it will return back a error message stating 'cannot find product' with status code 400.
  - If the product cannot be purchased due to insufficient inventory, the api will return back a error message stating 'cannot
    purchase, not enough inventory' with an status code o 400.
