export type AppPhase = 'Loader' | 'Onboarding' | 'Main';

export type GuestTab =
  | 'PassTab'
  | 'ServicesTab'
  | 'EventsTab'
  | 'DiningTab'
  | 'ClimateTab'
  | 'AssistTab';

export type GuestOverlay =
  | {type: 'none'}
  | {type: 'FullScreenPass'}
  | {type: 'BookingForm'; serviceId: string}
  | {type: 'ServiceRequestSent'};

export type NearbyScreen =
  | {name: 'NearbyList'}
  | {name: 'LocationDetail'; locationId: string};

export type DiningScreen =
  | {name: 'DiningMenu'}
  | {name: 'OrderReview'}
  | {name: 'OrderConfirmation'};

export type AssistScreenName =
  | 'AssistHome'
  | 'SavedEvents'
  | 'MyBookings'
  | 'DiningOrders'
  | 'GuestTips'
  | 'ResortInfo'
  | 'AppInfo';

export type AssistScreen = {name: AssistScreenName};

export type ServicesScreen =
  | {name: 'VenuesList'}
  | {name: 'VenueDetail'; venueId: string};
