import React, {useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {ScrollScreenHeader} from '../components/nav/ScrollScreenHeader';
import {useApp} from '../context/AppContext';
import {getVenueById} from '../data/venues';

import {useAppNavigation} from '../navigation/NavigationContext';
import {generateReservationCode} from '../utils/generatePassCode';
import {colors, fonts, layout} from '../constants/theme';

type VenueDetailScreenProps = {
  venueId: string;
};

type BookingStep = 'none' | 'form' | 'confirmed';

const MIN_GUESTS = 1;
const MAX_GUESTS = 20;

export function VenueDetailScreen({venueId}: VenueDetailScreenProps) {
  const {goBack} = useAppNavigation();
  const {saveReservation} = useApp();
  const venue = getVenueById(venueId);

  const [bookingStep, setBookingStep] = useState<BookingStep>('none');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  if (!venue) {
    return (
      <View style={styles.VenueDetailFacetChassis}>
        <Text style={styles.VenueDetailMissingFiligree}>Venue not found</Text>
      </View>
    );
  }

  const canBook = date.trim().length > 0 && time.trim().length > 0;

  const closeBooking = () => {
    setBookingStep('none');
    setGuests(2);
    setDate('');
    setTime('');
  };

  const handleBook = () => {
    if (!canBook) {
      return;
    }

    saveReservation({
      code: generateReservationCode(),
      venueName: venue.name,
      date: date.trim(),
      time: time.trim(),
      guests,
    });
    setBookingStep('confirmed');
  };

  return (
    <View style={styles.VenueDetailFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.VenueDetailScrollContent}
        showsVerticalScrollIndicator={false}>
        <ScrollScreenHeader title={venue.name} onBack={goBack} />
        <Image
          source={venue.image}
          style={styles.VenueDetailHeroImage}
          resizeMode="cover"
        />
        <Text style={styles.VenueDetailTitleFiligree}>{venue.name}</Text>
        <Text style={styles.VenueDetailMetaFiligree}>{venue.hours}</Text>
        <Text style={styles.VenueDetailMetaFiligree}>{venue.phone}</Text>
        {venue.description.map((paragraph, index) => (
          <Text key={index} style={styles.VenueDetailBodyFiligree}>
            {paragraph}
          </Text>
        ))}
        <PrimaryButton
          label="Make a Reservation"
          onPress={() => setBookingStep('form')}
          fullWidth
          style={styles.VenueDetailReserveButton}
        />
      </ScrollView>

      <Modal
        visible={bookingStep !== 'none'}
        transparent
        animationType="slide"
        onRequestClose={closeBooking}>
        <View style={styles.VenueDetailModalBackdrop}>
          <Pressable
            style={styles.VenueDetailModalBackdropPress}
            onPress={closeBooking}
          />
          {bookingStep === 'form' ? (
            <View style={styles.VenueDetailBookingSheet}>
              <Text style={styles.VenueDetailSheetTitleFiligree}>
                Booking Details
              </Text>

              <Text style={styles.VenueDetailFieldLabelFiligree}>Guests</Text>
              <View style={styles.VenueDetailStepperRow}>
                <Pressable
                  onPress={() =>
                    setGuests(current => Math.max(MIN_GUESTS, current - 1))
                  }
                  style={({pressed}) => [
                    styles.VenueDetailStepperButton,
                    pressed && styles.VenueDetailStepperPressedDim,
                  ]}>
                  <Text style={styles.VenueDetailStepperSymbolFiligree}>−</Text>
                </Pressable>
                <Text style={styles.VenueDetailStepperValueFiligree}>
                  {guests}
                </Text>
                <Pressable
                  onPress={() =>
                    setGuests(current => Math.min(MAX_GUESTS, current + 1))
                  }
                  style={({pressed}) => [
                    styles.VenueDetailStepperButton,
                    pressed && styles.VenueDetailStepperPressedDim,
                  ]}>
                  <Text style={styles.VenueDetailStepperSymbolFiligree}>+</Text>
                </Pressable>
              </View>

              <Text style={styles.VenueDetailFieldLabelFiligree}>Date</Text>
              <TextInput
                value={date}
                onChangeText={setDate}
                placeholder="DD/MM/YYYY"
                placeholderTextColor={colors.body}
                style={styles.VenueDetailFieldInput}
              />

              <Text style={styles.VenueDetailFieldLabelFiligree}>Time</Text>
              <TextInput
                value={time}
                onChangeText={setTime}
                placeholder="HH:MM"
                placeholderTextColor={colors.body}
                style={styles.VenueDetailFieldInput}
              />

              <View style={styles.VenueDetailSheetActions}>
                <Pressable
                  onPress={closeBooking}
                  style={({pressed}) => [
                    styles.VenueDetailSheetSecondaryButton,
                    pressed && styles.VenueDetailStepperPressedDim,
                  ]}>
                  <Text style={styles.VenueDetailSheetSecondaryLabelFiligree}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleBook}
                  disabled={!canBook}
                  style={({pressed}) => [
                    styles.VenueDetailSheetPrimaryButton,
                    !canBook && styles.VenueDetailSheetPrimaryButtonDisabled,
                    pressed && canBook && styles.VenueDetailStepperPressedDim,
                  ]}>
                  <Text style={styles.VenueDetailSheetPrimaryLabelFiligree}>
                    Book
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.VenueDetailConfirmSheet}>
              <Text style={styles.VenueDetailSheetTitleFiligree}>
                Booking Confirmed
              </Text>
              <Text style={styles.VenueDetailConfirmMessageFiligree}>
                Your reservation has been placed. We look forward to your visit.
              </Text>
              <View style={styles.VenueDetailSheetActions}>
                <Pressable
                  onPress={closeBooking}
                  style={({pressed}) => [
                    styles.VenueDetailSheetSecondaryButton,
                    pressed && styles.VenueDetailStepperPressedDim,
                  ]}>
                  <Text style={styles.VenueDetailSheetSecondaryLabelFiligree}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={closeBooking}
                  style={({pressed}) => [
                    styles.VenueDetailSheetPrimaryButton,
                    pressed && styles.VenueDetailStepperPressedDim,
                  ]}>
                  <Text style={styles.VenueDetailSheetPrimaryLabelFiligree}>
                    Confirm
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  VenueDetailFacetChassis: {
    backgroundColor: colors.nearbySurface,
    flex: 1,
  },

  VenueDetailScrollContent: {
    paddingBottom: 24,
    paddingHorizontal: layout.screenPadding,
  },
  VenueDetailHeroImage: {
    backgroundColor: colors.nearbyMuted,
    borderRadius: 8,
    height: 200,
    overflow: 'hidden',
    width: '100%',
  },
  VenueDetailTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  VenueDetailMetaFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },

  VenueDetailBodyFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 22.1,
    marginTop: 16,
  },
  VenueDetailReserveButton: {
    marginTop: 24,
    minHeight: 48,
  },
  VenueDetailMissingFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    padding: layout.screenPadding,
  },
  VenueDetailModalBackdrop: {
    backgroundColor: colors.loaderOverlay,
    flex: 1,
    justifyContent: 'flex-end',
  },
  VenueDetailModalBackdropPress: {
    flex: 1,
  },

  VenueDetailBookingSheet: {
    backgroundColor: colors.nearbyCard,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  VenueDetailConfirmSheet: {
    backgroundColor: colors.nearbyCard,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  VenueDetailSheetTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  VenueDetailConfirmMessageFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
  },

  VenueDetailFieldLabelFiligree: {
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    marginTop: 24,
  },
  VenueDetailStepperRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  VenueDetailStepperButton: {
    alignItems: 'center',
    backgroundColor: colors.nearbyMuted,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  VenueDetailStepperPressedDim: {
    opacity: 0.85,
  },
  VenueDetailStepperSymbolFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  VenueDetailStepperValueFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    minWidth: 16,
    textAlign: 'center',
  },

  VenueDetailFieldInput: {
    backgroundColor: colors.nearbyMuted,
    borderRadius: 10,
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    fontWeight: '500',
    height: 48,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  VenueDetailSheetActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  VenueDetailSheetSecondaryButton: {
    alignItems: 'center',
    backgroundColor: colors.nearbyMuted,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingVertical: 12,
  },
  VenueDetailSheetSecondaryLabelFiligree: {
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  VenueDetailSheetPrimaryButton: {
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingVertical: 12,
  },
  VenueDetailSheetPrimaryButtonDisabled: {
    opacity: 0.5,
  },

  VenueDetailSheetPrimaryLabelFiligree: {
    color: colors.buttonText,
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
});
