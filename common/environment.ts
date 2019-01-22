export const environment = {

    server: { port: process.env.SERVER_PORT || 3000},
    db: {url: process.env.DB_URL || 'mongodb://meat:meat123456@ds163764.mlab.com:63764/meat'}

}