
import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import {User} from './users.model'
import {NotFoundError} from 'restify-errors'

class UserRouter extends ModelRouter<User> {

    constructor(){
        super(User)
        this.on('beforeRender', document=>{
            document.password= undefined
        })
    }



    applyRoutes(applycation: restify.Server){         

        applycation.get('/users', this.findAll)    

        applycation.get('/users/:id',[this.validateId,this.findById])      

        applycation.post('/users', this.save)

        applycation.put('/users/:id',[this.validateId, this.replace])        

        applycation.patch('users/:id',[this.validateId, this.update])        

        applycation.del('/users/:id', [this.validateId,this.delete])    }
}

export const usersRouter = new UserRouter()