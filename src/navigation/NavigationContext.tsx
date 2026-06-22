import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import type {
  AppPhase,
  AssistScreen,
  AssistScreenName,
  DiningScreen,
  GuestOverlay,
  GuestTab,
  NearbyScreen,
  ServicesScreen,
} from './types';

type NavigationContextValue = {
  phase: AppPhase;
  activeTab: GuestTab;
  overlay: GuestOverlay;
  nearbyStack: NearbyScreen[];
  diningStack: DiningScreen[];
  assistStack: AssistScreen[];
  servicesStack: ServicesScreen[];
  bookingServiceId: string | null;
  locationDetailId: string | null;
  finishLoader: () => void;
  finishOnboarding: () => void;
  selectTab: (tab: GuestTab) => void;
  goBack: () => void;
  openFullScreenPass: () => void;
  openBookingForm: (serviceId: string) => void;
  showServiceRequestSent: () => void;
  returnToServicesTab: () => void;
  openLocationDetail: (locationId: string) => void;
  openVenueDetail: (venueId: string) => void;
  openDiningScreen: (screen: DiningScreen['name']) => void;
  resetDiningToMenu: () => void;
  openAssistScreen: (screen: AssistScreenName) => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

const INITIAL_NEARBY_STACK: NearbyScreen[] = [{name: 'NearbyList'}];
const INITIAL_DINING_STACK: DiningScreen[] = [{name: 'DiningMenu'}];
const INITIAL_ASSIST_STACK: AssistScreen[] = [{name: 'AssistHome'}];
const INITIAL_SERVICES_STACK: ServicesScreen[] = [{name: 'VenuesList'}];

export function NavigationProvider({children}: {children: React.ReactNode}) {
  const [phase, setPhase] = useState<AppPhase>('Onboarding');
  const [activeTab, setActiveTab] = useState<GuestTab>('PassTab');
  const [overlay, setOverlay] = useState<GuestOverlay>({type: 'none'});
  const [nearbyStack, setNearbyStack] =
    useState<NearbyScreen[]>(INITIAL_NEARBY_STACK);
  const [diningStack, setDiningStack] =
    useState<DiningScreen[]>(INITIAL_DINING_STACK);
  const [assistStack, setAssistStack] =
    useState<AssistScreen[]>(INITIAL_ASSIST_STACK);
  const [servicesStack, setServicesStack] =
    useState<ServicesScreen[]>(INITIAL_SERVICES_STACK);

  const finishLoader = useCallback(() => {
    setPhase('Onboarding');
  }, []);

  const finishOnboarding = useCallback(() => {
    setPhase('Main');
  }, []);

  const selectTab = useCallback((tab: GuestTab) => {
    if (tab !== 'EventsTab' && activeTab === 'EventsTab') {
      setNearbyStack(INITIAL_NEARBY_STACK);
    }
    if (tab !== 'ServicesTab' && activeTab === 'ServicesTab') {
      setServicesStack(INITIAL_SERVICES_STACK);
    }
    if (tab !== 'DiningTab' && activeTab === 'DiningTab') {
      setDiningStack(INITIAL_DINING_STACK);
    }
    setActiveTab(tab);
  }, [activeTab]);

  const goBack = useCallback(() => {
    if (overlay.type !== 'none') {
      setOverlay({type: 'none'});
      return;
    }

    if (activeTab === 'EventsTab' && nearbyStack.length > 1) {
      setNearbyStack(current => current.slice(0, -1));
      return;
    }

    if (activeTab === 'ServicesTab' && servicesStack.length > 1) {
      setServicesStack(current => current.slice(0, -1));
      return;
    }

    if (activeTab === 'DiningTab' && diningStack.length > 1) {
      setDiningStack(current => current.slice(0, -1));
      return;
    }

    if (activeTab === 'AssistTab' && assistStack.length > 1) {
      setAssistStack(current => current.slice(0, -1));
    }
  }, [activeTab, assistStack.length, diningStack.length, nearbyStack.length, servicesStack.length, overlay.type]);

  const openFullScreenPass = useCallback(() => {
    setOverlay({type: 'FullScreenPass'});
  }, []);

  const openBookingForm = useCallback((serviceId: string) => {
    setOverlay({type: 'BookingForm', serviceId});
  }, []);

  const showServiceRequestSent = useCallback(() => {
    setOverlay({type: 'ServiceRequestSent'});
  }, []);

  const returnToServicesTab = useCallback(() => {
    setOverlay({type: 'none'});
    setActiveTab('ServicesTab');
  }, []);

  const openLocationDetail = useCallback((locationId: string) => {
    setNearbyStack(current => [...current, {name: 'LocationDetail', locationId}]);
  }, []);

  const openVenueDetail = useCallback((venueId: string) => {
    setServicesStack(current => [...current, {name: 'VenueDetail', venueId}]);
  }, []);

  const openDiningScreen = useCallback((screen: DiningScreen['name']) => {
    setDiningStack(current => [...current, {name: screen}]);
  }, []);

  const resetDiningToMenu = useCallback(() => {
    setDiningStack(INITIAL_DINING_STACK);
  }, []);

  const openAssistScreen = useCallback((screen: AssistScreenName) => {
    setAssistStack(current => [...current, {name: screen}]);
  }, []);

  const bookingServiceId =
    overlay.type === 'BookingForm' ? overlay.serviceId : null;

  const topNearbyScreen = nearbyStack[nearbyStack.length - 1];
  const locationDetailId =
    topNearbyScreen?.name === 'LocationDetail'
      ? topNearbyScreen.locationId
      : null;

  const value = useMemo(
    () => ({
      phase,
      activeTab,
      overlay,
      nearbyStack,
      diningStack,
      assistStack,
      servicesStack,
      bookingServiceId,
      locationDetailId,
      finishLoader,
      finishOnboarding,
      selectTab,
      goBack,
      openFullScreenPass,
      openBookingForm,
      showServiceRequestSent,
      returnToServicesTab,
      openLocationDetail,
      openVenueDetail,
      openDiningScreen,
      resetDiningToMenu,
      openAssistScreen,
    }),
    [
      phase,
      activeTab,
      overlay,
      nearbyStack,
      diningStack,
      assistStack,
      servicesStack,
      bookingServiceId,
      locationDetailId,
      finishLoader,
      finishOnboarding,
      selectTab,
      goBack,
      openFullScreenPass,
      openBookingForm,
      showServiceRequestSent,
      returnToServicesTab,
      openLocationDetail,
      openVenueDetail,
      openDiningScreen,
      resetDiningToMenu,
      openAssistScreen,
    ],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useAppNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useAppNavigation must be used within NavigationProvider');
  }
  return context;
}

// Non-throwing variant for components that may render outside the provider
// (e.g. the loader shown before NavigationProvider mounts).
export function useOptionalAppNavigation() {
  return useContext(NavigationContext);
}
