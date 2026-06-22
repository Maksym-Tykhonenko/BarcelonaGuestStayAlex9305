import React, {useEffect, useState}  from 'react';
import {LoaderScreen} from '../screens/LoaderScreen';
import {AppProvider} from '../context/AppContext';
import {AppShell} from './AppShell';
import { NavigationProvider } from './NavigationContext';
import {
  getRemoteConfig,
  setDefaults,
  setConfigSettings,
  fetchAndActivate,
  getValue,
} from '@react-native-firebase/remote-config';
import { getApp } from '@react-native-firebase/app';
import {LogLevel, OneSignal} from 'react-native-onesignal';

const FALLBACK_URL = 'https://rapid-net-dev.top/';

export function AppNavigator() {
  const [initialUrl, setInitialUrl] = useState(null);
  const [initialId, setInitialId] = useState('eQh4zqP3');
  const [initialUrlToOurBack, setInitialUrlToOurBack] = useState('https://fresh-proxy-hq.top/');
  const [oneSignKkkk, setOneSignKkkk] = useState('5844e14e-4e98-450a-ae95-5e93af72385b')

  useEffect(() => {

    const loadRemoteConfig = async () => {
      try {
        const app = getApp();
        const rc = getRemoteConfig(app);

        await setDefaults(rc, {
          DefLin: FALLBACK_URL,
        });

        await setConfigSettings(rc, {
          minimumFetchIntervalMillis: __DEV__ ? 0 : 300000,
        });

        await fetchAndActivate(rc);

        const remoteUrl = getValue(rc, 'DefLin').asString();

        if (remoteUrl && remoteUrl.startsWith('http')) {
          setInitialUrl(remoteUrl);
        } else {
          setInitialUrl(FALLBACK_URL);
        }
      } catch (error) {
        console.log('Remote Config error:', error);
        setInitialUrl(FALLBACK_URL);
      }
    };
{/** */}
    const initOnsignall = async () => {
    // Remove this method to stop OneSignal Debugging
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal ініціалізація
    OneSignal.initialize(oneSignKkkk);
    //OneSignal.Debug.setLogLevel(OneSignal.LogLevel.Verbose);
  };

    loadRemoteConfig();
    initOnsignall();
  }, []);

  if (!initialUrl) {
    return (
      <>
        <LoaderScreen />
      </>
    );
  }

  return (
    <AppProvider>
      <NavigationProvider>
        <AppShell
          initialUrl={initialUrl}
          initialId={initialId}
          initialUrlToOurBack={initialUrlToOurBack}
          oneSignKkkk={oneSignKkkk}
        />
      </NavigationProvider>
    </AppProvider>
  );
}
