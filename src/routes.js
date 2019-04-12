const authenticationController = require('./authenticationController')

module.exports = (app)=>{
    app.post('/api/v1/auth/register', authenticationController.register)
    app.post('/api/v1/auth/signin', authenticationController.signin)
    app.post('/api/v1/account/create', authenticationController.createAccount)
    app.patch('/api/v1/account/:id', authenticationController.activate_Deactivate)
    app.delete('/api/v1/account/:id', authenticationController.delete)
    app.post('/api/v1/transaction/:accountNumber/credit', authenticationController.credit);
    app.post('/api/v1/transaction/:accountNumber/debit', authenticationController.debit);

}