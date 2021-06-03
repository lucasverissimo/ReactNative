import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Container, BtnMenu, NamePage } from './headerStyle';
import Icon from 'react-native-vector-icons/Feather';



export default function Header(props) {
    
    const navigation = useNavigation();

    const [namePage, setNamePage] = useState('');
    const [ itemsDropMenu, setItemsDropMenu ] = useState([
        "Configurações",
        "Sair",
    ]);

    useEffect(()=>{

        if(props.name){
            setNamePage(props.name);
        }else{
            setNamePage("Super Gestão");
        }

    }, []);


    function noDrawer(){
        if(props.noDrawer){
            return (
                <BtnMenu onPress={ () => navigation.goBack() }>
                    <Icon name="chevron-left" size={30} color="#02a343"  />
                </BtnMenu>
            );
        }else{
            return(
                <BtnMenu onPress={ () => navigation.toggleDrawer() }>
                    <Icon name="align-left" size={30} color="#02a343"  />
                </BtnMenu>
            );
        }
    }

 return (
   <Container>
       {(noDrawer())}
       
       <NamePage>{namePage}</NamePage>       
       {/*<ContainerDropMenu>
           <IconMiniMenu>
               <Icon name="chevrons-down" size={25} color="#02a343" />
           </IconMiniMenu>

           <DropMenuView>
               {itemsDropMenu.map((value)=>{
                   return(                                
                    <DropMenuItem key={value} onPress={()=>alert('teste')}>
                       <DropMenuText>{value}</DropMenuText>
                    </DropMenuItem>
                   );
               })}
           </DropMenuView>
           
       </ContainerDropMenu>*/}
   </Container>
  );
}