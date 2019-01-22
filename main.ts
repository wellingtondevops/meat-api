import { Server } from './server/server'
import {usersRouter} from './users/users.router'

const server = new Server()
server.bootstrap([usersRouter]).then(server => {
    console.log('Server is Litening on:', server.application.address())



}).catch(error => {
    console.log('Server failed to Start')
    console.error(error)
    process.exit(1)
})





