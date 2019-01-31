"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users.model");
const auth_handler_1 = require("../security/auth.handler");
const authz_handler_1 = require("../security/authz.handler");
class UserRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        //exemplo de de busca por email querey email:
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                users_model_1.User.findByEmail(req.query.email)
                    .then(user => {
                    if (user) {
                        return [user];
                    }
                    else {
                        return [];
                    }
                })
                    .then(this.renderAll(resp, next))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(applycation) {
        //Exemplo de coontrole de versão da API
        applycation.get({ path: `${this.basePath}`, version: '2.0.0' }, [authz_handler_1.authorize('admin'), this.findByEmail, this.findAll]);
        applycation.get({ path: `${this.basePath}`, version: '1.0.0' }, [authz_handler_1.authorize('admin'), this.findAll]);
        applycation.get(`${this.basePath}/:id`, [authz_handler_1.authorize('admin'), this.validateId, this.findById]);
        applycation.post(`${this.basePath}`, [authz_handler_1.authorize('admin'), this.save]);
        applycation.put(`${this.basePath}/:id`, [authz_handler_1.authorize('admin'), this.validateId, this.replace]);
        applycation.patch(`${this.basePath}/:id`, [authz_handler_1.authorize('admin'), this.validateId, this.update]);
        applycation.del(`${this.basePath}/:id`, [authz_handler_1.authorize('admin'), this.validateId, this.delete]);
        applycation.post(`${this.basePath}/authenticate`, auth_handler_1.authenticate);
    }
}
exports.usersRouter = new UserRouter();
