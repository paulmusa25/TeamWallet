const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema         = new Schema({
    public_key: {
        type:       String,
        required:   true
    },
    private_key: {
        type:       String,
        required:   true
    },
    balance: {
        // type:       Schema.Types.Decimal128,
        type:       Number,
        default:    0,
        required:   true
    },
    USER_ID: {
        type:       Schema.Types.ObjectId,
        // required:   true
    },
    date_created: {
        type:       Date,
        default:    Date.now()
    }
});

class MDB_WALLET extends MODEL {
    constructor() {
        super('walletss', schema);
    }

    async findUser({public_key, amount}){
        const wallet_send = await this.collection.findOne({public_key});

        console.log('Before : ' + wallet_send.balance);

        const updated_balance = wallet_send.balance - amount;
        wallet_send.balance = updated_balance;
        wallet_send.save();

        console.log('After : ' + updated_balance);
    }

    async findRev({public_key, amount}){
        const wallet_receive = await this.collection.findOne({public_key});

        console.log('Before : ' + wallet_receive.balance);

        const updated_balance = wallet_receive.balance + amount;
        wallet_receive.balance = updated_balance;
        wallet_receive.save();

        console.log('After : ' + updated_balance);
    }

    async findByUserId(USER_ID){
        const res = await this.collection.findOne({ USER_ID: USER_ID },  "balance public_key" );
        return res ? res.toJSON() : null;
    }
    
    async findByPublicKey(public_key)
    {
        const res = await this.collection.findOne({public_key: public_key});
        return res ? res : null;
    }
}

module.exports = MDB_WALLET;