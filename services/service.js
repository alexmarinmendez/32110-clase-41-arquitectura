import MongoDB from '../model/MongoDAO.js'
import UserService from './user.js'
// import ProductService from './product.js'
import config from '../config/index.js'

let dao
switch(config.app.persistence) {
    case 'MONGO':
        dao = new MongoDB(config.mongo)
        break;
}

export const userService = new UserService(dao)
// export const productService = new ProductService(dao)