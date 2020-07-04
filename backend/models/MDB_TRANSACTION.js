const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;


const schema         = new Schema({
    // SENDER_ID: {
    //     type: Number,
    //     required: true
    // },
    // RECIEVER_ID: {
        
    //     type: Number,
    //     required: true
    // },
    sender: {
        type:       String,
        required:   true
    },
    receiver: {
        type:       String,
        required:   true
    },
    amount: {
        // type: Schema.Types.Decimal128,
        type:       Number,
        default:    0
    },
    date_created: {
        type:       Date,
        default:    Date.now()
    }
});

class MDB_TRANSACTION extends MODEL {
    constructor () {
        super('transactions', schema);
    }

    async insert({sender, receiver, amount, date_created}){
        try
        {
            const TransactionDetailsModel = this.collection;
            const transactiondetailsDoc   = new TransactionDetailsModel({sender, receiver, amount, date_created});
            
            const res = transactiondetailsDoc.save().then(async function(){
                console.log('Success');
            })
            .catch(async function(err){
                console.log('Fail');
            });
            
            return res;
        }
        catch(error){
            console.log(error);
        }
    }

    async findByTransactionHistory(public_key)
    {
        const res = await this.collection.find( { $or: [{sender: public_key}, {receiver: public_key}] } ).sort({date_created: 'desc'} );
        return res ? res : null;
    }
}

module.exports = MDB_TRANSACTION;