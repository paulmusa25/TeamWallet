const AccountClass  = require('../classess/AccountClass');

module.exports =
{
    async updateProfile(req, res)
    {
        console.log(req.user_info);
        res.send("update profile");
    },
}