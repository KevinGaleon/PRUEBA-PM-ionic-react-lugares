import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonFooter, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonText } from '@ionic/react';
import './CardLugar.css';
import { useReduxSelector, useReduxDispatch } from '../../redux/store';
import { useEffect, useState } from 'react';
import { setAppHeaderTitle } from '../../redux/reducers/appHeaderReducer/appHeader';
import { add } from 'ionicons/icons';
import { updateDescriptions } from '../../redux/reducers/lugares/lugares';

const CardLugar = () => {
  const { lugarSelected, lugaresList } = useReduxSelector(state => state.lugares);
  const dispatch = useReduxDispatch();
  const [description, setDescription] = useState('');

  useEffect(() => {
    localStorage.setItem('lugaresList', JSON.stringify(lugaresList));
  }, [dispatch, lugaresList]);

  useEffect(() => {
    return () => {
      dispatch(setAppHeaderTitle('Lugares'));
    }
  }, [dispatch]);

  const saveDescriptions = () => {
    const newDescriptions = [...lugarSelected.description ?? [], description];
    dispatch(updateDescriptions({ code: lugarSelected.code, descriptions: newDescriptions }));
    localStorage.setItem('lugaresList', JSON.stringify(lugaresList));
  };

  const addDescription = () => {
    saveDescriptions();
    setDescription('');
  };

  const renderDescription = (value: string) => {
    return (
      <div>
        <IonLabel>{value}</IonLabel>
      </div>
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>
              <IonImg src={lugarSelected.photo} />  
            </IonCardSubtitle>
            <IonCardTitle>{lugarSelected.title}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            {lugarSelected.description?.map(value => renderDescription(value))}  
          </IonCardContent>
          <IonItem className='inputDescription'>
            <IonInput value={description} placeholder="Ingrese un comentario" onIonChange={e => setDescription(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButtons slot='' >
            <IonFabButton size='small' onClick={addDescription}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonButtons>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CardLugar;
