import styled from 'styled-components/native'

export const AreaItem = styled.View`
    padding: 10px;
    background-color: #fff;
    border-radius: 3px;
    margin: 5px 0;
    width: 100%;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
export const ImageProd = styled.Image`
    width: 80px;
    height: 80px;
    margin-right: 10px;
    border-radius: 4px;
`;

export const AreaInfoProd = styled.View`
    flex: 1;
    flex-direction: column;
`;
export const NomeProd = styled.Text`
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: bold;
    color: #000;
`;
export const LegendaProd = styled.View`
    flex: 1;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
`;
export const VendasProd = styled.Text`    
    font-size: 14px;
    color: #444;
`;
export const SituacaoProd = styled.Text`
    background-color: ${props => props.situacao === 'Em estoque' ? ' #02a343': '#a34302'};
    color: #fff;
    padding: 5px;
    border-radius: 4px;    
`;