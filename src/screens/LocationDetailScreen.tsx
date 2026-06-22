import React from 'react';
import {Image, ScrollView, Share, StyleSheet, Text, View} from 'react-native';

import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {ScrollScreenHeader} from '../components/nav/ScrollScreenHeader';
import {formatCoordinates, getLocationById} from '../data/locations';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout} from '../constants/theme';

type LocationDetailScreenProps = {
  locationId: string;
};

export function LocationDetailScreen({locationId}: LocationDetailScreenProps) {
  const {goBack} = useAppNavigation();
  const location = getLocationById(locationId);

  if (!location) {
    return (
      <View style={styles.LocationDetailFacetChassis}>
        <Text style={styles.LocationDetailMissingFiligree}>
          Location not found
        </Text>
      </View>
    );
  }

  const coordinates = formatCoordinates(location.latitude, location.longitude);

  const handleShare = async () => {
    const message = [
      location.name,
      `Coordinates: ${location.latitude}, ${location.longitude}`,
      location.tagline,
      '',
      ...location.description,
    ].join('\n');

    await Share.share({message, title: location.name});
  };

  return (
    <View style={styles.LocationDetailFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.LocationDetailScrollContent}
        showsVerticalScrollIndicator={false}>
        <ScrollScreenHeader title={location.name} onBack={goBack} />
        <Image
          source={location.image}
          style={styles.LocationDetailHeroImage}
          resizeMode="cover"
        />
        <Text style={styles.LocationDetailTitleFiligree}>{location.name}</Text>
        <Text style={styles.LocationDetailCoordsFiligree}>{coordinates}</Text>
        {location.description.map((paragraph, index) => (
          <Text key={index} style={styles.LocationDetailBodyFiligree}>
            {paragraph}
          </Text>
        ))}
        <PrimaryButton
          label="Share"
          onPress={handleShare}
          fullWidth
          style={styles.LocationDetailShareButton}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  LocationDetailFacetChassis: {
    backgroundColor: colors.nearbySurface,
    flex: 1,
  },
  LocationDetailScrollContent: {
    paddingBottom: 24,
    paddingHorizontal: layout.screenPadding,
  },
  LocationDetailHeroImage: {
    backgroundColor: colors.nearbyMuted,
    borderRadius: 8,
    height: 200,
    overflow: 'hidden',
    width: '100%',
  },

  LocationDetailTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  LocationDetailCoordsFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },

  LocationDetailBodyFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 22.1,
    marginTop: 16,
  },
  LocationDetailShareButton: {
    marginTop: 24,
    minHeight: 48,
  },
  LocationDetailMissingFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    padding: layout.screenPadding,
  },
});
