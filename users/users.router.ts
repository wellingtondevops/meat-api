import { Router } from "../common/router";
import * as restify from 'restify'
import {User} from './users.model'
import {NotFoundError} from 'restify-errors'

class UserRouter extends Router {

    constructor(){
        super()
        this.on('beforeRender', document=>{
            document.password= undefined
        })
    }



    applyRoutes(applycation: restify.Server){

         //endpoint pesquis todos usuários;

        applycation.get('/users', (req, resp, next)=>{

            User.find().then(this.render(resp, next))
        })

        //endpoint pesquisa usuário por id;

        applycation.get('/users/:id', (req, resp, next)=>{
            User.findById(req.params.id).then(this.render(resp, next)).catch(next)
        })
        //new endpoint

        applycation.post('/users', (req, resp, next)=>{
            let user = new User(req.body)            
            user.save().then(this.render(resp, next)).catch(next)
        })

        applycation.put('/users/:id', (req, resp, next)=>{
            const options  = {runValidators:true, overwrite: true}
            User.update({_id:req.params.id}, req.body,  options)
                .exec().then(result=>{
                  if(result.n){
                    return User.findById(req.params.id)
                  }else{
                    throw new NotFoundError('Usuário não encontrado!')
                  }
            }).then(this.render(resp, next)).catch(next)
          })


          //metodo Path melhor não precisa  alterar tudo objeto

        applycation.patch('users/:id', (req, resp, next)=>{
            const options = {runValidators:true, new :true}

            User.findByIdAndUpdate(req.params.id, req.body, options).
            then(this.render(resp, next)).catch(next)
        })

        

        applycation.del('/users/:id', (req, resp, next)=>{
            User.remove({_id: req.params.id}).exec().then((cmResult: any)=>{
                if(cmResult.result.n){
                    resp.send(204)                    
                }else{
                    throw new NotFoundError('Usuário não encontrado!')
                }
                return next()
            }).catch(next)

        })

    }
}

export const usersRouter = new UserRouter()