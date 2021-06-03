import React from 'react';
import { AreaItem, ImageProd, AreaInfoProd, NomeProd, LegendaProd, VendasProd, SituacaoProd } from './maisVendidosStyle';

export default function MaisVendidosList(props) {
    const data = props.data;
    return (
        <AreaItem>
            <ImageProd source={{ uri: data.imagem }} />
            <AreaInfoProd>
                <NomeProd>
                    {data.nome}
                </NomeProd>
                <LegendaProd>
                    <VendasProd>Total de vendas: {data.qtdVendas}</VendasProd>
                    <SituacaoProd situacao={data.situacao}>
                        {data.situacao}
                    </SituacaoProd>    
                </LegendaProd>                
            </AreaInfoProd>
        </AreaItem>
    );
}