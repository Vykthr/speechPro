import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonHeader, IonText, IonPage, IonRouterLink, IonToolbar } from '@ionic/react'
import { logInOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { loginUser } from '../../api/handler'
import './Login.css'

const Login : React.FC = () => {
    const history = useHistory()
    const [ loginForm, setLoginForm ] = useState<any>({
        email: '', password: ''
    })
    const [ errors, setErrors ] = useState<any>({})
    const [ processing, setProcessing ] = useState<boolean>(false)

    const login = async () => {
        setErrors({});
        if(!loginForm.email) return setErrors({ email: 'Email Address is required' })
        if(!loginForm.password) return setErrors({ password: 'Password is required' })

        try {
            setProcessing(true)
            const user = await loginUser(loginForm.email, loginForm.password)
            history.push('/categories');
        }
        catch (err: any) {
            setErrors({ message: err?.message || 'An error occurred' })
        }
        finally {
            setProcessing(false)
        }
    }

    return (
        <IonPage className='login'>
            <IonHeader>
                <IonToolbar style={{ marginTop: '1rem' }}>
                    <IonText className='header'>Speech Pro</IonText>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <h3>Login</h3>
                <p className='info'>Fill in your details to access application</p>

                <IonItem lines='none'>
                    <IonLabel position="floating">Email Address</IonLabel>
                    <IonInput 
                        name='email' type='email' 
                        placeholder='Enter email address'
                        onIonChange={(e) => setLoginForm({ ...loginForm, email: e.detail.value })}
                        value={loginForm.email} 
                    />
                </IonItem>
                { errors?.email && <small>{errors?.email || ''}</small>}

                <IonItem lines='none'>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput 
                        name='password' type='password' 
                        placeholder='Enter password'
                        onIonChange={(e) => setLoginForm({ ...loginForm, password: e.detail.value })}
                        value={loginForm.password} 
                    />
                </IonItem>
                { errors?.password && <small>{errors?.password || ''}</small>}

                <IonButton onClick={() => login()}>
                    {
                        processing ? 'Logging In...' : 
                        <>
                            Login
                            <IonIcon slot="start" icon={logInOutline} />
                        </>
                    }
                </IonButton>

                { errors?.message && <small style={{ textAlign: 'center', display: 'block' }}>{errors?.message || ''}</small>}

                <p>Don't have an account? <IonRouterLink routerLink={`/register`}>Create one</IonRouterLink></p>
            </IonContent>
        </IonPage>
    )
}

export default Login