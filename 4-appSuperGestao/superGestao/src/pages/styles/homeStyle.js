import styled from 'styled-components/native';

export const Background = styled.View`
    flex: 1;
    width: 100%;
`;

export const Container = styled.ScrollView`
    flex: 1;
    width: 100%;
    flex-direction: column;
    padding: 10px;
`;

export const TitlePage = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #212121;
    margin-bottom: 15px;
`;

export const List = styled.FlatList.attrs({
    marginHorizontal: 15
})`
    padding-top: 15px;
    background-color: #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin-left: 8px;
    margin-right: 8px;
    height: 150px;
`;


export const SubTitlePage = styled.Text`
    font-size: 15px;
    color: #000;
    margin-bottom: 15px;
    margin-top:5px;
`;



export const ButtonHeaderTitle = styled.TouchableOpacity`
    border-radius: 4px;
    padding: 10px 15px;
    align-items: center;
    justify-content: center;
    background-color: #02a343;
    margin: 0 5px;
`;

export const TextButtonHT = styled.Text``;

export const ContainerLista = styled.View`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 10px;
`;

