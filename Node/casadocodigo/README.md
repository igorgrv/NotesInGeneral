# Projeto

## Estrutura de pastas

```
| - src
|
| - - app
| - - - - controller
| - - - - dao
| - - - - model
| - - - - routes
| - - - - views
| - - - - public
| - - - - - - css
| - - - - - - js
| - - - - - - images
|
| - - config
| - - - - express.js
| - - - - database.js
| - - - - sessao-autenticacao.js
|
| - server.js
```

## Passos

1. Dependências base para CRUD MVC:

   ```bash
   npm install express nodemon sqlite3 body-parser method-override
   ```

2. Crie a estrutura de pastas;

3. Crie o `express()` -> para utilizar expor o `app`;

4. Crie o `server.js` -> para o `listen()`;

5. Crie a `home-routes.js` -> `app.get('/', (res,resp)=> resp.marko(require('')))`

   1. No `express` adicione `const route = require`;

6. Crie o `routes.js` e carregue o `home-routes`;

7. Crie o `home-controller`; e altere o routes, para pegar do controller

   ```javascript
   class BaseController {
     static routes() {
       return {
         home: '/',
       };
     }
   
     home() {
       return (res, resp) => {
         resp.marko(require('../views/base/home/home.marko'));
       };
     }
   }
   module.exports = BaseController;
   ```

8. Crie o `index` de cada  `view` (base/book)

   ```javascript
   module.exports = {
       home: require('./home/home.marko')
   }
   ```

9. Crie o `template` na pasta raiz da `view`

   ```javascript
   module.exports = {
   	base: require('./base'),
   	book: require('./books')
   }
   ```

10. Crie o `BookDao`

    ```javascript
    class BookDao {
        constructor(db) {
            this.db = db;
        }
    
        list() {
            return new Promise((resolve, reject) => {
                this.db.all(
                    `
                    SELECT * FROM books;
                    `,
                    (err, result) => {
                        if (err) return reject('error when trying to find the books');
                        return resolve(result);
                    }
                );
            });
        }
    }
    ```

11. Consuma o `bookDao`:

    ```javascript
    const db = require('../../config/database');
    const BookDao = require('../dao/book-dao');
    const bookDao = new BookDao(db);
    
    list() {
        return (res, resp) => {
            bookDao.list().then((books) => {
                resp.marko(template.book.list, {
                    books: books,
                });
            });
        };
    }
    ```

    