import type {ImageSourcePropType} from 'react-native';

import {venueArt} from './assets';

export type Venue = {
  id: string;
  name: string;
  hours: string;
  phone: string;
  description: string[];
  image: ImageSourcePropType;
};

export const VENUES: Venue[] = [
  {
    id: 'sunset-grill',
    name: 'Sunset Grill',
    hours: '07:00 – 23:00',
    phone: '+1 (555) 201-1001',
    description: [
      'Sunset Grill offers a relaxed dining experience with a menu inspired by international cuisine. Guests can enjoy breakfast, lunch, and dinner throughout the day. The restaurant features both indoor and outdoor seating.',
      'Fresh ingredients are used to prepare every dish. The atmosphere is welcoming and suitable for families, couples, and groups. Reservations are available for all meal periods.',
    ],
    image: venueArt.sunsetGrill,
  },
  {
    id: 'ocean-bar',
    name: 'Ocean Bar',
    hours: '10:00 – 01:00',
    phone: '+1 (555) 201-1002',
    description: [
      'Ocean Bar serves handcrafted cocktails, premium spirits, and refreshing beverages. Comfortable seating areas create a pleasant environment for social gatherings. Guests can enjoy panoramic views while relaxing.',
      'Live music performances are occasionally hosted during the evening. A selection of light snacks is available throughout the day. The venue is popular for sunset drinks.',
    ],
    image: venueArt.oceanBar,
  },
  {
    id: 'serenity-spa',
    name: 'Serenity Spa',
    hours: '09:00 – 21:00',
    phone: '+1 (555) 201-1003',
    description: [
      'Serenity Spa provides a wide range of wellness and relaxation treatments. Professional therapists offer massages, body therapies, and beauty services. The facility is designed to promote comfort and tranquility.',
      'Guests can choose from individual or couples treatments. Premium products are used during all procedures. Advance reservations are recommended.',
    ],
    image: venueArt.serenitySpa,
  },
  {
    id: 'infinity-pool',
    name: 'Infinity Pool',
    hours: '08:00 – 20:00',
    phone: '+1 (555) 201-1004',
    description: [
      'Infinity Pool offers a luxurious swimming experience with panoramic views. Comfortable loungers surround the pool area for relaxation. Guests can enjoy refreshments delivered directly to their seats.',
      'The facility is maintained throughout the day for maximum comfort. Dedicated staff are available to assist visitors. The atmosphere is peaceful and inviting.',
    ],
    image: venueArt.infinityPool,
  },
  {
    id: 'fitness-center',
    name: 'Fitness Center',
    hours: '06:00 – 22:00',
    phone: '+1 (555) 201-1005',
    description: [
      'Fitness Center features modern exercise equipment for all training levels. Guests have access to cardio machines, strength equipment, and stretching areas. The facility supports both casual and advanced workouts.',
      'Personal training sessions can be arranged upon request. Complimentary towels and water are provided. The environment is clean and professionally maintained.',
    ],
    image: venueArt.fitnessCenter,
  },
  {
    id: 'sky-lounge',
    name: 'Sky Lounge',
    hours: '16:00 – 00:00',
    phone: '+1 (555) 201-1006',
    description: [
      'Sky Lounge combines elegant design with exceptional panoramic views. Guests can enjoy premium beverages and signature menu selections. The venue is ideal for evening relaxation.',
      'Comfortable seating creates a sophisticated atmosphere. The lounge is frequently chosen for special occasions and celebrations. Reservations are available for larger groups.',
    ],
    image: venueArt.skyLounge,
  },
  {
    id: 'wellness-center',
    name: 'Wellness Center',
    hours: '08:00 – 20:00',
    phone: '+1 (555) 201-1007',
    description: [
      'Wellness Center focuses on health, recovery, and relaxation experiences. Guests can participate in guided wellness activities and treatments. The facility promotes balance and overall wellbeing.',
      'Several private treatment rooms are available. Professional staff provide personalized recommendations. The environment is calm and restorative.',
    ],
    image: venueArt.wellnessCenter,
  },
  {
    id: 'executive-lounge',
    name: 'Executive Lounge',
    hours: '07:00 – 22:00',
    phone: '+1 (555) 201-1008',
    description: [
      'Executive Lounge offers an exclusive space for work and relaxation. Comfortable seating areas support both business meetings and personal downtime. Complimentary refreshments are available throughout the day.',
      'The lounge provides a quiet and professional atmosphere. High-speed internet access is included for all guests. Access is available to eligible visitors and members.',
    ],
    image: venueArt.executiveLounge,
  },
];

export function getVenueById(id: string): Venue | undefined {
  return VENUES.find(venue => venue.id === id);
}
