import React, { useEffect, useState } from 'react';
import './Home.css';
import AppContainer from '../../components/AppContainer/AppContainer';
import { IonCol, IonIcon, IonItem, IonRow, IonText, IonRouterLink, IonNav, IonButton} from '@ionic/react';
import { earth } from 'ionicons/icons';
import { words, getWords } from '../../api/handler';

import { setUpDb } from '../../api/handler';

const Home: React.FC = () => {
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ wrds, setWords ] = useState<Array<any>>([])

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
            <IonRow>
                {
                    [ ...new Set(wrds.map(word => word.category))].map((category, key) => (
                        <IonCol size="4" className='custom' key={key}>
                            <IonRouterLink routerLink={`/categories/${category}`}>
                                <IonIcon icon={earth} />
                                <IonText>
                                    { category }
                                </IonText>
                            </IonRouterLink>
                        </IonCol>
                    ))
                }
            </IonRow>
        </AppContainer>

    );
};

export default Home;
