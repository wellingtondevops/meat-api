import { Router } from "../common/router";
import * as restify from 'restify'
import {User} from './users.mode'

class UserRouter extends Router {



    applyRoutes(applycation: restify.Server){

         //endpoint pesquisa todos usuários;

        applycation.get('/users', (req, resp, next)=>{

            User.find().then(users=> {

                resp.json(users)
                return next()

            })

        })

        //endpoint pesquisa usuário por id;

        applycation.get('/users/:id', (req, resp, next)=>{
            User.findById(req.params.id).then(user=>{
                if(user){
                    resp.json(user)
                    return next
                }                
                resp.send(404)
                return next()              
                
            })
        })

        //new endpoint
    }
}

export const usersRouter = new UserRouter()