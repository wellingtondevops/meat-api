"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_mode_1 = require("./users.mode");
class UserRouter extends router_1.Router {
    applyRoutes(applycation) {
        //endpoint pesquis todos usuários;
        applycation.get('/users', (req, resp, next) => {
            users_mode_1.User.find().then(users => {
                resp.json(users);
                return next();
            });
        });
        //endpoint pesquisa usuário por id;
        applycation.get('/users/:id', (req, resp, next) => {
            users_mode_1.User.findById(req.params.id).then(user => {
                if (user) {
                    resp.json(user);
                    return next;
                }
                resp.send(404);
                return next();
            });
        });
        //new endpoint
        applycation.post('/users', (req, resp, next) => {
            let user = new users_mode_1.User(req.body);
            user.save().then(user => {
                user.password = undefined;
                resp.json(user);
                return next();
            });
        });
        applycation.put('/users/:id', (req, resp, next) => {
            const options = { overwrite: true };
            users_mode_1.User.update({ _id: req.params.id }, req.body, options)
                .exec().then(result => {
                if (result.n) {
                    return users_mode_1.User.findById(req.params.id);
                }
                else {
                    resp.send(404);
                }
            }).then(user => {
                resp.json(user);
                return next();
            });
        });
        //metodo Path melhor não precisa  alterar tudo objeto
        applycation.patch('users/:id', (req, resp, next) => {
            const options = { new: true };
            users_mode_1.User.findByIdAndUpdate(req.params.id, req.body).
                then(user => {
                if (user) {
                    resp.json(user);
                    return next();
                }
                resp.send(404);
                return next();
            });
        });
    }
}
exports.usersRouter = new UserRouter();
