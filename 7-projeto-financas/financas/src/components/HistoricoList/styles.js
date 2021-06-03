import styled from 'styled-components/native';

export const Container = styled.View`
    margin-bottom: 5px;
    padding: 15px;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.4);
    background-color: #f8f8f8;
    margin-left: 15px;
    margin-right: 15px;
`;
export const Tipo = styled.View`
    flex-direction: row;

`;
export const IconView = styled.View`
    flex-direction: row;
    background-color: ${props => props.tipo === 'despesa' ? '#c62c36' : '#049301'};
    padding-bottom: 3px;
    padding-top: 3px;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 5px;
`;
export const TipoText = styled.Text`
    color: #fff;
    font-size:14px;
    font-style: italic;
`;
export const NomeDespesa = styled.Text`
    margin-top: 15px;
    margin-bottom: 5px;
    font-size: 18px;    
`;
export const ValorText  = styled.Text`
    color: #222;
    font-size: 22px;
    font-weight: bold;
`;

