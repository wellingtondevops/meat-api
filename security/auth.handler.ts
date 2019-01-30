import * as restify from 'restify'
import {NotAuthorizedError} from 'restify-errors'
import {User} from '../users/users.model'
import * as jwt from 'jsonwebtoken'
import {environment} from '../common/environment'

export const authenticate: restify.RequestHandler = (req, resp, next)=>{
    const {email, password} = req.body
    User.findByEmail(email,'+password') // o password não extá exposto na api, tem que arrumar isso, ou seja ficar exposto só  na autenticação.... --> feito
    .then(user=>{
        if(user && user.matches(password)){// implementar o metodo matches --> feito
            //gerar token
            const token = jwt.sign({sub: user.email, iss: 'meat-api'}, environment.security.apiSecret)
            resp.json({name: user.name, email:user.email, accesToken: token})
            return next(false)
        }else{
            return next (new NotAuthorizedError('Invalid credentials'))
        }
    }).catch(next)
}
