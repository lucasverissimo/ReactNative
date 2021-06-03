import React, { useState, useEffect } from 'react';
import { Background, Container, TitlePage } from '../../styles/homeStyle';

import Header from '../../../components/Header';
import CustomChart from '../../../components/CustomChart';
import DespesasItem  from '../../../components/DespesasItem';

export default function TabDespesas() {
  

  const data = [ 7, 5, 15, 12, 0, 9, 25,];
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const [ listaMaisVendidos, setListaMaisVendidos ] = useState([]);

  useEffect(()=>{

      function maisVendidos(){
         let data = [
            {"key": 1, "nome":"Despesa", "valor": 35.79, "qtdTotal": 35, },
            {"key": 2, "nome":"Despesa", "valor": 35.79, "qtdTotal": 35, },
            {"key": 3, "nome":"Despesa", "valor": 35.79, "qtdTotal": 35, },
            {"key": 4, "nome":"Despesa", "valor": 35.79, "qtdTotal": 35, },
            {"key": 5, "nome":"Despesa", "valor": 35.79, "qtdTotal": 35, },
            {"key": 6, "nome":"Despesa", "valor": 35.79, "qtdTotal": 35, },
         ];
         setListaMaisVendidos(data);
      }    

      maisVendidos();

  }, []);

 return (
   <Background>
       <Header name="Home - Despesas"/>
       
       <Container nestedScrollEnabled = {true}>
          <TitlePage>
             Despesas (Semana)
          </TitlePage> 
          <CustomChart yValue={data} xValue={diasSemana} xMax={6} />            
          <TitlePage>
             Maiores despesas
          </TitlePage>
            {listaMaisVendidos.map((value)=>{
               return(
                  <DespesasItem 
                     key={value.key}
                     data={value}
                  />
               );
            })}          
          
       </Container>

   </Background>
  );
}