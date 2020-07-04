const CurrencyClass = require('../classess/CurrencyClass');

module.exports = 
{
	async addCurrency(req, res)
    {
        let currency_information =
        {
            category: 		req.body.category,
            currency: 		req.body.currency,
            decimal_places: req.body.decimal_places
        }

        let currency_class 		= new CurrencyClass(currency_information);
        let currency_creation   = await currency_class.createCurrency();

        if(currency_creation.status == "error")
        {
            res.status(400).send({ message: currency_creation.message });
        }
        else
        {
            res.send({ message: currency_creation.status })
        }

        //ASK
        res.send(true);
    },
}