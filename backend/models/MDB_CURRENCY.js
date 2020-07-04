const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema({
    category:
    {
        type:       String,
        required: 	true
    },
    currency:
    {
    	type: 		String,
    	required: 	true
    },
    decimal_places: 
    {
    	type: 		Number
    }
});

class MDB_CURRENCY extends MODEL
{
	constructor()
	{
		super('currencies', schema);
	}
}

module.exports = MDB_CURRENCY;