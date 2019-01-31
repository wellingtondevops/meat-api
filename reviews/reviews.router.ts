import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import {NotFoundError} from 'restify-errors'
import {Review} from './reviews.model'
import * as mongoose from 'mongoose'
import {authenticate} from '../security/auth.handler'
import {authorize} from '../security/authz.handler'


class ReviewsRouter extends ModelRouter<Review>{
    constructor(){
        super(Review)
    }

    

    protected prepareOne(query: mongoose.DocumentQuery<Review,Review>): mongoose.DocumentQuery<Review,Review>{
        return query.populate('user', 'name')
                    .populate('restaurant','name')
    }

    envelop(document){
        let resource = super.envelope(document)
        const restID = document.restaurant._id ? document.restaurant._id : document.restaurant
        resource._links.restaurant = `/restaurants/${restID}`
        return resource
    }

    /*findById = (req, resp, next)=>{
        this.model.findById(req.params.id)
            .populate('user', 'name')
            .populate('restaurant','name')
            .then(this.render(resp, next))
            .catch(next)
    }*/
    
    applyRoutes(applycation: restify.Server){         

        applycation.get(`${this.basePath}`, this.findAll)    

        applycation.get(`${this.basePath}/:id`,[this.validateId,this.findById])      

        applycation.post(`${this.basePath}`, [authorize('user'),this.save])
        
    }
}

export const reviewsRouter = new ReviewsRouter()





