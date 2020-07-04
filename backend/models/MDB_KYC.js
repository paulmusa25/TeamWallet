const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema({
    USER_ID:
    {
        type:       Schema.Types.ObjectId,
        required:   true
    },
    last_name: 
    {
        type:       String
    },
    first_name:
    {
        type:       String
    },
    middle_name: 
    {
        type:       String
    },
    contact: 
    {
        type:       String
    },
    street_address: 
    {
        type:       String
    },
    city:
    {
        type:       String
    },
    state:
    {
        type:       String
    },
    zip_code:
    {
        type:       String
    },
    // level:
    // {
    //     type:       Schema.Types.Double,
    //     default:    1,
    //     required:   true
    // },
    security_question:
    {
        type:       String,
    },
    security_answer:
    {
        type:       String
    }
});

class MDB_KYC extends MODEL
{
    constructor ()
    {
        super('kyc', schema);
    }

    async findByUserId(user_id)
    {
        const res   = await this.collection.findOne({user_id});
        return res ? res.toJSON() : null;
    }

    async findByUserAyDi(USER_ID)
    {
        const res   = await this.collection.findOne({ USER_ID: USER_ID }, "security_question security_answer" );
        return res ? res : null;
    }
}

module.exports = MDB_KYC;