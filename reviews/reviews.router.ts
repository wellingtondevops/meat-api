import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import {NotFoundError} from 'restify-errors'
import {Review} from './reviews.model'
import * as mongoose from 'mongoose'


class ReviewsRouter extends ModelRouter<Review>{
    constructor(){
        super(Review)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Review,Review>): mongoose.DocumentQuery<Review,Review>{
        return query.populate('user', 'name')
                    .populate('restaurant','name')
    }

    /*findById = (req, resp, next)=>{
        this.model.findById(req.params.id)
            .populate('user', 'name')
            .populate('restaurant','name')
            .then(this.render(resp, next))
            .catch(next)
    }*/
    
    applyRoutes(applycation: restify.Server){         

        applycation.get('/reviews', this.findAll)    

        applycation.get('/reviews/:id',[this.validateId,this.findById])      

        applycation.post('/reviews', this.save)
        
    }
}

export const reviewsRouter = new ReviewsRouter()





