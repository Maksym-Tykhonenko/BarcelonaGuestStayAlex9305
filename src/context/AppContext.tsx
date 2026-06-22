import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {generatePassCode} from '../utils/generatePassCode';
import {getMenuItemById} from '../data/menu';
import type {VenueReservation} from '../data/hotel';

const DO_NOT_DISTURB_STORAGE_KEY = 'settings.doNotDisturb';
const RESERVATION_STORAGE_KEY = 'guest.reservation';

export type FanSpeed = 'Low' | 'Medium' | 'High' | 'Auto';
export type AirMode = 'Cool' | 'Heat' | 'Fan' | 'Dry';

export type RoomClimateSettings = {
  temperature: number;
  fanSpeed: FanSpeed;
  airMode: AirMode;
};

const DEFAULT_ROOM_CLIMATE: RoomClimateSettings = {
  temperature: 21,
  fanSpeed: 'High',
  airMode: 'Heat',
};

export type CartItems = Record<string, number>;

type AppContextValue = {
  passCode: string;
  savedReservation: VenueReservation | null;
  saveReservation: (reservation: VenueReservation) => void;
  clearReservation: () => void;
  doNotDisturb: boolean;
  setDoNotDisturb: (value: boolean) => void;
  roomClimate: RoomClimateSettings;
  applyRoomClimateSettings: (settings: RoomClimateSettings) => void;
  cart: CartItems;
  addToCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartItemCount: number;
  cartTotal: number;
};

const AppContext = createContext<AppContextValue | null>(null);

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({children}: AppProviderProps) {
  const [passCode] = useState(() => generatePassCode());
  const [savedReservation, setSavedReservation] =
    useState<VenueReservation | null>(null);
  const [doNotDisturb, setDoNotDisturbState] = useState(false);
  const [roomClimate, setRoomClimate] =
    useState<RoomClimateSettings>(DEFAULT_ROOM_CLIMATE);
  const [cart, setCart] = useState<CartItems>({});

  useEffect(() => {
    AsyncStorage.getItem(DO_NOT_DISTURB_STORAGE_KEY).then(value => {
      if (value !== null) {
        setDoNotDisturbState(value === 'true');
      }
    });

    AsyncStorage.getItem(RESERVATION_STORAGE_KEY).then(value => {
      if (!value) {
        return;
      }

      try {
        const parsed = JSON.parse(value) as VenueReservation;
        if (
          parsed.code &&
          parsed.venueName &&
          parsed.date &&
          parsed.time &&
          typeof parsed.guests === 'number'
        ) {
          setSavedReservation(parsed);
        }
      } catch {
        // Ignore invalid stored reservation.
      }
    });
  }, []);

  const saveReservation = useCallback((reservation: VenueReservation) => {
    setSavedReservation(reservation);
    void AsyncStorage.setItem(
      RESERVATION_STORAGE_KEY,
      JSON.stringify(reservation),
    );
  }, []);

  const clearReservation = useCallback(() => {
    setSavedReservation(null);
    void AsyncStorage.removeItem(RESERVATION_STORAGE_KEY);
  }, []);

  const setDoNotDisturb = useCallback((value: boolean) => {
    setDoNotDisturbState(value);
    void AsyncStorage.setItem(DO_NOT_DISTURB_STORAGE_KEY, String(value));
  }, []);

  const applyRoomClimateSettings = useCallback((settings: RoomClimateSettings) => {
    setRoomClimate(settings);
  }, []);

  const addToCart = useCallback((itemId: string) => {
    setCart(current => ({
      ...current,
      [itemId]: (current[itemId] ?? 0) + 1,
    }));
  }, []);

  const updateCartQuantity = useCallback((itemId: string, quantity: number) => {
    setCart(current => {
      if (quantity <= 0) {
        const next = {...current};
        delete next[itemId];
        return next;
      }
      return {...current, [itemId]: quantity};
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({});
  }, []);

  const cartItemCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart],
  );

  const cartTotal = useMemo(
    () =>
      Object.entries(cart).reduce((sum, [itemId, quantity]) => {
        const item = getMenuItemById(itemId);
        return sum + (item?.price ?? 0) * quantity;
      }, 0),
    [cart],
  );

  const value = useMemo(
    () => ({
      passCode,
      savedReservation,
      saveReservation,
      clearReservation,
      doNotDisturb,
      setDoNotDisturb,
      roomClimate,
      applyRoomClimateSettings,
      cart,
      addToCart,
      updateCartQuantity,
      clearCart,
      cartItemCount,
      cartTotal,
    }),
    [
      passCode,
      savedReservation,
      saveReservation,
      clearReservation,
      doNotDisturb,
      setDoNotDisturb,
      roomClimate,
      applyRoomClimateSettings,
      cart,
      addToCart,
      updateCartQuantity,
      clearCart,
      cartItemCount,
      cartTotal,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
