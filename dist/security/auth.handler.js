"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
const users_model_1 = require("../users/users.model");
const jwt = require("jsonwebtoken");
const environment_1 = require("../common/environment");
exports.authenticate = (req, resp, next) => {
    const { email, password } = req.body;
    users_model_1.User.findByEmail(email, '+password') // o password não extá exposto na api, tem que arrumar isso, ou seja ficar exposto só  na autenticação.... --> feito
        .then(user => {
        if (user && user.matches(password)) { // implementar o metodo matches --> feito
            //gerar token
            const token = jwt.sign({ sub: user.email, iss: 'meat-api' }, environment_1.environment.security.apiSecret);
            resp.json({ name: user.name, email: user.email, accesToken: token });
            return next(false);
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError('Invalid credentials'));
        }
    }).catch(next);
};
