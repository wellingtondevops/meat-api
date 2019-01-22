"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const environment_1 = require("../common/environment");
class Server {
    initRoutes() {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                });
                this.application.use(restify.plugins.queryParser());
                //routes
                this.application.get('/info', [
                    (req, resp, next) => {
                        //capturando o browser
                        if (req.userAgent() && req.userAgent().includes('MSIE 7.0')) {
                            //resp.status(400)
                            //resp.json({message: 'Please, update your Browser'})
                            let error = new Error();
                            error.statusCode = 400;
                            error.message = 'Please, update your Browser';
                        }
                        return next(console.error());
                    }, (req, resp, next) => {
                        resp.json({
                            browser: req.userAgent(),
                            method: req.method,
                            url: req.href(),
                            path: req.path(),
                            query: req.query
                        });
                        return next();
                    }
                ]);
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap() {
        return this.initRoutes().then(() => this);
    }
}
exports.Server = Server;
