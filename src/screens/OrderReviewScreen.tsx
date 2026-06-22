import React, {useMemo} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {DiningScrollHeader} from '../components/dining/DiningScrollHeader';
import {useApp} from '../context/AppContext';
import {formatMenuPrice, getMenuItemById} from '../data/menu';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout} from '../constants/theme';

export function OrderReviewScreen() {
  const {cart, cartItemCount, cartTotal, updateCartQuantity, clearCart} =
    useApp();
  const {openDiningScreen, resetDiningToMenu} = useAppNavigation();

  const cartLines = useMemo(
    () =>
      Object.entries(cart)
        .map(([itemId, quantity]) => {
          const item = getMenuItemById(itemId);
          if (!item) {
            return null;
          }
          return {item, quantity};
        })
        .filter((line): line is NonNullable<typeof line> => line !== null),
    [cart],
  );

  const handleOrder = () => {
    openDiningScreen('OrderConfirmation');
    clearCart();
  };

  return (
    <View style={styles.OrderReviewFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.OrderReviewScrollContent}
        showsVerticalScrollIndicator={false}>
        <DiningScrollHeader title="Restaurant Cart" />

        <View style={styles.OrderReviewCard}>
          <Text style={styles.OrderReviewCartSigil}>🛒</Text>

          {cartLines.map(({item, quantity}) => (
            <View key={item.id} style={styles.OrderReviewLine}>
              <View style={styles.OrderReviewLineHeader}>
                <Text style={styles.OrderReviewLineTitleFiligree}>
                  {item.name}
                </Text>
                <Text style={styles.OrderReviewLinePriceFiligree}>
                  {formatMenuPrice(item.price)}
                </Text>
              </View>
              <Text style={styles.OrderReviewLineDescriptionFiligree}>
                {item.description}
              </Text>
              <View style={styles.OrderReviewStepperRow}>
                <Pressable
                  onPress={() => updateCartQuantity(item.id, quantity - 1)}
                  style={({pressed}) => [
                    styles.OrderReviewStepperButton,
                    pressed && styles.OrderReviewPressedDim,
                  ]}>
                  <Text style={styles.OrderReviewStepperSymbol}>−</Text>
                </Pressable>
                <Text style={styles.OrderReviewStepperValue}>{quantity}</Text>
                <Pressable
                  onPress={() => updateCartQuantity(item.id, quantity + 1)}
                  style={({pressed}) => [
                    styles.OrderReviewStepperButton,
                    pressed && styles.OrderReviewPressedDim,
                  ]}>
                  <Text style={styles.OrderReviewStepperSymbol}>+</Text>
                </Pressable>
              </View>
            </View>
          ))}

          <Text style={styles.OrderReviewTotalFiligree}>
            Total:{' '}
            <Text style={styles.OrderReviewTotalValueFiligree}>
              {formatMenuPrice(cartTotal)}
            </Text>
          </Text>

          <Pressable
            onPress={handleOrder}
            disabled={cartItemCount === 0}
            style={({pressed}) => [
              styles.OrderReviewOrderButton,
              cartItemCount === 0 && styles.OrderReviewOrderButtonDisabled,
              pressed && cartItemCount > 0 && styles.OrderReviewPressedDim,
            ]}>
            <Text style={styles.OrderReviewOrderLabel}>Order</Text>
            <View style={styles.OrderReviewOrderBadge}>
              <Text style={styles.OrderReviewOrderBadgeLabel}>
                {cartItemCount} items
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={resetDiningToMenu}
            style={({pressed}) => [
              styles.OrderReviewCancelButton,
              pressed && styles.OrderReviewPressedDim,
            ]}>
            <Text style={styles.OrderReviewCancelLabel}>Cancel</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  OrderReviewFacetChassis: {
    backgroundColor: colors.nearbySurface,
    flex: 1,
  },

  OrderReviewScrollContent: {
    paddingBottom: 24,
    paddingHorizontal: layout.screenPadding,
  },
  OrderReviewCard: {
    backgroundColor: colors.nearbyCard,
    borderRadius: 14,
    padding: 16,
  },
  OrderReviewCartSigil: {
    alignSelf: 'center',
    fontSize: 28,
    lineHeight: 32,
    marginBottom: 16,
    opacity: 0.35,
  },
  OrderReviewLine: {
    borderBottomColor: colors.nearbyMuted,
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingBottom: 16,
  },
  OrderReviewLineHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  OrderReviewLineTitleFiligree: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
  },

  OrderReviewLinePriceFiligree: {
    color: colors.gold,
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
  },
  OrderReviewLineDescriptionFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  OrderReviewStepperRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  OrderReviewStepperButton: {
    alignItems: 'center',
    backgroundColor: colors.nearbyMuted,
    borderRadius: 999,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  OrderReviewStepperSymbol: {
    color: colors.cream,
    fontFamily: fonts.sansMedium,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
  },

  OrderReviewStepperValue: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    minWidth: 16,
    textAlign: 'center',
  },
  OrderReviewTotalFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  OrderReviewTotalValueFiligree: {
    color: colors.gold,
    fontFamily: fonts.sansMedium,
    fontWeight: '500',
  },
  OrderReviewOrderButton: {
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  OrderReviewOrderButtonDisabled: {
    opacity: 0.5,
  },
  OrderReviewOrderLabel: {
    color: colors.buttonText,
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  OrderReviewOrderBadge: {
    backgroundColor: colors.redDark,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  OrderReviewOrderBadgeLabel: {
    color: colors.cream,
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  OrderReviewCancelButton: {
    alignItems: 'center',
    backgroundColor: colors.nearbyMuted,
    borderRadius: 14,
    justifyContent: 'center',
    minHeight: 48,
    paddingVertical: 12,
  },
  OrderReviewCancelLabel: {
    color: colors.cream,
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },

  OrderReviewPressedDim: {
    opacity: 0.85,
  },
});
