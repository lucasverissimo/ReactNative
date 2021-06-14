import React from 'react';
import { HeaderTitle, ButtonsHeader, TitlePage } from './titleHeaderStyle';

export default function TitleHeader({children, name}) {

    // 
 return (
    <HeaderTitle>
        <TitlePage>{name}</TitlePage>
        <ButtonsHeader>
            {children}
        </ButtonsHeader>
    </HeaderTitle>
  );
}