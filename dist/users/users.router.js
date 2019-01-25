"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
const restify_errors_1 = require("restify-errors");
class UserRouter extends router_1.Router {
    constructor() {
        super();
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(applycation) {
        //endpoint pesquis todos usuários;
        applycation.get('/users', (req, resp, next) => {
            users_model_1.User.find().then(this.render(resp, next));
        });
        //endpoint pesquisa usuário por id;
        applycation.get('/users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id).then(this.render(resp, next)).catch(next);
        });
        //new endpoint
        applycation.post('/users', (req, resp, next) => {
            let user = new users_model_1.User(req.body);
            user.save().then(this.render(resp, next)).catch(next);
        });
        applycation.put('/users/:id', (req, resp, next) => {
            const options = { runValidators: true, overwrite: true };
            users_model_1.User.update({ _id: req.params.id }, req.body, options)
                .exec().then(result => {
                if (result.n) {
                    return users_model_1.User.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Usuário não encontrado!');
                }
            }).then(this.render(resp, next)).catch(next);
        });
        //metodo Path melhor não precisa  alterar tudo objeto
        applycation.patch('users/:id', (req, resp, next) => {
            const options = { runValidators: true, new: true };
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options).
                then(this.render(resp, next)).catch(next);
        });
        applycation.del('/users/:id', (req, resp, next) => {
            users_model_1.User.remove({ _id: req.params.id }).exec().then((cmResult) => {
                if (cmResult.result.n) {
                    resp.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Usuário não encontrado!');
                }
                return next();
            }).catch(next);
        });
    }
}
exports.usersRouter = new UserRouter();
