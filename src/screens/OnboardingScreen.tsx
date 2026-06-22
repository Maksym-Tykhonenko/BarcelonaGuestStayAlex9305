import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {PaginationDots} from '../components/nav/PaginationDots';
import {ONBOARDING_STEPS} from '../data/onboarding';
import {colors, fonts, layout} from '../constants/theme';

type OnboardingScreenProps = {
  onComplete: () => void;
};

export function OnboardingScreen({onComplete}: OnboardingScreenProps) {
  const insets = useSafeAreaInsets();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = ONBOARDING_STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === ONBOARDING_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
      return;
    }
    setCurrentStepIndex(prev => prev + 1);
  };

  return (
    <ImageBackground
      source={step.image}
      style={styles.OnboardingScreenFacetChassis}
      resizeMode="cover">
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.OnboardingScreenFooter,
            {paddingBottom: insets.bottom + 24},
          ]}>
          <Text style={styles.OnboardingScreenTitleFiligree}>{step.title}</Text>
          <Text style={styles.OnboardingScreenDescription}>
            {step.description}
          </Text>

          <PaginationDots
            total={ONBOARDING_STEPS.length}
            activeIndex={currentStepIndex}
          />

          <Text style={styles.OnboardingScreenStepCounter}>
            {currentStepIndex + 1} / {ONBOARDING_STEPS.length}
          </Text>

          <PrimaryButton
            label={step.buttonLabel}
            onPress={handleNext}
            fullWidth
            style={styles.OnboardingScreenPrimaryAction}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  OnboardingScreenFacetChassis: {
    flex: 1,
    width: '101%',
  },
  OnboardingScreenGradientVeil: {
    ...StyleSheet.absoluteFillObject,
  },

  OnboardingScreenFooter: {
    flex: 1,
    gap: 12,
    justifyContent: 'flex-end',
    paddingHorizontal: layout.screenPadding + 4,
  },
  OnboardingScreenTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 33,
    textAlign: 'center',
  },

  OnboardingScreenDescription: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 22.4,
    marginBottom: 12,
    textAlign: 'center',
  },
  OnboardingScreenStepCounter: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 4,
    textAlign: 'center',
  },
  OnboardingScreenPrimaryAction: {
    marginTop: 4,
  },
});
