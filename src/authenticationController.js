
const random = ()=>{
    return Math.random().toString(36).substr(2)
};
const token = ()=>{
    return random() + random()
};
const userIdGenerator = ()=>{

};
let accountNumberInit = 4321;
let counter = 0;
const users = [];
const accounts = [];
const transactions = [];

module.exports = {
    register(req, res) {
        try {
            const {firstName, lastName, email, password} = req.body;
            const userData = {
                id: ++counter,
                email,
                firstName,
                lastName,
                password,
                type: "client",
                isAdmin: false
            }
            users.push(userData)
            res.send({
                status: 200,
                data: {
                    token: token(),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                }
            })
        } catch (err) {
            res.send({
                status: 400,
                error: "This email is already in use"
            })
        }
    },
    signin(req, res) {
        try {
            const {email, password} = req.body;
            const userInfo = users.find((user) => user.email === email && user.password === password)
            if (!userInfo) {
                return res.send({
                    status: 403,
                    error: "Login information is incorrect"
                })
            }
            const {id, firstName, lastName} = userInfo
            res.send({
                status: 200,
                data: {
                    token: token(),
                    id,
                    firstName,
                    lastName,
                    email
                }
            })
        } catch (err) {
            res.status(500).send({
                error: "An error occurred trying to login"
            })
        }
    },
    createAccount(req, res) {
        try {
            const {type, status, balance} = req.body
            const acctData = {
                id: null,
                accountNumber: accountNumberInit++,
                createdOn: new Date(),
                owner: users[0].id,
                type,
                status,
                balance
            }
            const openingBalance = acctData.balance
            accounts.push(acctData)
            res.send({
                status: 200,
                data: {
                    accountNumber: acctData.accountNumber,
                    firstName: users[0].firstName,
                    lastName: users[0].lastName,
                    email: users[0].email,
                    type,
                    openingBalance: parseFloat(openingBalance)
                }
            })
        } catch (e) {
            res.send({
                error: "There was an error creating account"
            })
        }
    },
    activate_Deactivate(req, res) {
        try {
            const accountInfo = accounts.find((account) => account.accountNumber === parseInt(req.params.id))
            res.send({
                status: 200,
                data: {
                    accountNumber: accountInfo.accountNumber,
                    status: req.body.status
                }
            })
        } catch (e) {
            res.send({
                error: "there was an error performing this task"
            })
        }
    },
    delete(req, res) {
        try {
            const accountIndex = accounts.findIndex((account) => account.accountNumber === parseInt(req.params.id));
            if (accountIndex !== -1) {
                accounts.splice(accountIndex, 1)
                res.send({
                    status: 200,
                    message: "Account successfully deleted"
                })
            } else {
                res.send({
                    status: 400,
                    message: "account details was not found"
                })
            }


        } catch (e) {
            res.send({
                error: "There was an error performing this operation"
            })

        }
    },
    credit(req, res) {
        try {
            let accountDetail = accounts.find((account)=> req.body.accountNumber === account.accountNumber)
            console.log(accountDetail)
            const oldBalance = accountDetail.balance;
            accountDetail.balance = accountDetail.balance + req.body.amount
            const newBalance = accountDetail.balance;
            const transaction = {
                id:1,
                createdOn: new Date(),
                type: "credit",
                accountNumber: req.body.accountNumber,
                cashier: req.body.cashier,
                amount: req.body.amount,
                oldBalance,
                newBalance
            }
            transactions.push(transaction)
            res.send({
                status: 200,
                data: {
                    transactionId: 1001,
                    accountNumber: req.body.accountNumber,
                    amount: req.body.amacr,
                    cashier: req.body.cashier,
                    transactionType: "credit",
                    accountBalance: accountDetail.balance
                }
            })
        } catch (e) {
            res.send({
                error: "There was an error crediting the account"
            })
        }
    },
    debit(req, res) {
        try {
            let accountDetail = accounts.find((account) => req.body.accountNumber === account.accountNumber)
            if(accountDetail.balance >= req.body.amount) {
                const oldBalance = accountDetail.balance;
                accountDetail.balance = accountDetail.balance - req.body.amount
                const newBalance = accountDetail.balance;
                const transaction = {
                    id:1,
                    createdOn: new Date(),
                    type: "credit",
                    accountNumber: req.body.accountNumber,
                    cashier: req.body.cashier,
                    amount: req.body.amount,
                    oldBalance,
                    newBalance
                }
                transactions.push(transaction)
                res.send({
                    status: 200,
                    data: {
                        transactionId: 1000,
                        accountNumber: req.body.accountNumber,
                        amount: req.body.amount,
                        cashier: req.body.cashier,
                        transactionType: "debit",
                        accountBalance: accountDetail.balance
                    }
                })
            }else{
                res.send({
                    status: 400,
                    message: "Insufficient balance"
                })
            }
        } catch (e) {

        }
    }
}