// const MDB_USER = require('../models/MDB_USER');
const MDB_CURRENCY = require('../models/MDB_CURRENCY');


module.exports = class CurrencyClass
{
	constructor(currency_information)
	{
		this.mdb_currency 			= new MDB_CURRENCY();
		this.currency_information	= currency_information;
	}

	async createCurrency()
	{
	    let res = {};

	    try
	    {
	        res.status = "success";

	        let add_form =
	        { 
	            category: 		this.currency_information.category,
	            currency: 		this.currency_information.currency,
	            decimal_places: this.currency_information.decimal_places
	        }

	        await this.mdb_currency.add(add_form);
	    }
	    catch (error)
	    {
	        res.status = "error";
	        res.message = error.message;
	    }

	    return res;
	}
}