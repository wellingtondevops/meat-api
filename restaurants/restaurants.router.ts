import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import {NotFoundError} from 'restify-errors'
import {Restaurant} from './restaurants.model'


class RestaurantsRouter extends ModelRouter<Restaurant>{
    constructor(){
        super(Restaurant)
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

        applycation.get('/restaurants', this.findAll)    

        applycation.get('/restaurants/:id',[this.validateId,this.findById])      

        applycation.post('/restaurants', this.save)

        applycation.put('/restaurants/:id',[this.validateId, this.replace])        

        applycation.patch('restaurants/:id',[this.validateId, this.update])        

        applycation.del('/restaurants/:id', [this.validateId,this.delete])

        applycation.get('/restaurants/:id/menu', [this.validateId, this.findMenu])  

        applycation.put('/restaurants/:id/menu',[this.validateId, this.replaceMenu])

      }
}


export const restaurantsRouter = new RestaurantsRouter()