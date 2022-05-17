import { IonButton, IonContent, IonHeader, IonIcon, IonButtons, IonBackButton, IonToolbar, IonInput, IonItem, IonLabel, IonNavLink, IonPage, IonRouterLink } from '@ionic/react'
import { checkmarkCircle, logIn, logInOutline, personAddOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import { registerUser } from '../../api/handler'
import './Register.css'

const Register : React.FC = () => {
    const [ regForm, setRegForm ] = useState<any>({
        email: '', password: '', username: '', conPassword: ''
    })
    const [ errors, setErrors ] = useState<any>({})
    const [ processing, setProcessing ] = useState<boolean>(false)
    const [ success, setSuccess ] = useState<boolean>(false)

    const register = async () => {
        setErrors({});
        if(!regForm.username) return setErrors({ username: 'Username is required' })
        if(!regForm.email) return setErrors({ email: 'Email Address is required' })
        if(!regForm.password) return setErrors({ password: 'Password is required' })
        if(regForm.password !== regForm.conPassword) return setErrors({ conPassword: 'Password does not match' })

        try {
            setProcessing(true)
            const user = await registerUser(regForm.email, regForm.password, regForm.username)
            setSuccess(true)
        }
        catch (err: any) {
            setErrors({ message: err?.message || 'An error occurred' })
        }
        finally {
            setProcessing(false)
        }
    }

    return (
        <IonPage className='register'>
            <IonHeader>
                <IonToolbar style={{ marginTop: '1rem' }}>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                {
                    success ?
                    <>
                        <IonIcon icon={checkmarkCircle} className='success-icon' />
                        <h3 style={{ color: '#2dd36f', textAlign: 'center' }}>Registration Successful</h3>
                        <p className='info' style={{ textAlign: 'center' }}>Login with your detail to use application</p>
                        <IonButton routerLink='/login'>
                            Login
                        </IonButton>
                    </>
                    :
                    <>
                        <h3>Register</h3>
                        <p className='info'>Create an account to access application</p>

                        <IonItem lines='none'>
                            <IonLabel position="floating">Username</IonLabel>
                            <IonInput 
                                name='username' 
                                placeholder='Enter username'
                                onIonChange={(e) => setRegForm({ ...regForm, username: e.detail.value })}
                                value={regForm.username} 
                            />
                        </IonItem>
                        { errors?.username && <small>{errors?.username || ''}</small>}

                        <IonItem lines='none'>
                            <IonLabel position="floating">Email Address</IonLabel>
                            <IonInput 
                                name='email' type='email' 
                                placeholder='Enter email address'
                                onIonChange={(e) => setRegForm({ ...regForm, email: e.detail.value })}
                                value={regForm.email} 
                            />
                        </IonItem>
                        { errors?.email && <small>{errors?.email || ''}</small>}

                        <IonItem lines='none'>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput 
                                name='password' type='password' 
                                placeholder='Enter password'
                                onIonChange={(e) => setRegForm({ ...regForm, password: e.detail.value })}
                                value={regForm.password} 
                            />
                        </IonItem>
                        { errors?.password && <small>{errors?.password || ''}</small>}

                        <IonItem lines='none'>
                            <IonLabel position="floating">Confirm Password</IonLabel>
                            <IonInput 
                                name='conPassword' type='password' 
                                placeholder='Enter password confirmation'
                                onIonChange={(e) => setRegForm({ ...regForm, conPassword: e.detail.value })}
                                value={regForm.conPassword} 
                            />
                        </IonItem>
                        { errors?.conPassword && <small>{errors?.conPassword || ''}</small>}

                        <IonButton onClick={() => register()}>
                            {
                                processing ? 'Registering...' : 
                                <>
                                    Register
                                    <IonIcon slot="start" icon={personAddOutline} />
                                </>
                            }
                        </IonButton>

                        { errors?.message && <small style={{ textAlign: 'center', display: 'block' }}>{errors?.message || ''}</small>}

                        <p>Have an account? <IonRouterLink routerLink={`/login`}>Login here</IonRouterLink></p>
                    </>
                }
            </IonContent>
        </IonPage>
    )
}

export default Register