import React from 'react';
import './Category.css';
import AppContainer from '../../components/AppContainer/AppContainer';
import { useParams } from 'react-router';
import { IonButton, IonCol, IonGrid, IonIcon, IonItem, IonRow, IonText } from '@ionic/react';
import { ear, volumeHigh } from 'ionicons/icons';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/index';
import { useEffect, useState } from 'react';
import { words } from '../../api/handler';

const Category: React.FC = () => {
    const { category } = useParams<{ category: string; }>();
    const [ file, setFile ] = useState<MediaObject>()
    const [ wrds, setWords ] = useState<Array<any>>([])

    useEffect(() => {
        setWords(words)
    }, [words])

    const playAudio = (filePath: string) => {
        if(file) stopAudio();
        else {
            setFile(Media.create(filePath));
        }
    }

    const stopAudio = () => {
        if(file) file.stop();
    }

    const init = () => {

    }

    useEffect(() => {
        if(file) file.play();
    }, [file])

    useEffect(() => {
        init();
    }, [])

    return (
        <AppContainer category={category}>
            <IonGrid style={{ padding: 0, margin: '-1rem ' }}>
                {
                words.filter(word => word.category == category ).map((word, key) => (
                        <IonRow className='word-list' key={key}>
                            <IonCol size='6'>
                                <IonItem lines='none'>
                                    <IonText>
                                        { word.english_language }
                                    </IonText>
                                    <IonIcon slot='end' icon={volumeHigh} onClick={() => playAudio(word.englishAudioUrl)} />
                                </IonItem>
                            </IonCol>
                            <IonCol size='6'>
                                <IonItem lines='none'>
                                    <IonText>
                                        { word.dharug_language }
                                    </IonText>
                                    <IonButton fill='clear' slot='end' className='orange-btn'>
                                        <IonIcon icon={ear} />
                                    </IonButton>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    ))
                }
            </IonGrid>
        </AppContainer>

    );
};

export default Category;
