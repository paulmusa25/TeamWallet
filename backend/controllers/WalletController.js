const WalletClass = require('../classess/WalletClass');

module.exports =
{
    async viewWalletBalance(req, res)
    {
        let USER_ID            = req.body.USER_ID;
        let wallet_class       = new WalletClass({ USER_ID: USER_ID });  
        let balance            = await wallet_class.getBalance();
        // console.log(balance)

        if(balance.status ==  "success")
        {
            res.send(balance.data)
        }
        else
        {
            res.status(400).send({ message: balance.message })
        }
    },

    async transactionHistory(req, res)
    {
        let USER_ID           = req.body.USER_ID;
        let transaction_class   = new WalletClass({USER_ID: USER_ID});
        let transaction_history = await transaction_class.getTransactionHistory();

        if(transaction_history.status == "success")
        {
            res.send({transaction: transaction_history.data, user: transaction_history.full_name, public_key: transaction_history.public_key});
        }
        else if(transaction_history.status == "error")
        {
            res.status(400).send({ message: transaction_history.message });
        }
    },

    // Send / Password Security Q&A
    async sendCryptoFiat(req, res)
    {
        let sender              = req.body.sender;
        let receiver            = req.body.receiver;
        let amount              = req.body.amount;

        let USER_ID             = req.body.USER_ID;
        let password            = req.body.password;
        let security_question   = req.body.security_question;
        let security_answer     = req.body.security_answer;

        let wallet_class    = new WalletClass(
            { 
                sender: sender, 
                receiver: receiver, 
                amount: amount,  
                USER_ID: USER_ID, 
                password: password,
                security_question: security_question,
                security_answer: security_answer
            }
        );
        
        let wallet_details  = await wallet_class.walletSend();

        if(wallet_details.status == "success")
        {
            res.send({ message: wallet_details.confirmation });
        }
        else
        {
            res.status(400).send({ message: wallet_details.message });
        }
    }
}
