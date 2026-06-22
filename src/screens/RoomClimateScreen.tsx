import React, {useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {ScrollScreenHeader} from '../components/nav/ScrollScreenHeader';
import {type AirMode, type FanSpeed, useApp} from '../context/AppContext';
import {climateArt} from '../data/assets';

import {colors, fonts, layout} from '../constants/theme';

const FAN_SPEEDS: FanSpeed[] = ['Low', 'Medium', 'High', 'Auto'];
const AIR_MODES: AirMode[] = ['Cool', 'Heat', 'Fan', 'Dry'];

const MIN_TEMP = 16;
const MAX_TEMP = 28;

export function RoomClimateScreen() {
  const {roomClimate, applyRoomClimateSettings} = useApp();
  const [temperature, setTemperature] = useState(roomClimate.temperature);
  const [fanSpeed, setFanSpeed] = useState<FanSpeed>(roomClimate.fanSpeed);
  const [airMode, setAirMode] = useState<AirMode>(roomClimate.airMode);
  const [applied, setApplied] = useState(false);

  const temperatureText = useMemo(() => `${temperature}°`, [temperature]);

  const applySettings = () => {
    applyRoomClimateSettings({temperature, fanSpeed, airMode});
    setApplied(true);
    setTimeout(() => setApplied(false), 2200);
  };

  return (
    <View style={styles.RoomClimateFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.RoomClimateScrollContent}
        showsVerticalScrollIndicator={false}>
        <ScrollScreenHeader title="Room Climate" variant="screen" />

        <View style={styles.RoomClimateTempCard}>
          <Text style={styles.RoomClimateCardLabelFiligree}>
            CURRENT TEMPERATURE
          </Text>
          <View style={styles.RoomClimateTempRow}>
            <Pressable
              onPress={() =>
                setTemperature(current => Math.max(MIN_TEMP, current - 1))
              }
              style={({pressed}) => [
                styles.RoomClimateTempPillButton,
                pressed && styles.RoomClimatePressedDim,
              ]}>
              <Text style={styles.RoomClimateTempPillSymbol}>−</Text>
            </Pressable>
            <Text style={styles.RoomClimateTempValueFiligree}>
              {temperatureText}
            </Text>
            <Pressable
              onPress={() =>
                setTemperature(current => Math.min(MAX_TEMP, current + 1))
              }
              style={({pressed}) => [
                styles.RoomClimateTempPillButton,
                pressed && styles.RoomClimatePressedDim,
              ]}>
              <Text style={styles.RoomClimateTempPillSymbol}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.RoomClimateOptionCard}>
          <Text style={styles.RoomClimateOptionTitleFiligree}>FAN SPEED</Text>
          <View style={styles.RoomClimateChipsRow}>
            {FAN_SPEEDS.map(option => {
              const selected = option === fanSpeed;
              return (
                <Pressable
                  key={option}
                  onPress={() => setFanSpeed(option)}
                  style={({pressed}) => [
                    styles.RoomClimateChip,
                    selected && styles.RoomClimateChipActive,
                    pressed && styles.RoomClimatePressedDim,
                  ]}>
                  <Text
                    style={[
                      styles.RoomClimateChipLabel,
                      selected && styles.RoomClimateChipLabelActive,
                    ]}>
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.RoomClimateOptionCard}>
          <Text style={styles.RoomClimateOptionTitleFiligree}>AIR MODE</Text>
          <View style={styles.RoomClimateChipsRow}>
            {AIR_MODES.map(option => {
              const selected = option === airMode;
              return (
                <Pressable
                  key={option}
                  onPress={() => setAirMode(option)}
                  style={({pressed}) => [
                    styles.RoomClimateChip,
                    selected && styles.RoomClimateChipActive,
                    pressed && styles.RoomClimatePressedDim,
                  ]}>
                  <Text
                    style={[
                      styles.RoomClimateChipLabel,
                      selected && styles.RoomClimateChipLabelActive,
                    ]}>
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          onPress={applySettings}
          style={({pressed}) => [
            styles.RoomClimateApplyButton,
            pressed && styles.RoomClimatePressedDim,
          ]}>
          <Text style={styles.RoomClimateApplyButtonLabel}>Apply Settings</Text>
        </Pressable>

        {applied ? (
          <Text style={styles.RoomClimateAppliedFiligree}>
            Settings applied successfully.
          </Text>
        ) : null}

        <Image
          source={climateArt.roomUnit}
          style={styles.RoomClimateUnitArt}
          resizeMode="contain"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  RoomClimateFacetChassis: {
    backgroundColor: colors.nearbySurface,
    flex: 1,
  },
  RoomClimateScrollContent: {
    paddingBottom: 24,
    paddingHorizontal: layout.screenPadding,
  },
  RoomClimateTempCard: {
    backgroundColor: colors.nearbyCard,
    borderRadius: 14,
    padding: 24,
  },
  RoomClimateCardLabelFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },

  RoomClimateTempRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 32,
    justifyContent: 'center',
    paddingTop: 16,
  },
  RoomClimateTempPillButton: {
    alignItems: 'center',
    backgroundColor: colors.nearbyMuted,
    borderRadius: 9999,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  RoomClimateTempPillSymbol: {
    color: colors.cream,
    fontFamily: fonts.sansMedium,
    fontSize: 22,
    fontWeight: '500',
    lineHeight: 33,
  },
  RoomClimateTempValueFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 42,
    lineHeight: 63,
  },

  RoomClimateOptionCard: {
    backgroundColor: colors.nearbyCard,
    borderRadius: 14,
    marginTop: 16,
    padding: 16,
  },
  RoomClimateOptionTitleFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 18,
  },
  RoomClimateChipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  RoomClimateChip: {
    backgroundColor: colors.nearbyMuted,
    borderRadius: 10,
    flex: 1,
    paddingVertical: 8,
  },
  RoomClimateChipActive: {
    backgroundColor: colors.red,
  },

  RoomClimateChipLabel: {
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    textAlign: 'center',
  },
  RoomClimateChipLabelActive: {
    color: colors.cream,
  },
  RoomClimateApplyButton: {
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 14,
    justifyContent: 'center',
    marginTop: 16,
    minHeight: 48,
  },
  RoomClimateApplyButtonLabel: {
    color: colors.buttonText,
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },

  RoomClimateAppliedFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
    textAlign: 'center',
  },
  RoomClimateUnitArt: {
    alignSelf: 'center',
    height: 170,
    marginTop: 32,
    width: 162,
  },
  RoomClimatePressedDim: {
    opacity: 0.85,
  },
});
