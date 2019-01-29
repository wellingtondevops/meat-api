
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

    //exemplo de de busca por email querey email:

    findByEmail = (req, resp, next)=>{
        if(req.query.email){
            User.find({email: req.query.email})
            .then(this.renderAll(resp, next))
            .catch(next)
        }else{
            next()
        }
    }



    applyRoutes(applycation: restify.Server){      
        
        //Exemplo de coontrole de versão da API

        applycation.get({path:'/users', version: '2.0.0'},[this.findByEmail, this.findAll])    

        applycation.get({path:'/users', version: '1.0.0'}, this.findAll)      

        applycation.get('/users/:id',[this.validateId,this.findById])      

        applycation.post('/users', this.save)

        applycation.put('/users/:id',[this.validateId, this.replace])        

        applycation.patch('users/:id',[this.validateId, this.update])        

        applycation.del('/users/:id', [this.validateId,this.delete])    }
}

export const usersRouter = new UserRouter()