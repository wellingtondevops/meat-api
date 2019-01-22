import { Router } from "../common/router";
import * as restify from 'restify'
import {User} from './users.mode'

class UserRouter extends Router {

    applyRoutes(applycation: restify.Server){
        applycation.get('/users', (req, resp, next)=>{

            User.findAll().then(users=> {

                resp.json(users)
                return next()

            })

        })
    }
}

export const usersRouter = new UserRouter()