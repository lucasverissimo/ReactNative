import styled from 'styled-components/native';

export const AreaItem = styled.View`
    flex: 1;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 10px;
    background-color: #fff;
    margin-bottom: 5px;
`;
export const LegendaDespesa = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
`;
export const NomeDespesa = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;
export const ValorDespesa = styled.Text`
    font-size: 16px;
    margin-right: 10px;
`;
export const QtdDespesa = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #fa0000;
`;