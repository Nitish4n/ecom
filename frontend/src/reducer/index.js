const user  = {
    name: 'Nitish kumar',
    email: 'nitish4n1@gmail.com',
    password : '123456'
}


const userReducer = (state=user, action) => {
    if(action.type === "CHANGE_EMAIL"){
        return {
            ...state,
            email: action.payload
        }
    }
    return state;
}


export default userReducer;