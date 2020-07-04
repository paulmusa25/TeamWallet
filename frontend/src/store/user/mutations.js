export function updateUser (state, user_info)
{
    if(user_info)
    {
        state.token     = user_info.token;
        state.user_info = user_info;
    }
    else
    {
        state.token       = null;
        state.user_info = null;
    }
}