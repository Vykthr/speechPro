import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './App.css';
import Home from './pages/Home/Home';
import Category from './pages/Category/Category';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Play from './pages/Play/Play';
import Admin from './pages/Admin/Admin';
import Edit from './pages/Edit/Edit';

setupIonicReact();

const App: React.FC = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonSplitPane contentId="main">
                    <Menu />
                    <IonRouterOutlet id="main">
                        <Route path="/" exact={true}>
                            <Redirect to="login" />
                        </Route>
                        <Route path="/page/:name" exact={true}>
                            <Page />
                        </Route>
                        <Route path="/categories" exact={true} component={Home} />
                        <Route path="/admin" exact={true} component={Admin} />
                        <Route path="/login" exact={true} component={Login} />
                        <Route path="/register" exact={true} component={Register} />

                        <Route path="/categories/:category" exact={true}>
                            <Category />
                        </Route>
                        <Route path="/edit" exact={true} component={Edit} />
                        <Route path="/edit/:id" exact={true}>
                            <Edit />
                        </Route>

                        <Route path="/play/:id" exact={true}>
                            <Play />
                        </Route>
                    </IonRouterOutlet>
                </IonSplitPane>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
