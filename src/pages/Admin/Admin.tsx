import React, { useEffect, useState } from 'react';
import './Admin.css';
import AppContainer from '../../components/AppContainer/AppContainer';
import { IonCol, IonIcon, IonRow, IonText, IonRouterLink, IonNav, IonButton, useIonAlert, IonLoading} from '@ionic/react';
import { createOutline, earth } from 'ionicons/icons';
import { words, getWords } from '../../api/handler';

import { useHistory } from 'react-router';

const Admin: React.FC = () => {
    const [ wrds, setWords ] = useState<Array<any>>([])
    const history = useHistory()
    const [ showLoading, setShowLoading ] = useState(true);
    const [ present ] = useIonAlert();

    const init = async () => {
        setShowLoading(true)
        try {
            const res = await getWords();
            setWords(res)
        }
        catch {
            present({
                header: `Error`,
                message: `An error occurred while updating list, please try again`,
                buttons: [
                    'OK'
                ],
            })
        }
        finally {
            setShowLoading(false)
        }
    }

    const filter = (e: any) => {
        const searchVal = String(e.detail.value).toLowerCase();
        if(searchVal) {
            const res = wrds.filter(w => (
                String(w.english_language).toLowerCase().indexOf(searchVal) > -1
                ||
                String(w.dharug_language).toLowerCase().indexOf(searchVal) > -1
                ||
                String(w.category).toLowerCase().indexOf(searchVal) > -1
            ))
            setWords(res)
        } else {
            setWords(words);
        }
    }

    useEffect(() => {
        init();
    }, [])

    useEffect(() => {
        setWords(words)
    }, [words])

    return (
        <AppContainer searchFunction={filter}>
            <IonButton onClick={() => history.push('/edit')} className='new-btn' fill='clear' expand='full'>New Word</IonButton>
            {
                wrds.map((word, key) => (
                    <IonRow key={key} className='admin'>
                        <IonCol size="1.5" >
                            <IonIcon className='color-green' icon={earth} />
                        </IonCol>
                        <IonCol size="9">
                            <IonRouterLink routerLink={`/edit/${word.docId}`}>
                                <IonText>
                                    <p><b>English: </b>{ word.english_language }</p>
                                    <p><b>Dharug: </b>{ word.dharug_language }</p>
                                    <p><b>Category: </b>{ word.category }</p>
                                </IonText>
                            </IonRouterLink>
                        </IonCol>
                        <IonCol size="1.5"className='icon-black' >
                            <IonIcon icon={createOutline} />
                            <small>Edit</small>
                        </IonCol>
                    </IonRow>
                ))
            }
            {
                showLoading &&
                <IonLoading
                    isOpen={showLoading}
                    // onDidDismiss={() => setShowLoading(false)}
                    message={'Updating List...'}
                />
            }
        </AppContainer>

    );
};

export default Admin;
