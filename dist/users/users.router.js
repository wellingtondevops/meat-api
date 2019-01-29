"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users.model");
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
        applycation.get({ path: `${this.basePath}`, version: '2.0.0' }, [this.findByEmail, this.findAll]);
        applycation.get({ path: `${this.basePath}`, version: '1.0.0' }, this.findAll);
        applycation.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        applycation.post(`${this.basePath}`, this.save);
        applycation.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        applycation.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        applycation.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
    }
}
exports.usersRouter = new UserRouter();
