import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import {colors, fonts} from '../../constants/theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
};

export function PrimaryButton({
  label,
  onPress,
  style,
  fullWidth = false,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.PrimaryButtonBtnPortico,
        fullWidth && styles.PrimaryButtonButtonWide,
        pressed && styles.PrimaryButtonButtonPressedDim,
        style,
      ]}>
      <Text style={styles.PrimaryButtonLabelFiligree}>{label}</Text>
    </Pressable>
  );
}

type SecondaryButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function SecondaryButton({label, onPress, style}: SecondaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.SecondaryButtonBtnPortico,
        pressed && styles.PrimaryButtonButtonPressedDim,
        style,
      ]}>
      <Text style={styles.SecondaryButtonLabelFiligree}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  PrimaryButtonBtnPortico: {
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 14,
    flex: 1,
    justifyContent: 'center',
    minHeight: 56,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  PrimaryButtonButtonWide: {
    flex: 0,
    width: '100%',
  },
  PrimaryButtonButtonPressedDim: {
    opacity: 0.85,
  },
  PrimaryButtonLabelFiligree: {
    color: colors.buttonText,
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    fontWeight: '500',
  },
  SecondaryButtonBtnPortico: {
    alignItems: 'center',
    borderColor: colors.black,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14.8,
  },
  SecondaryButtonLabelFiligree: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
  },
});
