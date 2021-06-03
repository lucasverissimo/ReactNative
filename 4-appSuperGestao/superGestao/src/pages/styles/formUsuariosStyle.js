import styled from 'styled-components/native';

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#666'
})`
    width: 100%;
    height: 60px;
    padding: 10px;
    background-color: #efefef;
    color: #000;
    border-radius: 3px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
`;
export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    border-radius: 3px;
    background-color: #02a343;
`;
export const SubmitText = styled.Text`
    font-size: 16px;
    color: #ffffff;
    font-weight: bold;
`;