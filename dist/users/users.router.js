"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_mode_1 = require("./users.mode");
class UserRouter extends router_1.Router {
    applyRoutes(applycation) {
        //endpoint pesquisa todos usuários;
        applycation.get('/users', (req, resp, next) => {
            users_mode_1.User.findAll().then(users => {
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
    }
}
exports.usersRouter = new UserRouter();
