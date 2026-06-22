import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors} from '../../constants/theme';

type PaginationDotsProps = {
  total: number;
  activeIndex: number;
};

export function PaginationDots({total, activeIndex}: PaginationDotsProps) {
  return (
    <View style={styles.PaginationDotsFacetChassis}>
      {Array.from({length: total}, (_, index) => {
        const isActive = index === activeIndex;
        return (
          <View
            key={index}
            style={[
              styles.PaginationDotsDot,
              isActive && styles.PaginationDotsDotActive,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  PaginationDotsFacetChassis: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    width: '100%',
  },
  PaginationDotsDot: {
    backgroundColor: colors.dotInactive,
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  PaginationDotsDotActive: {
    backgroundColor: colors.red,
    width: 24,
  },
});
