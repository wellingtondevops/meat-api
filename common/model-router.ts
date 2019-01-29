import {Router} from './router'
import * as mongoose from 'mongoose'
import {NotFoundError} from 'restify-errors'


export abstract class ModelRouter<D extends mongoose.Document> extends Router{
    basePath: string
    constructor(protected model: mongoose.Model<D>) {
        super()
        this.basePath = `/${model.collection.name}`
    }

    protected prepareOne(query: mongoose.DocumentQuery<D,D>): mongoose.DocumentQuery<D,D>{
        return query
    }

    envelop(document: any): any{
        let resource = Object.assign({_links:{}}, document.toJSON())
        resource._links.self = `${this.basePath}/${resource._id}`
        return resource

        
    }

    validateId = (req, resp, next)=>{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            next(new NotFoundError('Document no found'))
        }else{
            next()
        }
    }

    findAll = (req, resp, next)=>{
        this.model.find().then(this.renderAll(resp, next))
    }

    findById = (req, resp, next)=>{
       this.prepareOne(this.model.findById(req.params.id)).then(this.render(resp, next)).catch(next)
    }

    save = (req, resp, next)=>{
        let document = new this.model(req.body)            
        document.save().then(this.render(resp, next)).catch(next)
    }

    replace = (req, resp, next)=>{
        const options  = {runValidators:true, overwrite: true}
        this.model.update({_id:req.params.id}, req.body,  options)
            .exec().then(result=>{
              if(result.n){
                return this.model.findById(req.params.id)
              }else{
                throw new NotFoundError('Usuário não encontrado!')           
              }
        }).then(this.render(resp, next)).catch(next)
      }

    update =  (req, resp, next)=>{
        const options = {runValidators:true, new :true}
        this.model.findByIdAndUpdate(req.params.id, req.body, options).                                     
        then(this.render(resp, next)).catch(next)
    }


    delete = (req, resp, next)=>{
        this.model.remove({_id: req.params.id}).exec().then((cmResult: any)=>{
            if(cmResult.result.n){
                resp.send(204)                    
            }else{                                                 
                throw new NotFoundError('Usuário não encontrado!')
            }
            return next()
        }).catch(next)

    }
    
    
}