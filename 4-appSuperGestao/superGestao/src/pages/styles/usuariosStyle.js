import styled from 'styled-components/native'

export const AreaListaUsuarios = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: center;
    margin: 4px 0;
    padding: 15px;
    background-color: #fff;
`;

export const HeaderAreaListaUsuarios = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const NomeUsuario = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

export const BtnAcoes = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

export const BtnEditarUsuario = styled.TouchableOpacity`
    margin-left: 10px;
    background-color: #02a343;
    padding: 8px;
    border-radius: 4px;
`;

export const BtnExcluirUsuario = styled.TouchableOpacity`
    background-color: #fa0000;
    padding: 8px;
    border-radius: 4px;
`;