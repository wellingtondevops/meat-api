import 'jest'
import * as request from 'supertest'
import {Server} from '../server/server'
import {environment} from '../common/environment'
import {usersRouter} from './users.router'
import {User} from './users.model'

let address: string
let server: Server
beforeAll(()=>{
  environment.db.url = process.env.DB_URL || 'mongodb://meat_test:Senha124578@ds117145.mlab.com:17145/meat-db-test'
  environment.server.port = process.env.SERVER_PORT || 3001
  address = `http://localhost:${environment.server.port}`
  server = new Server()
  return server.bootstrap([usersRouter])
               .then(()=>User.remove({}).exec())
               .catch(console.error)
})

test('get /users', ()=>{
  return request(address)
     .get('/users')
     .then(response=>{
      expect(response.status).toBe(200)
      expect(response.body.items).toBeInstanceOf(Array)
     }).catch(fail)
})

/*test('post /users', ()=>{
  return request(address)
     .post('/users')
     .send({
       name: 'usuario1',
       email: 'usuario1@email.com',
       password: '123456',
       cpf: '962.116.531-82'
     })
     .then(response=>{
        expect(response.status).toBe(200)
        expect(response.body._id).toBeDefined()
        expect(response.body.name).toBe('usuario1')
        expect(response.body.email).toBe('usuario1@email.com')
        expect(response.body.cpf).toBe('962.116.531-82')
        expect(response.body.password).toBeUndefined()
     }).catch(fail)
})

/*afterAll(()=>{
  return server.shutdown()
})*/
