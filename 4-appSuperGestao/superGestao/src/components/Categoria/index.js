import React from 'react';
import { ContainerCategoria, ContainerInfos, LabelNome, ContainerBtns, ButtonRemove, TextBtn, ButtonEdit } from './categoriaStyle';
import Icon from 'react-native-vector-icons/Feather';

export default function Categoria({data, deletar, editar}) {
    

 return (
   
    <ContainerCategoria>

        <ContainerInfos>
            <LabelNome>{data.nome}</LabelNome>
        </ContainerInfos>

        <ContainerBtns>
            <ButtonRemove onPress={()=>deletar(data.id)}>
                <TextBtn>
                    <Icon name="trash-2" color="#fff" size={20}  />
                </TextBtn>
            </ButtonRemove>
            <ButtonEdit onPress={()=>editar(data.id)}>
                <TextBtn>
                    <Icon name="edit" color="#fff" size={20}  />
                </TextBtn>
            </ButtonEdit>            
        </ContainerBtns>

    </ContainerCategoria>
   
  );
}