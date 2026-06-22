import React, {useMemo} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {homeArt} from '../data/assets';

import {useApp} from '../context/AppContext';
import {
  getDemoReservationRows,
  getGreeting,
  getVenueReservationRows,
  HOTEL,
  RECOMMENDED_NEARBY,
} from '../data/hotel';
import {formatCoordinates, getLocationById} from '../data/locations';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, topInset} from '../constants/theme';

export function PassScreen() {
  const insets = useSafeAreaInsets();
  const {savedReservation} = useApp();
  const {openLocationDetail, selectTab} = useAppNavigation();

  const greeting = useMemo(() => getGreeting(), []);
  const reservationRows = useMemo(
    () =>
      savedReservation
        ? getVenueReservationRows(savedReservation)
        : getDemoReservationRows(),
    [savedReservation],
  );
  const recommendedLocation = getLocationById(RECOMMENDED_NEARBY.locationId);

  const openRecommendedLocation = () => {
    if (!recommendedLocation) {
      return;
    }

    selectTab('EventsTab');
    openLocationDetail(recommendedLocation.id);
  };

  return (
    <View style={styles.PassScreenFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.PassScreenScrollContent}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.PassScreenHeader,
            {paddingTop: topInset(insets.top + 24)},
          ]}>
          <Text style={styles.PassScreenGreetingFiligree}>{greeting}</Text>
          <Text style={styles.PassScreenHotelTitleFiligree}>{HOTEL.name}</Text>
        </View>

        <Image
          source={homeArt.hero}
          style={styles.PassScreenHeroImage}
          resizeMode="cover"
        />

        <Text style={styles.PassScreenDescriptionFiligree}>
          {HOTEL.description}
        </Text>

        <View style={styles.PassScreenReservationCard}>
          <Text style={styles.PassScreenReservationTitleFiligree}>
            YOUR RESERVATION
          </Text>
          {reservationRows.map((row, index) => (
            <View
              key={row.label}
              style={[
                styles.PassScreenReservationRow,
                index < reservationRows.length - 1 &&
                  styles.PassScreenReservationRowBorder,
              ]}>
              <Text style={styles.PassScreenReservationLabelFiligree}>
                {row.label}
              </Text>
              <Text style={styles.PassScreenReservationValueFiligree}>
                {row.value}
              </Text>
            </View>
          ))}
        </View>

        {recommendedLocation ? (
          <>
            <Text style={styles.PassScreenSectionTitleFiligree}>
              RECOMMENDED NEARBY
            </Text>
            <Pressable
              onPress={openRecommendedLocation}
              style={({pressed}) => [
                styles.PassScreenLocationCard,
                pressed && styles.PassScreenPressedDim,
              ]}>
              <Image
                source={recommendedLocation.image}
                style={styles.PassScreenLocationImage}
                resizeMode="cover"
              />
              <View style={styles.PassScreenLocationBody}>
                <Text style={styles.PassScreenLocationTitleFiligree}>
                  {RECOMMENDED_NEARBY.name}
                </Text>
                <Text style={styles.PassScreenLocationCoordsFiligree}>
                  {formatCoordinates(
                    recommendedLocation.latitude,
                    recommendedLocation.longitude,
                  )}
                </Text>
                <Text style={styles.PassScreenLocationTaglineFiligree}>
                  {RECOMMENDED_NEARBY.tagline}
                </Text>
              </View>
            </Pressable>
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  PassScreenFacetChassis: {
    backgroundColor: colors.nearbySurface,
    flex: 1,
  },
  PassScreenScrollContent: {
    paddingBottom: 24,
    paddingHorizontal: layout.screenPadding,
  },
  PassScreenHeader: {
    marginBottom: 20,
  },

  PassScreenGreetingFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 19.5,
  },
  PassScreenHotelTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 20,
    lineHeight: 30,
    marginTop: 4,
  },

  PassScreenHeroImage: {
    backgroundColor: colors.nearbyMuted,
    borderRadius: 8,
    height: 180,
    overflow: 'hidden',
    width: '100%',
  },
  PassScreenDescriptionFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 20.8,
    marginTop: 20,
  },
  PassScreenReservationCard: {
    backgroundColor: colors.nearbyCard,
    borderRadius: 14,
    marginTop: 24,
    padding: 16,
  },

  PassScreenReservationTitleFiligree: {
    color: colors.red,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    letterSpacing: 1,
    lineHeight: 18,
  },
  PassScreenReservationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  PassScreenReservationRowBorder: {
    borderBottomColor: colors.nearbyMuted,
    borderBottomWidth: 1,
  },
  PassScreenReservationLabelFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 19.5,
  },
  PassScreenReservationValueFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 19.5,
  },
  PassScreenSectionTitleFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    letterSpacing: 1,
    lineHeight: 18,
    marginBottom: 10,
    marginTop: 19,
  },
  PassScreenLocationCard: {
    backgroundColor: colors.nearbyCard,
    borderRadius: 14,
    marginBottom: 12,
    padding: 16,
  },
  PassScreenLocationImage: {
    backgroundColor: colors.nearbyMuted,
    borderRadius: 8,
    height: 100,
    width: '100%',
  },
  PassScreenLocationBody: {
    marginTop: 12,
  },
  PassScreenLocationTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
  },
  PassScreenLocationCoordsFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 11,
    lineHeight: 16.5,
    marginTop: 2,
  },
  PassScreenLocationTaglineFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  PassScreenPressedDim: {
    opacity: 0.85,
  },
});
