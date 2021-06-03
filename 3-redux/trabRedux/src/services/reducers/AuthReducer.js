
const initialState = {
    email: 'admin@admin.com',
    senha: 'lucas123',
};

const AuthReducer = (state = [], action) => {

    if(state.length == 0){
        return initialState;
    }

    if(action.type == 'editEmail'){
        return {
            ...state,
            email: action.payload.email,
        }
    }
    

    if(action.type == 'editSenha'){
        return {
            ...state,
            senha: action.payload.senha,
        }
    }

    return state;
}

export default AuthReducer;