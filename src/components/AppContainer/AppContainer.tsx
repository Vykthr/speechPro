import React from 'react';
import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonMenuButton, IonPage, IonRow, IonSearchbar, IonText, IonToolbar } from '@ionic/react';
import { funnel, appsSharp, list, star, helpCircle, arrowBack } from 'ionicons/icons'
import { ReactNode } from 'react';
import './AppContainer.css';

interface AppContainerProps {
    children: ReactNode;
    category?: string;
}

const AppContainer: React.FC<AppContainerProps> = ({ children, category = '' }) => {
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar style={{ marginTop: '1.2rem' }}>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonSearchbar placeholder='Search' />
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonGrid className='header'>
                    <IonRow>
                        <IonCol className='active'>
                            <IonIcon icon={appsSharp}></IonIcon>
                        </IonCol>
                        <IonCol>
                            <IonIcon icon={list}></IonIcon>
                        </IonCol>
                        <IonCol>
                            <IonIcon icon={funnel}></IonIcon>
                        </IonCol>
                        <IonCol>
                            <IonIcon icon={star}></IonIcon>
                        </IonCol>
                        <IonCol>
                            <IonIcon icon={helpCircle}></IonIcon>
                        </IonCol>
                    </IonRow>
                    {
                        category &&
                        <IonRow className='breadcrumb'>
                            <IonItem lines='none'>
                                <IonButtons slot='start'>
                                    <IonBackButton  defaultHref='/' />
                                </IonButtons>
                                <IonText>
                                    {category}
                                </IonText>
                            </IonItem>
                        </IonRow>
                    }
                </IonGrid>

                <div className='ion-padding'>
                    { children }
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AppContainer;
