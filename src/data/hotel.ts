export type ReservationDetails = {
  code: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
};

export type VenueReservation = {
  code: string;
  venueName: string;
  date: string;
  time: string;
  guests: number;
};

export type ReservationCardRow = {
  label: string;
  value: string;
};

export const HOTEL = {
  name: 'Grand Residences Hotel',
  description:
    'Nestled in the heart of the city, Grand Residences offers unrivalled luxury and service. Every detail is crafted to ensure your stay is effortless and memorable.',
} as const;

export const DEMO_RESERVATION: ReservationDetails = {
  code: 'GRH-20748',
  checkIn: 'Jul 10, 2026',
  checkOut: 'Jul 14, 2026',
  roomType: 'Deluxe Suite',
};

export const RECOMMENDED_LOCATION_ID = 'old-town';

export const RECOMMENDED_NEARBY = {
  locationId: RECOMMENDED_LOCATION_ID,
  name: 'The Old Quarter',
  tagline: 'Historic streets and culture',
} as const;

export function getGreeting(date = new Date()): string {
  const hour = date.getHours();

  if (hour < 12) {
    return 'Good Morning';
  }

  if (hour < 18) {
    return 'Good Afternoon';
  }

  return 'Good Evening';
}

export function getDemoReservationRows(): ReservationCardRow[] {
  return [
    {label: 'Reservation Code', value: DEMO_RESERVATION.code},
    {label: 'Check-in Date', value: DEMO_RESERVATION.checkIn},
    {label: 'Check-out Date', value: DEMO_RESERVATION.checkOut},
    {label: 'Room Type', value: DEMO_RESERVATION.roomType},
  ];
}

export function getVenueReservationRows(
  reservation: VenueReservation,
): ReservationCardRow[] {
  return [
    {label: 'Reservation Code', value: reservation.code},
    {label: 'Venue', value: reservation.venueName},
    {label: 'Date', value: reservation.date},
    {label: 'Time', value: reservation.time},
    {label: 'Guests', value: String(reservation.guests)},
  ];
}
