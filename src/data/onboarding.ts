import type {ImageSourcePropType} from 'react-native';

import {onboardingArt} from './assets';

export type OnboardingStep = {
  image: ImageSourcePropType;
  title: string;
  description: string;
  buttonLabel: string;
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    image: onboardingArt.step1,
    title: 'Welcome',
    description: 'Access all hotel services from one convenient app.',
    buttonLabel: 'Continue',
  },
  {
    image: onboardingArt.step2,
    title: 'Restaurant Menu',
    description: 'Browse menus and place orders anytime.',
    buttonLabel: 'Continue',
  },
  {
    image: onboardingArt.step3,
    title: 'Explore Nearby',
    description: 'Discover attractions and recommended places nearby.',
    buttonLabel: 'Continue',
  },
  {
    image: onboardingArt.step4,
    title: 'Control Your Stay',
    description: 'Manage reservations and room settings easily.',
    buttonLabel: 'Get Started',
  },
];
