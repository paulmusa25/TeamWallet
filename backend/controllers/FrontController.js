const AccountClass = require('../classess/AccountClass');

module.exports =
{
    async login(req, res)
    {
        let email           = req.body.email;
        let password        = req.body.password;

        let authenticate    = await new AccountClass({ email: email, password: password }).authenticate();

        if(authenticate.status == "success")
        {
            res.send(authenticate.data);
        }
        else
        {
            res.status(400).send({ message: authenticate.message });
            console.log(authenticate.message)
        }

    },

    async registration(req, res)
    {
        let user_information =
        {
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_password
        }

        let account_class = new AccountClass(user_information);
        let account_validation = await account_class.validate();

        if(account_validation.status == "error")
        {
            res.status(400).send({ message: account_validation.message });
        }
        else if(account_validation.status == "success")
        {
            await account_class.create();
        }

        res.send(true);
    },

    async forgotPassword(req, res)
    {
        res.send("forgotPassword called");
    }
}