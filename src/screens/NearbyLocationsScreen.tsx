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
import {formatCoordinates, LOCATIONS, type Location} from '../data/locations';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout} from '../constants/theme';

function LocationCard({location}: {location: Location}) {
  const {openLocationDetail} = useAppNavigation();

  return (
    <View style={styles.NearbyLocationsCardFacetChassis}>
      <Image
        source={location.image}
        style={styles.NearbyLocationsCardImage}
        resizeMode="cover"
      />
      <View style={styles.NearbyLocationsCardBody}>
        <Text style={styles.NearbyLocationsCardTitleFiligree}>
          {location.name}
        </Text>
        <Text style={styles.NearbyLocationsCardCoordsFiligree}>
          {formatCoordinates(location.latitude, location.longitude)}
        </Text>
        <Text style={styles.NearbyLocationsCardTaglineFiligree}>
          {location.tagline}
        </Text>
      </View>
      <Pressable
        onPress={() => openLocationDetail(location.id)}
        style={({pressed}) => [
          styles.NearbyLocationsCardButtonPortico,
          pressed && styles.NearbyLocationsCardButtonPressedDim,
        ]}>
        <Text style={styles.NearbyLocationsCardButtonFiligree}>
          View Details
        </Text>
      </Pressable>
    </View>
  );
}

export function NearbyLocationsScreen() {
  return (
    <View style={styles.NearbyLocationsFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.NearbyLocationsListContent}
        showsVerticalScrollIndicator={false}>
        <ScrollScreenHeader title="Nearby Locations" variant="screen" />
        {LOCATIONS.map(location => (
          <LocationCard key={location.id} location={location} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  NearbyLocationsFacetChassis: {
    backgroundColor: colors.nearbySurface,
    flex: 1,
    paddingHorizontal: layout.screenPadding,
  },
  NearbyLocationsListContent: {
    gap: 12,
    paddingBottom: 24,
  },
  NearbyLocationsCardFacetChassis: {
    backgroundColor: colors.nearbyCard,
    borderRadius: 14,
    padding: 16,
  },

  NearbyLocationsCardImage: {
    backgroundColor: colors.nearbyMuted,
    borderRadius: 8,
    height: 100,
    overflow: 'hidden',
    width: '100%',
  },
  NearbyLocationsCardBody: {
    paddingTop: 12,
  },
  NearbyLocationsCardTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
  },

  NearbyLocationsCardCoordsFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 11,
    lineHeight: 16.5,
    marginTop: 2,
  },
  NearbyLocationsCardTaglineFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  NearbyLocationsCardButtonPortico: {
    alignItems: 'center',
    backgroundColor: colors.nearbyMuted,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 12,
    minHeight: 35,
    paddingVertical: 8,
  },

  NearbyLocationsCardButtonPressedDim: {
    opacity: 0.85,
  },
  NearbyLocationsCardButtonFiligree: {
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19.5,
  },
});
