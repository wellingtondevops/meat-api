"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const reviews_model_1 = require("./reviews.model");
const authz_handler_1 = require("../security/authz.handler");
class ReviewsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(reviews_model_1.Review);
    }
    prepareOne(query) {
        return query.populate('user', 'name')
            .populate('restaurant', 'name');
    }
    envelop(document) {
        let resource = super.envelope(document);
        const restID = document.restaurant._id ? document.restaurant._id : document.restaurant;
        resource._links.restaurant = `/restaurants/${restID}`;
        return resource;
    }
    /*findById = (req, resp, next)=>{
        this.model.findById(req.params.id)
            .populate('user', 'name')
            .populate('restaurant','name')
            .then(this.render(resp, next))
            .catch(next)
    }*/
    applyRoutes(applycation) {
        applycation.get(`${this.basePath}`, this.findAll);
        applycation.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        applycation.post(`${this.basePath}`, [authz_handler_1.authorize('user'), this.save]);
    }
}
exports.reviewsRouter = new ReviewsRouter();
