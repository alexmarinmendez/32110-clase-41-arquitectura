import mongoose from "mongoose"
import User from './User.js'

export default class MongoDB {
    constructor(config) {
        this.mongoose = mongoose.connect(config.url, {
            useNewUrlParser: true
        }).catch(err => {
            console.log(err)
            process.exit()
        })
        const timestamp = { timestamp: { createdAt: 'createdAt', updatedAt: 'updatedAt'}}
        const userSchema = mongoose.Schema(User.schema, timestamp)
        // const productSchema = mongoose.Schema(Product.schema, timestamp)
        this.models = {
            [User.model]: mongoose.model(User.model, userSchema),
            // [Product.model]: mongoose.model(Product.model, productSchema),
        }
    }

    get = async(options, entity) => {
        if (!this.models[entity]) throw new Error('Entity not found in models')
        let results = await this.models[entity].find(options)
        // return results
        return results.map(result => result.toObject())
    }

    insert = async(document, entity) => {
        if (!this.models[entity]) throw new Error('Entity not found in models')
        try {
            let instance = new this.models[entity](document)
            let result = await instance.save()
            return result.toObject()
            // return result
        } catch(err) {
            console.log(err)
            return null
        }
    }
}