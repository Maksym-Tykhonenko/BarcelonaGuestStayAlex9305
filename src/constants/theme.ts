import {Platform} from 'react-native';

import {fonts} from './fonts';

export const DESIGN_WIDTH = 393;
export const DESIGN_HEIGHT = 852;

export const colors = {
  background: '#1A1D21',
  surface: '#23272D',
  surfaceDeep: '#1d0000',
  card: '#161616',
  red: '#d62828',
  redDark: '#6a0e07',
  redGlow: 'rgba(255, 97, 97, 0.6)',
  gold: '#d0a400',
  goldMuted: '#c9a430',
  goldBorder: 'rgba(201, 164, 48, 0.25)',
  goldDivider: 'rgba(201, 164, 48, 0.2)',
  cream: '#f2f2f2',
  body: '#a9b0b8',
  bodyMuted: '#a09474',
  label: '#524d49',
  border: '#272220',
  cardBorder: '#3d311d',
  black: '#000000',
  buttonText: '#f2f2f2',
  progressTrack: '#2d323a',
  progressTrackLoader: 'rgba(106, 14, 7, 0.5)',
  tabBar: '#23272D',
  nearbySurface: '#1A1D21',
  nearbyCard: '#23272d',
  nearbyMuted: '#2d323a',
  skip: 'rgba(237, 228, 200, 0.6)',
  loaderOverlay: 'rgba(0, 0, 0, 0.35)',
  dotInactive: '#2d323a',
};

export const spacing = {
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 28,
};

export const radius = {
  card: 22,
  button: 14,
  chip: 8,
  pill: 100,
  loaderCard: 26,
};

export const fontSize = {
  brand: 9,
  caption: 10,
  small: 11,
  body: 13,
  button: 15,
  title: 26,
  hero: 32,
  passCode: 46,
};

export const layout = {
  screenPadding: 20,
  tabHeight: 72,
};

export const topInset = (value: number) =>
  Platform.OS === 'android' ? Math.max(value, 30) : value;

export {fonts};
