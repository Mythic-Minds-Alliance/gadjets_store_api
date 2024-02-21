# Backend of Catalog of product

- `npm i` for installing node_modules
- `npm run dev` for development
- default URL: http://localhost:3005

Api url from host: https://gadjets-store.onrender.com/
Example of .env in .env.example file.

### Endpoints:
```
[post] /register
[post] /login
[get] /info
[get] /infoAboutUser
[get] /recommended/:categoryId
[get] /hotPrices
[post] /createCart
[post] /addToCart
[get] /getCart
[delete] /removeFromCart
[delete] /deleteCart/:id
```
