const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const should = chai.should();

chai.use(chaiHttp)
describe('/POST register', ()=>{
    it('registers a user',()=>{
        const details = {
            firstName:"Samuel",
            lastName: "Offem",
            email:"samoffem@gmail.com",
            password:"12345"
        }
        chai.request(server)
            .post('/api/v1/auth/register')
            .send(details)
            .end((err, res)=>{
                res.should.have.status(200);
            })
    })
})

describe('/POST signin', ()=>{
    it('logs in a registered user', ()=>{
        const details = {
            email:"samoffem@gmail.com",
            password:"12345"
        }
        chai.request(server)
            .post('/api/v1/auth/signin')
            .send(details)
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('data')
            })
    })
})

describe('/POST create account', ()=>{
    it('creates an account for a registered user', ()=>{
        const details = {
            type: "savings",
            status: "active",
            balance: 10000
        }
        chai.request(server)
            .post('/api/v1/account/create')
            .send(details)
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.data.should.have.property('accountNumber')
            })
    })
})

describe('/PATCH activate or deactivate account', ()=>{
    it('activates or deactivates account for users', ()=>{
        const details = {
            status: "active"
        }
        chai.request(server)
            .patch('/api/v1/account/'+4321)
            .send(details)
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.data.should.have.property('status')
            })
    })
})

describe('/DELETE deletes an account', ()=>{
    it('deletes a users account', ()=>{
        const details = {
            accountNumber: "4321"
        }
        chai.request(server)
            .delete('/api/v1/account/'+4321)
            .send(details)
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.have.property('message')
            })
    })
})

describe('/POST credits an account', ()=>{
    it('credits a users account', ()=>{
        const details = {
            accountNumber:4321,
            amount:2000,
            cashier:1001,
            transactionType:"credit"
        }
        chai.request(server)
            .post('/api/v1/transaction/'+ 4321 + '/credit')
            .send(details)
            .end((err, res)=>{
                console.log(res.body)
                res.should.have.status(200)
                //res.body.data.should.have.property('transactionId')
            })
    })
})
