import { IonAvatar, IonContent, IonFab, IonFabButton, IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonThumbnail, useIonAlert } from '@ionic/react';
import './LugarScreen.css';
import { useReduxDispatch, useReduxSelector } from '../../redux/store';
import { setLugaresList, setLugarSelected, updateLugar } from '../../redux/reducers/lugares/lugares';
import { setAppHeaderTitle } from '../../redux/reducers/appHeaderReducer/appHeader';
import { add } from 'ionicons/icons';
import { Lugar } from '../../redux/reducers/lugares/lugares.interfaces';

const LugarScreen = () => {
  const { lugaresList } = useReduxSelector(state => state.lugares);
  const dispatch = useReduxDispatch();
  const [presentAlert] = useIonAlert();

  const renderItems = () => {
    const items: JSX.Element[] = [];

    lugaresList.forEach((lugar, index) => {
      items.push(
        <IonItemSliding>
          <IonItem button detail routerLink='/lugar'
            onClick={() => {
              dispatch(setLugarSelected(lugar));
              dispatch(setAppHeaderTitle(lugar.title));
            }}
          >
            <IonAvatar>
              <IonImg src={lugar.photo} />
            </IonAvatar>
            <IonLabel>{lugar.title}</IonLabel>
          </IonItem>
          <IonItemOptions side="end">
            <IonItemOption onClick={() => presentAlert({
              header: 'Editar Lugar',
              buttons: [
                {
                  text: 'Cancelar',
                },
                {
                  text: 'Actualizar',
                  handler: (value) => saveData(value, 'EDITAR', index),
                },
              ],
              inputs: [
                {
                  placeholder: 'título',
                  value: lugar.title,
                },
                {
                  placeholder: 'img url',
                  value: lugar.photo,
                },
              ]
            })}>Editar</IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      );
    });

    return items;
  };

  const saveData = (values: any[], action: 'CREAR' | 'EDITAR', index?: number) => {
    console.log(values);
    if (values[0] === '' || values[1] === '') {
      return ;
    }
    console.log(index);
    let newLista: Lugar[] = [];
    let lugar: Lugar = {} as Lugar;

    if (action === 'EDITAR') {
      console.log('update');
      lugar = {
        code: lugaresList[index as number].code,
        title: values[0],
        photo: values[1],
        description: lugaresList[index as number].description,
      };
      console.log(lugar);
      lugar.title = `${values[0]}`;
      lugar.photo = values[1];
      dispatch(updateLugar({ lugar, index: index as number }));
      return ;
    }

    if (action === 'CREAR') {
      console.log('crear');
      lugar =  {
        code: lugaresList.length + 1,
        title: values[0],
        photo: values[1],
      };
      newLista = [...lugaresList, lugar];
      dispatch(setLugaresList(newLista));
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} onClick={() => presentAlert({
              header: 'Nuevo Lugar',
              buttons: [
                {
                  text: 'Cancelar',
                },
                {
                  text: 'Guardar',
                  handler: (value) => saveData(value, 'CREAR'),
                },
              ],
              inputs: [
                {
                  placeholder: 'título',
                },
                {
                  placeholder: 'img url',
                },
              ]
            })} />
          </IonFabButton>
        </IonFab>
        <IonList>
          {renderItems()}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default LugarScreen;
