import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/react';
import '../styles/Weather.css';

const RouteWeather = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
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
