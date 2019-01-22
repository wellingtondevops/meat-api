"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_mode_1 = require("./users.mode");
class UserRouter extends router_1.Router {
    applyRoutes(applycation) {
        applycation.get('/users', (req, resp, next) => {
            users_mode_1.User.findAll().then(users => {
                resp.json(users);
                return next();
            });
        });
    }
}
exports.usersRouter = new UserRouter();
