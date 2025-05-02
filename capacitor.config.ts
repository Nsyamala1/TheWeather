import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.naveensyamala.weatherapp',
  appName: 'Weather App',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  plugins: {
    Geolocation: {
      ios: {
        requestAlwaysAuthorization: true
      }
    }
  },
  ios: {
    contentInset: 'always',
    scheme: 'ai-weather',
    backgroundColor: '#87CEEB',
    limitsNavigationsToAppBoundDomains: true,
    scrollEnabled: true,
    allowsLinkPreview: false,
    overrideUserAgent: 'Weather App iOS',
    appendUserAgent: 'Weather App'
  }
};

export default config;
