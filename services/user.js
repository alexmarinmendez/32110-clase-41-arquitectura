import User from '../model/User.js'
import Repository from './Repository.js'

export default class UserService extends Repository {
    constructor(dao) {
        super(dao, User.model)
    }
}