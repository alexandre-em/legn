

const login = data => {
    return dispatch => {
        dispatch({
            type: 'LOGIN',
            value: data
        })
    }
}

const logout = () => {
    console.log("LOGOUT ACTION")
    return dispatch => {
        dispatch({
            type: 'LOGOUT',
            value: null
        })
    }
}


export { login, logout }