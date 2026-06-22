import React, {useState} from 'react';
import {
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import {ScrollScreenHeader} from '../components/nav/ScrollScreenHeader';
import {useApp} from '../context/AppContext';
import {settingsArt} from '../data/assets';
import {colors, fonts, layout} from '../constants/theme';

export function SettingsScreen() {
  const {clearReservation, doNotDisturb, savedReservation, setDoNotDisturb} =
    useApp();
  const [cancelVisibleModal, setCancelVisibleModal] = useState(false);

  const handleShare = async () => {
    Linking.openURL(
      'https://apps.apple.com/us/app/barcelona-guest-stay-casino/id6781605509',
    );
  };

  const closeCancelModal = () => setCancelVisibleModal(false);

  const handleConfirmCancel = () => {
    clearReservation();
    closeCancelModal();
  };

  return (
    <View style={styles.SettingsFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.SettingsScrollContent}
        showsVerticalScrollIndicator={false}>
        <ScrollScreenHeader title="Settings" variant="screen" />

        <View style={styles.SettingsCard}>
          <View style={styles.SettingsRow}>
            <Text style={styles.SettingsRowLabelFiligree}>Do Not Disturb</Text>
            <Switch
              value={doNotDisturb}
              onValueChange={setDoNotDisturb}
              trackColor={{false: colors.nearbyMuted, true: colors.red}}
              thumbColor={colors.cream}
              ios_backgroundColor={colors.nearbyMuted}
            />
          </View>

          <View style={styles.SettingsDivider} />

          <View style={styles.SettingsRow}>
            <Text style={styles.SettingsRowLabelFiligree}>Share App</Text>
            <Pressable
              onPress={handleShare}
              style={({pressed}) => [
                styles.SettingsActionButton,
                pressed && styles.SettingsPressedDim,
              ]}>
              <Text style={styles.SettingsActionButtonLabel}>Share</Text>
            </Pressable>
          </View>

          <View style={styles.SettingsDivider} />

          {savedReservation ? (
            <View style={styles.SettingsCancelRow}>
              <Pressable
                onPress={() => setCancelVisibleModal(true)}
                style={({pressed}) => [
                  styles.SettingsCancelButton,
                  pressed && styles.SettingsPressedDim,
                ]}>
                <Text style={styles.SettingsCancelLabelFiligree}>
                  Cancel Reservation
                </Text>
              </Pressable>
            </View>
          ) : null}
        </View>

        <Image
          source={settingsArt.gear}
          style={styles.SettingsGearArt}
          resizeMode="contain"
        />
      </ScrollView>

      <Modal
        visible={cancelVisibleModal}
        transparent
        animationType="slide"
        onRequestClose={closeCancelModal}>
        <View style={styles.SettingsModalBackdrop}>
          <Pressable
            style={styles.SettingsModalBackdropPress}
            onPress={closeCancelModal}
          />
          <View style={styles.SettingsModalSheet}>
            <Text style={styles.SettingsModalTitleFiligree}>
              Cancel Reservation
            </Text>
            <Text style={styles.SettingsModalMessageFiligree}>
              Are you sure you want to cancel? This action cannot be undone and
              cancellation fees may apply.
            </Text>
            <View style={styles.SettingsModalActions}>
              <Pressable
                onPress={closeCancelModal}
                style={({pressed}) => [
                  styles.SettingsModalSecondaryButton,
                  pressed && styles.SettingsPressedDim,
                ]}>
                <Text style={styles.SettingsModalSecondaryLabel}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleConfirmCancel}
                style={({pressed}) => [
                  styles.SettingsModalPrimaryButton,
                  pressed && styles.SettingsPressedDim,
                ]}>
                <Text style={styles.SettingsModalPrimaryLabel}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  SettingsFacetChassis: {
    backgroundColor: colors.nearbySurface,
    flex: 1,
  },
  SettingsScrollContent: {
    paddingBottom: 24,
    paddingHorizontal: layout.screenPadding,
  },
  SettingsCard: {
    backgroundColor: colors.nearbyCard,
    borderRadius: 14,
    marginTop: 20,
    overflow: 'hidden',
    paddingHorizontal: 16,
  },

  SettingsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 17,
    paddingTop: 16,
  },

  SettingsRowLabelFiligree: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
  },
  SettingsDivider: {
    backgroundColor: colors.nearbyMuted,
    height: 1,
  },
  SettingsActionButton: {
    backgroundColor: colors.nearbyMuted,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  SettingsActionButtonLabel: {
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19.5,
    textAlign: 'center',
  },
  SettingsCancelRow: {
    paddingBottom: 16,
    paddingTop: 16,
  },
  SettingsCancelButton: {
    alignItems: 'center',
    backgroundColor: colors.nearbyMuted,
    borderRadius: 10,
    justifyContent: 'center',
    minHeight: 45,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  SettingsCancelLabelFiligree: {
    color: '#ff4d4d',
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
  },
  SettingsGearArt: {
    alignSelf: 'center',
    height: 170,
    marginTop: 50,
    width: 160,
  },
  SettingsPressedDim: {
    opacity: 0.85,
  },
  SettingsModalBackdrop: {
    backgroundColor: colors.loaderOverlay,
    flex: 1,
    justifyContent: 'flex-end',
  },
  SettingsModalBackdropPress: {
    flex: 1,
  },
  SettingsModalSheet: {
    backgroundColor: colors.nearbyCard,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  SettingsModalTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  SettingsModalMessageFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
  },
  SettingsModalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  SettingsModalSecondaryButton: {
    alignItems: 'center',
    backgroundColor: colors.nearbyMuted,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingVertical: 12,
  },
  SettingsModalSecondaryLabel: {
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  SettingsModalPrimaryButton: {
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingVertical: 12,
  },
  SettingsModalPrimaryLabel: {
    color: colors.buttonText,
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
});
