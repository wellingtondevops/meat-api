"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const restify_errors_1 = require("restify-errors");
const restaurants_model_1 = require("./restaurants.model");
const authz_handler_1 = require("../security/authz.handler");
class RestaurantsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(restaurants_model_1.Restaurant);
        this.findMenu = (req, resp, next) => {
            restaurants_model_1.Restaurant.findById(req.params.id, "+menu")
                .then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Restaurant not found');
                }
                else {
                    resp.json(rest.menu);
                    return next();
                }
            }).catch(next);
        };
        this.replaceMenu = (req, resp, next) => {
            restaurants_model_1.Restaurant.findById(req.params.id).then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Restaurant not found');
                }
                else {
                    rest.menu = req.body; //array de MenuItem
                    return rest.save();
                }
            }).then(rest => {
                resp.json(rest.menu);
                return (next);
            }).catch(next);
        };
    }
    envelop(document) {
        let resource = super.envelope(document);
        resource._links.menu = `${this.basePath}/${resource._id}/menu`;
        return resource;
    }
    applyRoutes(applycation) {
        applycation.get(`${this.basePath}`, this.findAll);
        applycation.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        applycation.post(`${this.basePath}`, [authz_handler_1.authorize('admin'), this.save]);
        applycation.put(`${this.basePath}/:id`, [authz_handler_1.authorize('admin'), this.validateId, this.replace]);
        applycation.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        applycation.del(`${this.basePath}/:id`, [authz_handler_1.authorize('admin'), this.validateId, this.delete]);
        applycation.get(`${this.basePath}/:id/menu`, [this.validateId, this.findMenu]);
        applycation.put(`${this.basePath}/:id/menu`, [authz_handler_1.authorize('admin'), this.validateId, this.replaceMenu]);
    }
}
exports.restaurantsRouter = new RestaurantsRouter();
