import styled from "styled-components/native";

export const ContainerCategoria = styled.View`
    display: flex;
    flex: 1;
    margin-bottom: 10px;
    margin-top: 5px;
    flex-direction: row;

`;
export const ContainerInfos = styled.View`
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
export const LabelNome = styled.Text`
    font-weight: bold;
    font-size: 15px;
`;
export const ContainerBtns = styled.View`
    width: 20%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;
export const ButtonRemove = styled.TouchableOpacity`
    padding: 8px;
    border-radius: 3px;
    background-color: #fa0000;
    margin-right: 10px;
`;
export const ButtonEdit = styled.TouchableOpacity`
    background-color: #02a343;
    padding: 8px;
`;
export const TextBtn = styled.Text``;
