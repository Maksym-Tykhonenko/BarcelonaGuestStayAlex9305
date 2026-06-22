import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

jest.mock('react-native-safe-area-context', () => {
  const ReactNative = require('react');
  return {
    SafeAreaProvider: ({children}: {children: React.ReactNode}) => children,
    useSafeAreaInsets: () => ({top: 0, bottom: 0, left: 0, right: 0}),
  };
});

jest.mock('../src/navigation/AppNavigator', () => ({
  AppNavigator: () => null,
}));

import App from '../App';

test('renders correctly', () => {
  ReactTestRenderer.create(<App />);
});
