import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction:row;
    width: 100%;
    height: 60px;
    padding: 10px 15px;
    background-color: #212121;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    position: relative;
    z-index: 10;
    
`;

export const BtnMenu = styled.TouchableOpacity`
    position: absolute;
    left: 10px;
    top: 15px;
`;

export const NamePage = styled.Text`
    font-size: 16px;
    color: #fff;
`;

export const IconMiniMenu = styled.TouchableOpacity`

`;

export const ContainerDropMenu = styled.View`
    position: relative;
`;
export const DropMenuView = styled.View`
    position: absolute;
    right: 0;
    top: 100%;
    width: 200px;
    padding: 10px;
    background: #333;
    border: 2px solid #02a343;
    border-radius: 4px;
    box-shadow: #000 0px 0px 6px;
    z-index: 9999;
`;
export const DropMenuItem = styled.TouchableOpacity`
    width: 100%;
    height: 30px;
    align-items: flex-end;
    justify-content: center;
    padding: 5px;
`;
export const DropMenuText = styled.Text`
    color: #fff;
    font-size: 14px;
`;
