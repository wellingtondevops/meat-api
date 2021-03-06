"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    server: { port: process.env.SERVER_PORT || 3000 },
    db: { url: process.env.DB_URL || 'mongodb://meat:meat123456@ds163764.mlab.com:63764/meat' },
    //conexão banco de teste mongodb://meat_test:Senha124578@ds117145.mlab.com:17145/meat-db-test
    //variavel de ambiente para tipo de codificação 
    security: { saltRounds: process.env.SALT_ROUNDS || 10,
        apiSecret: process.env.API_SECRET || '4445445487-44112589-89898'
    }
};
