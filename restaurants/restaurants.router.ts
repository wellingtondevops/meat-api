import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import {NotFoundError} from 'restify-errors'
import {Restaurant} from './restaurants.model'


class RestaurantsRouter extends ModelRouter<Restaurant>{
    constructor(){
        super(Restaurant)        
    }
    envelop(document){
        let resource = super.envelope(document)
        resource._links.menu = `${this.basePath}/${resource._id}/menu`
        return resource

    }

    findMenu = (req, resp, next)=>{
        Restaurant.findById(req.params.id, "+menu")
        .then(rest =>{
            if(!rest){
                throw new NotFoundError('Restaurant not found')
            }else{
                resp.json(rest.menu)
                return next()
            }
        }).catch(next)
    }

    replaceMenu = (req, resp, next)=>{
        Restaurant.findById(req.params.id).then(rest=>{
            if(!rest){
                throw new NotFoundError('Restaurant not found')                    
            }else{
                rest.menu =  req.body //array de MenuItem
                return rest.save()
            }            
        }).then(rest=>{
            resp.json(rest.menu)
            return(next)
        }).catch(next)
    }    

    applyRoutes(applycation: restify.Server){         

        applycation.get(`${this.basePath}`, this.findAll)    

        applycation.get(`${this.basePath}/:id`,[this.validateId,this.findById])      

        applycation.post(`${this.basePath}`, this.save)

        applycation.put(`${this.basePath}/:id`,[this.validateId, this.replace])        

        applycation.patch(`${this.basePath}/:id`,[this.validateId, this.update])        

        applycation.del(`${this.basePath}/:id`, [this.validateId,this.delete])

        applycation.get(`${this.basePath}/:id/menu`, [this.validateId, this.findMenu])  

        applycation.put(`${this.basePath}/:id/menu`,[this.validateId, this.replaceMenu])

      }
}


export const restaurantsRouter = new RestaurantsRouter()