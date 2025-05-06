import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonButtons, IonBackButton, useIonRouter } from '@ionic/react';
import '../styles/Weather.css';

const RouteWeather = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" color="light" onClick={() => router.push('/home', 'back')} />
          </IonButtons>
          <IonTitle>Route Weather</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="coming-soon-container">
          <h2>Route Weather Coming Soon!</h2>
          <p>We're working on bringing you weather forecasts for your entire route.</p>
          <p>Stay tuned for updates!</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RouteWeather;
