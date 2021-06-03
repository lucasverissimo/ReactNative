import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    background-color: #333333;
`;
export const Center = styled.KeyboardAvoidingView`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 10px;    
`;
export const Logo = styled.Image`
    width: 240px;
    height: 138px;
    margin-bottom: 20px;
`;
export const ContainerInputs = styled.View`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
`;
export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#aaaaaa'
})`
    width: 100%;
    height: 60px;
    padding: 10px;
    background-color: #666666;
    color: #ffffff;
    border-radius: 3px;
    margin-bottom: 10px;
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