import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {ScrollScreenHeader} from '../components/nav/ScrollScreenHeader';
import {VENUES, type Venue} from '../data/venues';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout} from '../constants/theme';

function VenueCard({venue}: {venue: Venue}) {
  const {openVenueDetail} = useAppNavigation();

  return (
    <View style={styles.HotelVenuesCardFacetChassis}>
      <Image
        source={venue.image}
        style={styles.HotelVenuesCardImage}
        resizeMode="cover"
      />
      <Text style={styles.HotelVenuesCardTitleFiligree}>{venue.name}</Text>
      <Text style={styles.HotelVenuesCardMetaFiligree}>{venue.hours}</Text>
      <Text style={styles.HotelVenuesCardMetaFiligree}>{venue.phone}</Text>
      <Pressable
        onPress={() => openVenueDetail(venue.id)}
        style={({pressed}) => [
          styles.HotelVenuesCardButtonPortico,
          pressed && styles.HotelVenuesCardButtonPressedDim,
        ]}>
        <Text style={styles.HotelVenuesCardButtonFiligree}>View Details</Text>
      </Pressable>
    </View>
  );
}

export function HotelVenuesScreen() {
  return (
    <View style={styles.HotelVenuesFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.HotelVenuesListContent}
        showsVerticalScrollIndicator={false}>
        <ScrollScreenHeader title="Hotel Venues" variant="screen" />
        {VENUES.map(venue => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  HotelVenuesFacetChassis: {
    backgroundColor: colors.nearbySurface,
    flex: 1,
    paddingHorizontal: layout.screenPadding,
  },

  HotelVenuesListContent: {
    gap: 12,
    paddingBottom: 24,
  },
  HotelVenuesCardFacetChassis: {
    backgroundColor: colors.nearbyCard,
    borderRadius: 14,
    padding: 16,
  },
  HotelVenuesCardImage: {
    backgroundColor: colors.nearbyMuted,
    borderRadius: 8,
    height: 100,
    overflow: 'hidden',
    width: '100%',
  },
  HotelVenuesCardTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },
  HotelVenuesCardMetaFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 1,
  },

  HotelVenuesCardButtonPortico: {
    alignItems: 'center',
    backgroundColor: colors.nearbyMuted,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 12,
    minHeight: 35,
    paddingVertical: 8,
  },
  HotelVenuesCardButtonPressedDim: {
    opacity: 0.85,
  },
  HotelVenuesCardButtonFiligree: {
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19.5,
  },
});
