import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {icons} from '../data/assets';
import {colors, fonts, radius} from '../constants/theme';

const LOGO_SIZE = 270;

type LoaderScreenProps = {
  onComplete: () => void;
};

export function LoaderScreen({onComplete}: LoaderScreenProps) {
  const insets = useSafeAreaInsets();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    });

    animation.start(({finished}) => {
      if (finished) {
        onComplete();
      }
    });

    return () => {
      animation.stop();
    };
  }, [onComplete, progress]);

  const fillWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.LoaderScreenFacetChassis}>
      <ImageBackground
        source={icons.loaderBg}
        style={styles.LoaderScreenBackground}
        resizeMode="cover">
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.LoaderScreenContent}>
            <View style={styles.LoaderScreenLogoWrap}>
              <Image
                source={icons.loaderLogo}
                style={styles.LoaderScreenLogoSigil}
                resizeMode="cover"
              />
            </View>

            <View style={styles.LoaderScreenBrandingFiligree}>
              <Text style={styles.LoaderScreenTitleFiligree}>
                Barcelona Guest Stay Casino
              </Text>
              <Text style={styles.LoaderScreenSubtitleFiligree}>
                Hotel Companion App
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.LoaderScreenProgressWrap,
              {paddingBottom: insets.bottom + 32},
            ]}>
            <View style={styles.LoaderScreenProgressTrack}>
              <Animated.View
                style={[styles.LoaderScreenProgressFill, {width: fillWidth}]}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  LoaderScreenFacetChassis: {
    backgroundColor: colors.black,
    flex: 1,
  },
  LoaderScreenBackground: {
    flex: 1,
  },
  LoaderScreenOverlayVeil: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.loaderOverlay,
  },
  LoaderScreenContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 28,
    paddingBottom: 90,
  },
  LoaderScreenLogoWrap: {
    borderRadius: radius.loaderCard,
    elevation: 12,
    height: LOGO_SIZE,
    marginBottom: 20,
    shadowColor: colors.redGlow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 20,
    width: LOGO_SIZE,
  },
  LoaderScreenLogoSigil: {
    borderRadius: radius.loaderCard,
    height: LOGO_SIZE,
    width: LOGO_SIZE,
  },
  LoaderScreenBrandingFiligree: {
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  LoaderScreenTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    textAlign: 'center',
  },
  LoaderScreenSubtitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center',
  },
  LoaderScreenProgressWrap: {
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  LoaderScreenProgressTrack: {
    backgroundColor: colors.progressTrackLoader,
    borderRadius: 8,
    height: 3,
    overflow: 'hidden',
    width: 160,
  },
  LoaderScreenProgressFill: {
    backgroundColor: colors.red,
    borderRadius: 8,
    height: 3,
  },
});
