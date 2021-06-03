import React, { useState, useEffect } from 'react';
import { Background, Container, TitlePage, List } from '../../styles/homeStyle';
import { SafeAreaView } from 'react-native';

import Header from '../../../components/Header';
import CustomChart from '../../../components/CustomChart';
import MaisVendidosList from '../../../components/MaisVendidosList';

export default function TabVendas() {

  const data = [ 7, 5, 15, 12, 0, 9, 25,];
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const [ listaMaisVendidos, setListaMaisVendidos ] = useState([]);

  useEffect(()=>{

      function maisVendidos(){
         let data = [
            {"key": 1, "nome":"Produto teste mais vendido", "qtdVendas": 35, "situacao":"Em estoque", "imagem":"https://lucasverissimo.com.br/imagens/picture.jpg"},
            {"key": 2, "nome":"Produto teste mais vendido", "qtdVendas": 34, "situacao":"Em estoque", "imagem":"https://lucasverissimo.com.br/imagens/picture.jpg"},
            {"key": 3, "nome":"Produto teste mais vendido", "qtdVendas": 30, "situacao":"Em estoque", "imagem":"https://lucasverissimo.com.br/imagens/picture.jpg"},
            {"key": 4, "nome":"Produto teste mais vendido", "qtdVendas": 28, "situacao":"Fora de estoque", "imagem":"https://lucasverissimo.com.br/imagens/picture.jpg"},
            {"key": 5, "nome":"Produto teste mais vendido", "qtdVendas": 27, "situacao":"Fora de estoque", "imagem":"https://lucasverissimo.com.br/imagens/picture.jpg"},
            {"key": 6, "nome":"Produto teste mais vendido", "qtdVendas": 15, "situacao":"Em estoque", "imagem":"https://lucasverissimo.com.br/imagens/picture.jpg"},          
         ];
         setListaMaisVendidos(data);
      }    

      maisVendidos();

  }, []);

 return (
   <Background>
       <Header name="Home - Vendas"/>
       
       <Container nestedScrollEnabled = {true}>
          <TitlePage>
             Vendas (Semana)
          </TitlePage> 
          <CustomChart yValue={data} xValue={diasSemana} xMax={6} />            
          <TitlePage>
             Produtos mais vendidos
          </TitlePage>
            {listaMaisVendidos.map((value)=>{
               return(
                  <MaisVendidosList 
                     key={value.key}
                     data={value}
                  />
               );
            })}          
          
       </Container>

   </Background>
  );
}