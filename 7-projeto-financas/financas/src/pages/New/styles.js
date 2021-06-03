import styled from 'styled-components/native';

export const Background = styled.View`
    flex: 1;
    background-color: #222;
    width: 100%;
`;

export const Nome = styled.Text`
    text-align: center;
    font-size: 28px;
    margin-top: 25px;
    margin-bottom: 25px;
    color: #fff;
    text-transform: capitalize;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#888'
})`
    width: 90%;
    margin-left: 5%;
    height: 50px;
    padding: 10px;
    border: 0;
    background-color: #fff;
    color: #000;
    font-size:16px;
    margin-bottom: 10px;
`;

export const SubmitButton = styled.TouchableOpacity`
    width: 90%;
    margin-left: 5%;
    height: 50px;
    margin-top: 10px;
    align-items: center;
    justify-content: center;
    background-color: #00b94a;
    border-radius: 4px;
`;

export const SubmitText = styled.Text`
    font-size: 16px;
    color: #fff;
    font-weight: bold;
`;