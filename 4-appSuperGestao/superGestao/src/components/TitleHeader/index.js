import React from 'react';
import { HeaderTitle, ButtonHeaderTitle, TextButtonHT, TitlePage } from './titleHeaderStyle';

export default function TitleHeader({children, name, pressButtonFunc}) {

    // 
 return (
    <HeaderTitle>
        <TitlePage>{name}</TitlePage>
        <ButtonHeaderTitle onPress={()=>pressButtonFunc()}>
            <TextButtonHT>
                {children}
            </TextButtonHT>
        </ButtonHeaderTitle>
    </HeaderTitle>
  );
}