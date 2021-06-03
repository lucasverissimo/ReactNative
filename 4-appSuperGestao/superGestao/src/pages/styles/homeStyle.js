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

