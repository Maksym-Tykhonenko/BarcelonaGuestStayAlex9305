import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import type {ImageSourcePropType} from 'react-native';

import {tabBarArt} from '../../data/assets';
import {useAdaptive} from '../../hooks/useAdaptive';
import type {GuestTab} from '../../navigation/types';
import {colors} from '../../constants/theme';

const TAB_ICONS: Record<GuestTab, ImageSourcePropType> = {
  PassTab: tabBarArt.home,
  DiningTab: tabBarArt.dining,
  EventsTab: tabBarArt.nearby,
  ServicesTab: tabBarArt.hotel,
  ClimateTab: tabBarArt.climate,
  AssistTab: tabBarArt.settings,
};

const TAB_ORDER: GuestTab[] = [
  'PassTab',
  'DiningTab',
  'EventsTab',
  'ServicesTab',
  'ClimateTab',
  'AssistTab',
];

type TabBarProps = {
  activeTab: GuestTab;
  onSelectTab: (tab: GuestTab) => void;
};

export function TabBar({activeTab, onSelectTab}: TabBarProps) {
  const adaptive = useAdaptive();

  return (
    <View
      style={[
        styles.TabBarFacetChassis,
        {
          paddingTop: adaptive.tabPaddingTop,
          paddingBottom: adaptive.tabPaddingBottom,
        },
      ]}>
      {TAB_ORDER.map(tabName => {
        const isFocused = tabName === activeTab;
        const iconSize = adaptive.tabIconSize;

        return (
          <Pressable
            key={tabName}
            onPress={() => onSelectTab(tabName)}
            style={({pressed}) => [
              styles.TabBarTab,
              pressed && styles.TabBarTabPressedDim,
            ]}>
            <Image
              source={TAB_ICONS[tabName]}
              style={[
                styles.TabBarIconSigil,
                {
                  width: iconSize,
                  height: iconSize,
                  tintColor: isFocused ? colors.red : colors.body,
                },
              ]}
              resizeMode="contain"
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  TabBarFacetChassis: {
    backgroundColor: '#23272D',
    borderTopColor: '#1d1d1d',
    borderTopWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  TabBarTab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 50,
    paddingVertical: 14,
    paddingTop: 2,
  },
  TabBarTabPressedDim: {
    opacity: 0.85,
  },
  TabBarIconSigil: {
    backgroundColor: 'transparent',
  },
});
