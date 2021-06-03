
// o action serve para realizar ações e atualizar o Reducer.
// Não é necessário atualizar states aqui, talvez seja melhor utilizar funções 
// AS ATUALIZAÇÕES SÃO GLOBAIS, ENTÃO UMA action ATUALIZADA EM UMA PAGINA PODE SER PEGO UTILIZANDO O MESMO REDUCER EM OUTRA PAGINA.

export const editEmail = (value) => {
    console.log('valor: '+value);
    return{
        type: 'editEmail',
        payload:{
            email: value,
        }
    };
};

export const editSenha = (value) => {
    return {
        type: 'editSenha',
        payload: {
            senha: value,
        }
    };
};