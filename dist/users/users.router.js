"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_mode_1 = require("./users.mode");
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
            users_mode_1.User.find().then(this.render(resp, next));
        });
        //endpoint pesquisa usuário por id;
        applycation.get('/users/:id', (req, resp, next) => {
            users_mode_1.User.findById(req.params.id).then(this.render(resp, next));
        });
        //new endpoint
        applycation.post('/users', (req, resp, next) => {
            let user = new users_mode_1.User(req.body);
            user.save().then(this.render(resp, next));
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
            }).then(this.render(resp, next));
        });
        //metodo Path melhor não precisa  alterar tudo objeto
        applycation.patch('users/:id', (req, resp, next) => {
            const options = { new: true };
            users_mode_1.User.findByIdAndUpdate(req.params.id, req.body).
                then(this.render(resp, next));
        });
        applycation.del('/users/:id', (req, resp, next) => {
            users_mode_1.User.remove({ _id: req.params.id }).exec().then((cmResult) => {
                if (cmResult.result.n) {
                    resp.send(204);
                }
                else {
                    resp.send(400);
                }
                return next();
            });
        });
    }
}
exports.usersRouter = new UserRouter();
