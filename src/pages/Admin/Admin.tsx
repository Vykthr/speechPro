import React, { useEffect, useState } from 'react';
import './Admin.css';
import AppContainer from '../../components/AppContainer/AppContainer';
import { IonCol, IonIcon, IonItem, IonRow, IonText, IonRouterLink, IonNav, IonButton} from '@ionic/react';
import { createOutline, earth } from 'ionicons/icons';
import { words, getWords } from '../../api/handler';

import { setUpDb } from '../../api/handler';
import { useHistory } from 'react-router';

const Home: React.FC = () => {
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ wrds, setWords ] = useState<Array<any>>([])
    const history = useHistory()
    const init = async () => {
        const res = await getWords();
        setWords(res)
    }

    const filter = (e: any) => {
        const searchVal = e.detail.value;
        if(searchVal) {
            const res = wrds.filter(w => (
                w.english_language.indexOf(searchVal) > -1
                ||
                w.dharug_language.indexOf(searchVal) > -1
                ||
                w.category.indexOf(searchVal) > -1
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
                        <IonCol size="1.5" >
                            <IonIcon icon={createOutline} />
                            <small>Edit</small>
                        </IonCol>
                    </IonRow>
                ))
            }
        </AppContainer>

    );
};

export default Home;
