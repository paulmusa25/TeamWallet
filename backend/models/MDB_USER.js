const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema({
    full_name :
    {
        type:       String,
        required:   true
    },
    email:
    {
        type:       String,
        required:   true
    },
    password:
    {
        type:       String,
        required:   true
    },
    // isAdmin:
    // {
    //     type:       Boolean,
    //     default:    false
    // }
});

class MDB_USER extends MODEL
{
    constructor ()
    {
        super('users', schema);
    }
    
    async findByEmail(email)
    {
        const res = await this.collection.findOne({ email: email });
        return res ? res.toJSON() : null;
    }

    async findByUsernameAndPassword(email, password)
    {
        const res = await this.collection.findOne({ email: email, password: password });
        return res ? res.toJSON() : null;
    }
    
    async findByAccountId(id)
    {
        const res = await this.collection.findById(id, "full_name");
        return res ? res : null;
    }

    // Send Password Security
    async findByIdSecurity(id)
    {
        const res = await this.collection.findById(id, "password");
        return res ? res : null;
    }
}

module.exports = MDB_USER;