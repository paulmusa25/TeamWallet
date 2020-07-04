const MDB_USER = require('../models/MDB_USER');
const jwt      = require('jsonwebtoken');
const bcrypt   = require('bcryptjs');

module.exports = class AccountClass
{
    constructor(user_information)
    {
        this.mdb_user = new MDB_USER();
        this.user_information = user_information;
    }

    async validate()
    {
        let res = {};

        let check_email = await this.mdb_user.findByEmail(this.user_information.email);

        if(this.user_information.full_name.trim() == '' || this.user_information.password.trim() == '' || this.user_information.email.trim() == '')
        {
            res.status      = "error";
            res.message     = "You need to fill up all fields in order to proceed.";
        }
        else if(this.user_information.confirm_password !== this.user_information.password)
        {
            res.status      = "error";
            res.message     = "The password you entered didn't match.";
        }
        else if(check_email)
        {
            res.status      = "error";
            res.message     = "The e-mail you entered already exist.";
        }
        else
        {
            res.status = "success";
        }

        return res;
    }

    async authenticate()
    {
        let res             = {};

        let check_account   = await this.mdb_user.findByUsernameAndPassword(this.user_information.email, this.user_information.password);

        let token_mixer     = process.env.TOKEN_MIXER;

        if(check_account)
        {
            res.status          = "success";
            delete check_account.password;
            check_account.token = jwt.sign(check_account, token_mixer ? token_mixer : 'water123');
            res.data            = check_account;
        }
        else
        {
            res.status      = "error";
            res.message     = "Invalid Credentials";
        }

        return res;
    }

    async create()
    {
        let res = {};

        try
        {
            res.status = "success";

            let add_form =
            { 
                full_name: this.user_information.full_name,
                email: this.user_information.email,
                password: this.user_information.password
            }

            await this.mdb_user.add(add_form);
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }
    
    delete()
    {
    }
}