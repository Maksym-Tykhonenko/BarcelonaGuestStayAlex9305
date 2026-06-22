import type {ImageSourcePropType} from 'react-native';

import {locationArt} from './assets';

export type Location = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  tagline: string;
  description: string[];
  image: ImageSourcePropType;
};

export const LOCATIONS: Location[] = [
  {
    id: 'sunset-beach',
    name: 'Sunset Beach',
    latitude: 41.3124,
    longitude: 19.4458,
    tagline: 'Golden sand and sea views.',
    description: [
      'Sunset Beach is one of the most popular coastal destinations near the resort. Visitors enjoy calm waters, wide sandy areas, and beautiful sunset views. It is ideal for families and relaxing walks.',
      'The beach offers several cafés and resting areas along the shoreline. During the summer season, guests can rent umbrellas and sunbeds. The atmosphere remains peaceful throughout most of the day.',
    ],
    image: locationArt.sunsetBeach,
  },
  {
    id: 'harbor-point',
    name: 'Harbor Point',
    latitude: 41.3148,
    longitude: 19.4496,
    tagline: 'Scenic marina and waterfront.',
    description: [
      'Harbor Point features a charming marina filled with boats and yachts. The area is perfect for sightseeing and casual evening strolls. Visitors often gather here to enjoy the sea breeze.',
      'Several restaurants and cafés overlook the waterfront promenade. Local events and small performances occasionally take place nearby. The location is especially beautiful after sunset.',
    ],
    image: locationArt.harborPoint,
  },
  {
    id: 'crystal-cove',
    name: 'Crystal Cove',
    latitude: 41.3201,
    longitude: 19.4512,
    tagline: 'Clear water and cliffs.',
    description: [
      'Crystal Cove is known for its exceptionally clear water and natural scenery. Rocky formations create unique viewpoints for photography enthusiasts. The area attracts visitors looking for a quieter atmosphere.',
      'Guests can explore nearby walking paths along the coastline. Small hidden beaches can be discovered throughout the cove. The location provides excellent opportunities for relaxation.',
    ],
    image: locationArt.crystalCove,
  },
  {
    id: 'old-town',
    name: 'Old Town',
    latitude: 41.3187,
    longitude: 19.4375,
    tagline: 'Historic streets and landmarks.',
    description: [
      'Old Town showcases local architecture and cultural heritage. Narrow streets connect traditional buildings, cafés, and artisan shops. Visitors can experience the authentic atmosphere of the region.',
      'Several historic landmarks are located within walking distance. Guided tours are available throughout the week. The district remains one of the area\'s most visited attractions.',
    ],
    image: locationArt.oldTown,
  },
  {
    id: 'palm-garden',
    name: 'Palm Garden',
    latitude: 41.3092,
    longitude: 19.4421,
    tagline: 'Lush greenery and pathways.',
    description: [
      'Palm Garden offers a peaceful escape surrounded by landscaped greenery. Shaded walking paths make it comfortable even during warmer days. The environment is suitable for both relaxation and exercise.',
      'Benches and rest areas are located throughout the garden. Seasonal flowers add color to the scenery year-round. Families often visit for quiet outdoor activities.',
    ],
    image: locationArt.palmGarden,
  },
  {
    id: 'sky-view-hill',
    name: 'Sky View Hill',
    latitude: 41.3265,
    longitude: 19.4587,
    tagline: 'Panoramic city and sea.',
    description: [
      'Sky View Hill provides breathtaking views over the coastline and city skyline. The elevated location is especially popular during sunrise and sunset. Photography enthusiasts frequently visit the viewpoint.',
      'A maintained pathway leads visitors to the observation area. Informational signs highlight local points of interest. The destination offers a memorable sightseeing experience.',
    ],
    image: locationArt.skyViewHill,
  },
  {
    id: 'blue-lagoon',
    name: 'Blue Lagoon',
    latitude: 41.3234,
    longitude: 19.4478,
    tagline: 'Turquoise waters and bays.',
    description: [
      'Blue Lagoon is famous for its vibrant turquoise water and peaceful atmosphere. Visitors enjoy swimming, relaxing, and taking photos of the surrounding scenery. The natural beauty makes it a favorite destination.',
      'The sheltered bay creates calm conditions throughout most of the year. Nearby cafés provide refreshments and snacks. The location is suitable for all age groups.',
    ],
    image: locationArt.blueLagoon,
  },
  {
    id: 'market-square',
    name: 'Market Square',
    latitude: 41.3162,
    longitude: 19.4414,
    tagline: 'Shopping and local culture.',
    description: [
      'Market Square combines local shopping with a lively atmosphere. Visitors can browse handmade goods, souvenirs, and regional products. The area offers an authentic glimpse into local culture.',
      'Street performers and seasonal events often attract additional visitors. Small cafés provide convenient places to relax between shopping. The square remains active throughout the day.',
    ],
    image: locationArt.marketSquare,
  },
  {
    id: 'coastal-trail',
    name: 'Coastal Trail',
    latitude: 41.3291,
    longitude: 19.4546,
    tagline: 'Walking route by sea.',
    description: [
      'Coastal Trail follows the shoreline through some of the area\'s most scenic landscapes. The route is popular among walkers, runners, and cyclists. Ocean views accompany visitors throughout the journey.',
      'Several viewing points offer excellent photo opportunities. Rest areas are available along the trail. The experience combines nature and recreation.',
    ],
    image: locationArt.coastalTrail,
  },
  {
    id: 'lighthouse-point',
    name: 'Lighthouse Point',
    latitude: 41.3327,
    longitude: 19.4603,
    tagline: 'Historic lighthouse and views.',
    description: [
      'Lighthouse Point is centered around a historic coastal lighthouse. Visitors enjoy panoramic views of the sea and surrounding landscape. The landmark serves as one of the area\'s recognizable attractions.',
      'Walking paths connect the lighthouse with nearby viewpoints. Informational displays provide insight into local maritime history. The location is suitable for short excursions.',
    ],
    image: locationArt.lighthousePoint,
  },
  {
    id: 'ocean-pier',
    name: 'Ocean Pier',
    latitude: 41.3155,
    longitude: 19.4528,
    tagline: 'Seafront promenade and views.',
    description: [
      'Ocean Pier extends into the sea and offers beautiful panoramic scenery. Guests often visit for walks, sightseeing, and photography. The atmosphere is especially pleasant during evening hours.',
      'Nearby cafés and seating areas create a welcoming environment. Fishing enthusiasts occasionally gather along the pier. The location remains popular year-round.',
    ],
    image: locationArt.oceanPier,
  },
  {
    id: 'nature-reserve',
    name: 'Nature Reserve',
    latitude: 41.3372,
    longitude: 19.4664,
    tagline: 'Protected wildlife and trails.',
    description: [
      'Nature Reserve preserves local wildlife and natural habitats. Visitors can explore designated trails while enjoying peaceful surroundings. Educational signs provide information about the area\'s ecosystem.',
      'Observation points allow guests to appreciate the landscape from various perspectives. The reserve promotes sustainable tourism and conservation. It offers a relaxing outdoor experience close to the resort.',
    ],
    image: locationArt.natureReserve,
  },
];

export function getLocationById(id: string): Location | undefined {
  return LOCATIONS.find(location => location.id === id);
}

export function formatCoordinates(latitude: number, longitude: number): string {
  const latDir = latitude >= 0 ? 'N' : 'S';
  const lngDir = longitude >= 0 ? 'E' : 'W';
  return `${Math.abs(latitude).toFixed(4)}° ${latDir}, ${Math.abs(longitude).toFixed(4)}° ${lngDir}`;
}
