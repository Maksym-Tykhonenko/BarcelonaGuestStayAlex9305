import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {ScrollScreenHeader} from '../components/nav/ScrollScreenHeader';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout} from '../constants/theme';

export function OrderConfirmationScreen() {
  const {resetDiningToMenu} = useAppNavigation();

  return (
    <View style={styles.OrderConfirmationFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.OrderConfirmationScrollContent}
        showsVerticalScrollIndicator={false}>
        <ScrollScreenHeader title="Order Placed" variant="screen" />
        <Text style={styles.OrderConfirmationMessageFiligree}>
          Your order has been sent to the kitchen. We will deliver it to your
          room shortly.
        </Text>
        <Pressable
          onPress={resetDiningToMenu}
          style={({pressed}) => [
            styles.OrderConfirmationButton,
            pressed && styles.OrderConfirmationPressedDim,
          ]}>
          <Text style={styles.OrderConfirmationButtonLabel}>Back to Menu</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  OrderConfirmationFacetChassis: {
    backgroundColor: colors.nearbySurface,
    flex: 1,
  },
  OrderConfirmationScrollContent: {
    paddingBottom: 24,
    paddingHorizontal: layout.screenPadding,
  },

  OrderConfirmationMessageFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },

  OrderConfirmationButton: {
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 14,
    justifyContent: 'center',
    marginTop: 24,
    minHeight: 48,
    paddingVertical: 12,
  },
  OrderConfirmationButtonLabel: {
    color: colors.buttonText,
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  OrderConfirmationPressedDim: {
    opacity: 0.85,
  },
});
