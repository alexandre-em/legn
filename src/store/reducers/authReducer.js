

const user = null

const authReducer = (state = user, action) => {
    switch(action.type){
        case 'LOGIN':
            return action.value;
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}

export default authReducer