const express           = require('express');
const app               = express();
const cors              = require('cors');
const FrontController   = require('./controllers/FrontController');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Front Controller
app.post('/api/front/login', FrontController.login);
app.post('/api/front/registration', FrontController.registration);
app.post('/api/front/forgot_password', FrontController.forgotPassword);

// Member Controller
const MemberController      = require('./controllers/MemberController');
const member_only           = require('./middleware/member_only');

app.post('/api/member/update_profile', member_only, MemberController.updateProfile);

// Wallet Controller
const WalletController		= require('./controllers/WalletController');

app.post('/api/wallet/send_crypto_fiat', member_only, WalletController.sendCryptoFiat);
app.post('/api/wallet/view_wallet_balance', member_only, WalletController.viewWalletBalance);
app.post('/api/wallet/transaction_history', member_only, WalletController.transactionHistory);

// Admin Controller
const AdminController 	= require('./controllers/AdminController');
app.post('/api/admin/create_currency', member_only, AdminController.addCurrency);

app.listen({port: 4000}, (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }else {
        console.log('Server is up and running on port 4000...');
    }
});