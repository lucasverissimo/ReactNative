import { Platform } from 'react-native';
import styled from 'styled-components';

export const Container = styled.TouchableOpacity`
    background-color: ${Platform.OS === 'ios' ? '#00000066' : 'transparent '};
    position: absolute;
    justify-content: center
    width: 100%;
    height: 100%;
`;

export const Header = styled.View`
    width: 100%;
    padding: 15px;
    justify-content: flex-end;
    align-items: flex-end;
    background-color: #fff;
    border-bottom-width: 1px;
    border-color: #888;
`;