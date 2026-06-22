import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {colors, fonts, layout, topInset} from '../../constants/theme';

type ScrollScreenHeaderProps = {
  title: string;
  onBack?: () => void;
  variant?: 'detail' | 'screen' | 'hero';
};

export function ScrollScreenHeader({
  title,
  onBack,
  variant = 'detail',
}: ScrollScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.ScrollScreenHeaderFacetChassis,
        {paddingTop: topInset(insets.top + 24)},
      ]}>
      {onBack ? (
        <Pressable
          onPress={onBack}
          hitSlop={8}
          style={({pressed}) =>
            pressed && styles.ScrollScreenHeaderBackPressedDim
          }>
          <Text style={styles.ScrollScreenHeaderBackFiligree}>←</Text>
        </Pressable>
      ) : null}
      <Text
        style={[
          variant === 'hero'
            ? styles.ScrollScreenHeaderHeroTitleFiligree
            : variant === 'screen'
              ? styles.ScrollScreenHeaderScreenTitleFiligree
              : styles.ScrollScreenHeaderTitleFiligree,
          !onBack && styles.ScrollScreenHeaderTitleNoBack,
        ]}
        numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ScrollScreenHeaderFacetChassis: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    marginHorizontal: -layout.screenPadding,
    paddingHorizontal: layout.screenPadding,
  },
  ScrollScreenHeaderBackFiligree: {
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
  },
  ScrollScreenHeaderBackPressedDim: {
    opacity: 0.7,
  },
  ScrollScreenHeaderTitleFiligree: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  ScrollScreenHeaderScreenTitleFiligree: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 18,
    lineHeight: 27,
  },
  ScrollScreenHeaderHeroTitleFiligree: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.serifBold,
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 32,
  },
  ScrollScreenHeaderTitleNoBack: {
    flex: 0,
  },
});
