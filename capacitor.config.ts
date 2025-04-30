import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.naveensyamala.weatherapp',
  appName: 'Weather App',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  ios: {
    scheme: 'App',
    backgroundColor: '#f7fafc',
    limitsNavigationsToAppBoundDomains: true,
    scrollEnabled: true,
    allowsLinkPreview: false,
    overrideUserAgent: 'Weather App iOS',
    appendUserAgent: 'Weather App'
  }
};

export default config;
