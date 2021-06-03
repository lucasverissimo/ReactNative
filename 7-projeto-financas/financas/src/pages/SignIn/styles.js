import styled from 'styled-components/native';


export const Background = styled.View`
    flex: 1;
    background-color:  #333333;
`; 
export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
`; 
export const Logo = styled.Image`
    margin-bottom:15px;
`; 
export const AreaInput = styled.View`
    flex-direction: row;
`; 
export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#888'
})`
    background: rgba(0, 0, 0, 0.2);
    width: 90%;
    font-size: 17px;
    color: #fff;
    margin-bottom:15px;
    padding: 10px;
    border-radius: 4px;
`; 

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #00b94a;
    width: 90%;
    height: auto;
    padding: 10px;
    margin-top:15px;
    border-radius: 4px;
`; 
export const SubmitText = styled.Text`
    font-size: 16px;
    color: #fff;
`; 
export const Link = styled.TouchableOpacity`
    margin-top: 30px;
    margin-bottom: 10px;    
`; 
export const LinkText = styled.Text`
    color: #fff;
`; 
