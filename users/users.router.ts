import { Router } from "../common/router";
import * as restify from 'restify'
import {User} from './users.mode'

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
            User.findById(req.params.id).then(this.render(resp, next))
        })
        //new endpoint

        applycation.post('/users', (req, resp, next)=>{
            let user = new User(req.body)            
            user.save().then(this.render(resp, next))
        })

        applycation.put('/users/:id', (req, resp, next)=>{
            const options  = {overwrite: true}
            User.update({_id:req.params.id}, req.body,  options)
                .exec().then(result=>{
                  if(result.n){
                    return User.findById(req.params.id)
                  }else{
                    resp.send(404)
                  }
            }).then(this.render(resp, next))
          })


          //metodo Path melhor não precisa  alterar tudo objeto

        applycation.patch('users/:id', (req, resp, next)=>{
            const options = {new :true}

            User.findByIdAndUpdate(req.params.id, req.body).
            then(this.render(resp, next))
        })

        applycation.del('/users/:id', (req, resp, next)=>{
            User.remove({_id: req.params.id}).exec().then((cmResult: any)=>{
                if(cmResult.result.n){
                    resp.send(204)                    
                }else{
                    resp.send(400)
                }
                return next()
            })

        })


    }
}

export const usersRouter = new UserRouter()