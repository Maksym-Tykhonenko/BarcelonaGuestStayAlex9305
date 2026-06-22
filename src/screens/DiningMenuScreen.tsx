import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {DiningScrollHeader} from '../components/dining/DiningScrollHeader';
import {useApp} from '../context/AppContext';
import {formatMenuPrice, MENU_CATEGORIES, type MenuItem} from '../data/menu';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout} from '../constants/theme';

function MenuItemCard({item}: {item: MenuItem}) {
  const {addToCart} = useApp();

  return (
    <View style={styles.DiningMenuCardFacetChassis}>
      <Image
        source={item.image}
        style={styles.DiningMenuCardImage}
        resizeMode="cover"
      />
      <View style={styles.DiningMenuCardBody}>
        <View style={styles.DiningMenuCardTitleRow}>
          <Text style={styles.DiningMenuCardTitleFiligree}>{item.name}</Text>
          <Text style={styles.DiningMenuCardPriceFiligree}>
            {formatMenuPrice(item.price)}
          </Text>
        </View>
        <Text style={styles.DiningMenuCardDescriptionFiligree}>
          {item.description}
        </Text>
        <Pressable
          onPress={() => addToCart(item.id)}
          style={({pressed}) => [
            styles.DiningMenuCardButtonPortico,
            pressed && styles.DiningMenuCardButtonPressedDim,
          ]}>
          <Text style={styles.DiningMenuCardButtonFiligree}>Add To Cart</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function DiningMenuScreen() {
  const {openDiningScreen} = useAppNavigation();
  const {cartItemCount} = useApp();

  return (
    <View style={styles.DiningMenuFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.DiningMenuScrollContent}
        showsVerticalScrollIndicator={false}>
        <DiningScrollHeader
          title="Restaurant Menu"
          onCartPress={
            cartItemCount > 0
              ? () => openDiningScreen('OrderReview')
              : undefined
          }
        />

        {MENU_CATEGORIES.map(category => (
          <View key={category.id} style={styles.DiningMenuCategoryBlock}>
            <Text style={styles.DiningMenuCategoryTitleFiligree}>
              {category.title}
            </Text>
            {category.items.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  DiningMenuFacetChassis: {
    backgroundColor: colors.nearbySurface,
    flex: 1,
  },

  DiningMenuScrollContent: {
    paddingBottom: 24,
    paddingHorizontal: layout.screenPadding,
  },
  DiningMenuCategoryBlock: {
    gap: 12,
    marginBottom: 20,
  },

  DiningMenuCategoryTitleFiligree: {
    color: colors.red,
    fontFamily: fonts.sansMedium,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.8,
    lineHeight: 16.5,
    marginBottom: 4,
  },
  DiningMenuCardFacetChassis: {
    backgroundColor: colors.nearbyCard,
    borderRadius: 14,
    overflow: 'hidden',
  },
  DiningMenuCardImage: {
    backgroundColor: colors.nearbyMuted,
    height: 160,
    width: '100%',
  },

  DiningMenuCardBody: {
    padding: 16,
  },
  DiningMenuCardTitleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  DiningMenuCardTitleFiligree: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
  },
  DiningMenuCardPriceFiligree: {
    color: colors.red,
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
  },
  DiningMenuCardDescriptionFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },

  DiningMenuCardButtonPortico: {
    alignItems: 'center',
    backgroundColor: colors.nearbyMuted,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 12,
    minHeight: 35,
    paddingVertical: 8,
  },
  DiningMenuCardButtonPressedDim: {
    opacity: 0.85,
  },
  DiningMenuCardButtonFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19.5,
  },
});
