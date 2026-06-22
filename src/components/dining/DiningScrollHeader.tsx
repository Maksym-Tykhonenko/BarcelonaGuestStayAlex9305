import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useApp} from '../../context/AppContext';
import {colors, fonts, layout, topInset} from '../../constants/theme';

type DiningScrollHeaderProps = {
  title: string;
  onCartPress?: () => void;
};

export function DiningScrollHeader({title, onCartPress}: DiningScrollHeaderProps) {
  const insets = useSafeAreaInsets();
  const {cartItemCount} = useApp();

  return (
    <View
      style={[
        styles.DiningScrollHeaderFacetChassis,
        {paddingTop: topInset(insets.top + 24)},
      ]}>
      <Text style={styles.DiningScrollHeaderTitleFiligree}>{title}</Text>
      <Pressable
        onPress={onCartPress}
        disabled={!onCartPress}
        hitSlop={8}
        style={({pressed}) => [
          styles.DiningScrollHeaderCartPortico,
          pressed && onCartPress && styles.DiningScrollHeaderPressedDim,
        ]}>
        <Text style={styles.DiningScrollHeaderCartSigil}>🛒</Text>
        {cartItemCount > 0 ? (
          <View style={styles.DiningScrollHeaderBadge}>
            <Text style={styles.DiningScrollHeaderBadgeFiligree}>
              {cartItemCount}
            </Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  DiningScrollHeaderFacetChassis: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: -layout.screenPadding,
    paddingHorizontal: layout.screenPadding,
  },
  DiningScrollHeaderTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 18,
    lineHeight: 27,
  },
  DiningScrollHeaderCartPortico: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32,
    minWidth: 32,
  },
  DiningScrollHeaderCartSigil: {
    fontSize: 22,
    lineHeight: 26,
  },
  DiningScrollHeaderBadge: {
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 999,
    height: 18,
    justifyContent: 'center',
    minWidth: 18,
    paddingHorizontal: 4,
    position: 'absolute',
    right: -4,
    top: -2,
  },
  DiningScrollHeaderBadgeFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansMedium,
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 12,
  },
  DiningScrollHeaderPressedDim: {
    opacity: 0.85,
  },
});
