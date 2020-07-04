const jwt               = require('jsonwebtoken');
const MDB_USER          = require('../models/MDB_USER');

module.exports = (req, res, next) =>
{
    let mdb_user        = new MDB_USER();

    let token       = req.headers.authorization;
    let token_mixer = process.env.TOKEN_MIXER;
    // console.log(req.headers.authorization)

    jwt.verify(token, token_mixer ? token_mixer : '123456', async function(err, decoded)
    {
        if (err)
        {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        } 
        else
        {
            let user_info = await mdb_user.doc(decoded._id);
            req.user_info = user_info;
            next();
        }
    });
}