import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { airplane, settings, trash } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { setAppHeaderTitle } from '../../redux/reducers/appHeaderReducer/appHeader';
import { setLugaresList } from '../../redux/reducers/lugares/lugares';
import { useReduxSelector, useReduxDispatch } from '../../redux/store';
import './AppHeader.css';

const AppHeader = () => {
  const { title } = useReduxSelector(state => state.appHeader);
  const { lugaresList, lugarSelected } = useReduxSelector(state => state.lugares);
  const dispatch = useReduxDispatch();

  const removeLugar = () => {
    const newList = lugaresList.filter(lugar => lugar.code !== lugarSelected.code);
    dispatch(setLugaresList(newList));
    dispatch(setAppHeaderTitle('Lugares'));
    localStorage.setItem('lugaresList', JSON.stringify(lugaresList));
  };

  if (title !== 'Lugares') {
    return (
      <IonHeader className='header'>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color='light' defaultHref='/home' />
          </IonButtons>
          <IonTitle class='ion-text-center title'>{title}</IonTitle>
          <IonButtons className='icon' slot="end">
            <Link to={'/home'}>
              <IonButton onClick={removeLugar}>
                <IonIcon color='light' icon={trash}/>
              </IonButton>
            </Link>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    );
  }

  return (
    <IonHeader className='header'>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton>
            <IonIcon color='light' icon={airplane}/>
          </IonButton>
        </IonButtons>
        <IonTitle class='ion-text-center title'>{title}</IonTitle>
        <IonButtons slot="end">
          <IonButton>
            <IonIcon color='light' icon={settings}/>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}

export default AppHeader;