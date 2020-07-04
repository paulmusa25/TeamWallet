const MDB_USER          = require('../models/MDB_USER');
const MDB_WALLET        = require('../models/MDB_WALLET');
const MDB_TRANSACTION   = require('../models/MDB_TRANSACTION');
const MDB_KYC           = require('../models/MDB_KYC');    

module.exports = class WalletClass
{
    constructor(wallet_information)
    {
        this.mdb_wallet     	= new MDB_WALLET();
		this.mdb_transaction 	= new MDB_TRANSACTION();
        this.mdb_user 			= new MDB_USER();
        this.mdb_kyc            = new MDB_KYC();
		this.wallet_information	= wallet_information;
    }

    async getBalance()
    {
    	let res = {};

    	let balance = await this.mdb_wallet.findByUserId(this.wallet_information.USER_ID);
        // console.log(balance)

    	if(balance)
    	{
    		res.status = "success";

    		res.data = balance;
    	}
    	else
    	{
    		res.status 	= "error";
    		res.message	= "Balance does not exists";
    	}

    	return res;
	}
	
	async getTransactionHistory()
    {
        let res             = {};
        let public_key      = await this.mdb_wallet.findByUserId(this.wallet_information.USER_ID);
        let transactions    = await this.mdb_transaction.findByTransactionHistory(public_key.public_key);
        let users       = [];

        if(transactions.length > 0)
        {
            for(let i = 0; i < transactions.length; i++) {
                if(transactions[i].receiver == public_key.public_key)
                {
                    let sender_user_id = await this.mdb_wallet.findByPublicKey(transactions[i].sender);
                    let user = await this.mdb_user.findByAccountId(sender_user_id.USER_ID);
                    users.push(user.full_name);
                }
                else if(transactions[i].sender == public_key.public_key)
                {
                    let receiver_user_id = await this.mdb_wallet.findByPublicKey(transactions[i].receiver);
                    let user = await this.mdb_user.findByAccountId(receiver_user_id.USER_ID);
                    users.push(user.full_name);
                }
            }
            res.status  = "success";
            res.data    = transactions;
            res.full_name = users;
            res.public_key = public_key.public_key
        }
        else
        {
            res.status  = "error";
            res.message = "No existing transaction";
        }

        return res;
    }

    // Send/Security
    async walletSend()
    {
        let res  = {};
        let password = await this.mdb_user.findByIdSecurity(this.wallet_information.USER_ID);
        let security = await this.mdb_kyc.findByUserAyDi(this.wallet_information.USER_ID);
        let balance = await this.mdb_wallet.findByUserId(this.wallet_information.USER_ID);

        if(
            (password != null && password.password == this.wallet_information.password) &&
            (
                (security != null && security.security_question == this.wallet_information.security_question) &&
                (security.security_answer == this.wallet_information.security_answer)
            ) 
            && (balance.balance > this.wallet_information.amount)
          )
        {
            await this.mdb_wallet.findUser(
                { 
                    public_key: this.wallet_information.sender, 
                    amount: this.wallet_information.amount 
                }
            );

            await this.mdb_wallet.findRev(
                { 
                    public_key: this.wallet_information.receiver, 
                    amount: this.wallet_information.amount 
                }
            );

            await this.mdb_transaction.insert(
                { 
                    sender: this.wallet_information.sender, 
                    receiver: this.wallet_information.receiver, 
                    amount: this.wallet_information.amount,
                    date_created: Date.now()
                }
            );

            res.status       = "success";
            // res.confirmation = "New transaction has been saved";
        }
        else
        {
            res.status  = "error";
            res.message = "Invalid credentials !";
        }

        return res;
    }
}