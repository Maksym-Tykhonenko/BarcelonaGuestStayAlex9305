import type {ImageSourcePropType} from 'react-native';

import {menuArt} from './assets';

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: ImageSourcePropType;
};

export type MenuCategory = {
  id: string;
  title: string;
  items: MenuItem[];
};

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'appetizers',
    title: 'APPETIZERS',
    items: [
      {
        id: 'classic-caesar-salad',
        name: 'Classic Caesar Salad',
        price: 12,
        description: 'Crisp romaine, parmesan, garlic croutons.',
        image: menuArt.classicCaesarSalad,
      },
      {
        id: 'bruschetta-selection',
        name: 'Bruschetta Selection',
        price: 11,
        description: 'Tomatoes, basil, olive oil, toast.',
        image: menuArt.bruschettaSelection,
      },
      {
        id: 'crispy-calamari',
        name: 'Crispy Calamari',
        price: 14,
        description: 'Lightly fried squid with lemon aioli.',
        image: menuArt.crispyCalamari,
      },
      {
        id: 'beef-carpaccio',
        name: 'Beef Carpaccio',
        price: 16,
        description: 'Thin sliced beef, arugula, parmesan.',
        image: menuArt.beefCarpaccio,
      },
      {
        id: 'mediterranean-platter',
        name: 'Mediterranean Platter',
        price: 15,
        description: 'Olives, hummus, vegetables, pita bread.',
        image: menuArt.mediterraneanPlatter,
      },
    ],
  },
  {
    id: 'main-courses',
    title: 'MAIN COURSES',
    items: [
      {
        id: 'grilled-salmon-fillet',
        name: 'Grilled Salmon Fillet',
        price: 24,
        description: 'Fresh salmon with seasonal vegetables.',
        image: menuArt.grilledSalmonFillet,
      },
      {
        id: 'ribeye-steak',
        name: 'Ribeye Steak',
        price: 32,
        description: 'Tender beef steak with herb butter.',
        image: menuArt.ribeyeSteak,
      },
      {
        id: 'chicken-supreme',
        name: 'Chicken Supreme',
        price: 22,
        description: 'Roasted chicken breast with potatoes.',
        image: menuArt.chickenSupreme,
      },
      {
        id: 'seafood-risotto',
        name: 'Seafood Risotto',
        price: 26,
        description: 'Creamy rice with mixed seafood.',
        image: menuArt.seafoodRisotto,
      },
      {
        id: 'truffle-pasta',
        name: 'Truffle Pasta',
        price: 23,
        description: 'Fresh pasta with truffle sauce.',
        image: menuArt.trufflePasta,
      },
    ],
  },
  {
    id: 'desserts',
    title: 'DESSERTS',
    items: [
      {
        id: 'chocolate-lava-cake',
        name: 'Chocolate Lava Cake',
        price: 10,
        description: 'Warm chocolate center, vanilla cream.',
        image: menuArt.chocolateLavaCake,
      },
      {
        id: 'classic-cheesecake',
        name: 'Classic Cheesecake',
        price: 9,
        description: 'Creamy cheesecake with berry topping.',
        image: menuArt.classicCheesecake,
      },
      {
        id: 'tiramisu-delight',
        name: 'Tiramisu Delight',
        price: 9,
        description: 'Coffee soaked layers and mascarpone.',
        image: menuArt.tiramisuDelight,
      },
      {
        id: 'fruit-parfait',
        name: 'Fruit Parfait',
        price: 8,
        description: 'Fresh fruits with yogurt cream.',
        image: menuArt.fruitParfait,
      },
      {
        id: 'caramel-panna-cotta',
        name: 'Caramel Panna Cotta',
        price: 9,
        description: 'Silky vanilla dessert with caramel.',
        image: menuArt.caramelPannaCotta,
      },
    ],
  },
  {
    id: 'beverages',
    title: 'BEVERAGES',
    items: [
      {
        id: 'fresh-orange-juice',
        name: 'Fresh Orange Juice',
        price: 6,
        description: 'Freshly squeezed premium oranges.',
        image: menuArt.freshOrangeJuice,
      },
      {
        id: 'berry-smoothie',
        name: 'Berry Smoothie',
        price: 7,
        description: 'Mixed berries blended with yogurt.',
        image: menuArt.berrySmoothie,
      },
      {
        id: 'sparkling-water',
        name: 'Sparkling Water',
        price: 4,
        description: 'Premium chilled mineral water.',
        image: menuArt.sparklingWater,
      },
      {
        id: 'signature-coffee',
        name: 'Signature Coffee',
        price: 5,
        description: 'Rich roasted coffee blend.',
        image: menuArt.signatureCoffee,
      },
      {
        id: 'tropical-mocktail',
        name: 'Tropical Mocktail',
        price: 8,
        description: 'Refreshing exotic fruit combination.',
        image: menuArt.tropicalMocktail,
      },
    ],
  },
];

const MENU_ITEMS = MENU_CATEGORIES.flatMap(category => category.items);

export function getMenuItemById(id: string): MenuItem | undefined {
  return MENU_ITEMS.find(item => item.id === id);
}

export function formatMenuPrice(price: number): string {
  return `$${price}`;
}
