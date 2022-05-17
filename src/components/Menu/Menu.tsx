import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { userInfo } from '../../api/handler';

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

const appPages: AppPage[] = [
    {
        title: 'Categories',
        url: '/categories',
        iosIcon: mailOutline,
        mdIcon: mailSharp
    }
];

const Menu: React.FC = () => {
    const location = useLocation();
    const [ user, setUser ] = useState<any>({})
    useEffect(() => {
        setUser(userInfo)
    }, [userInfo])

    return (
        <IonMenu contentId="main" type="overlay" className='menu'>
            <IonContent>
                <IonList>
                    <div className='head'>
                        <IonListHeader>{user?.username || ''}</IonListHeader>
                        <IonNote>{user?.email || ''}</IonNote>
                    </div>
                    {appPages.map((appPage, index) => {
                        return (
                        <IonMenuToggle key={index} autoHide={false}>
                            <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                                <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                <IonLabel>{appPage.title}</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        );
                    })}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
