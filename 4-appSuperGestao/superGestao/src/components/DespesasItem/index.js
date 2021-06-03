import React from 'react';
import { AreaItem, LegendaDespesa, NomeDespesa, ValorDespesa, QtdDespesa } from './despesasItemStyle';

export default function DespesasItem(props) {
    const data = props.data;
 return (
    <AreaItem>
        <NomeDespesa>
            {data.nome}
        </NomeDespesa>
        <LegendaDespesa>
            <ValorDespesa>
                Valor: R$ {data.valor}
            </ValorDespesa>
            <QtdDespesa>
                Quantidade: {data.qtdTotal}
            </QtdDespesa>
        </LegendaDespesa>
    </AreaItem>
  );
}