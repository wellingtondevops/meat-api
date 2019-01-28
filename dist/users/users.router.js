"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users.model");
class UserRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(applycation) {
        applycation.get('/users', this.findAll);
        applycation.get('/users/:id', [this.validateId, this.findById]);
        applycation.post('/users', this.save);
        applycation.put('/users/:id', [this.validateId, this.replace]);
        applycation.patch('users/:id', [this.validateId, this.update]);
        applycation.del('/users/:id', [this.validateId, this.delete]);
    }
}
exports.usersRouter = new UserRouter();
