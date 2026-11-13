import { Injectable } from '@angular/core';

import type { Accessory, BikeCategory, Motorcycle, Promo, ServicePackage } from '../models/catalog.models';

/**
 * CatalogService keeps all the store data in one place.
 * Every page asks this service for the data it needs, so prices
 * and products only have to be updated here.
 *
 * Motorcycle prices are Kawasaki Philippines 2026 SRPs
 * (commuter models checked against kawasaki.ph on 2026-11-12).
 * Actual branch prices may vary.
 */
@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly branch = {
    name: 'Wheeltek Kawasaki Bitas',
    address: 'Wheeltek Big Bikes Complex, Maharlika Highway, Brgy. Bitas, Cabanatuan City, Nueva Ecija',
    phone: '0917 538 5702',
    email: 'customerservice@wheeltek.com.ph',
    hours: [
      { day: 'Monday – Saturday', time: '8:00 AM – 5:00 PM' },
      { day: 'Sunday', time: '9:00 AM – 4:00 PM' },
    ],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Wheeltek+Big+Bikes+Complex+Bitas+Cabanatuan+City',
  };

  readonly categories: BikeCategory[] = ['Commuter', 'Scooter', 'Naked', 'Sport', 'Off-Road', 'Cruiser', 'Adventure'];

  private readonly motorcycles: Motorcycle[] = [
    {
      id: 'ct125',
      image: 'assets/bikes/ct125.webp',
      name: 'Kawasaki CT125',
      category: 'Commuter',
      price: 62400,
      engine: '125cc, 4-stroke, single cylinder',
      transmission: '5-speed manual',
      colors: ['Black', 'Red', 'Blue'],
      description: 'A tough and fuel-efficient everyday motorcycle built for daily errands and long city rides.',
      highlights: ['Very fuel efficient', 'Low maintenance cost', 'Comfortable long seat'],
    },
    {
      id: 'ct150',
      image: 'assets/bikes/ct150.webp',
      name: 'Kawasaki CT150',
      category: 'Commuter',
      price: 74000,
      engine: '144.8cc, 4-stroke, single cylinder',
      transmission: '5-speed manual',
      colors: ['Black', 'Red'],
      description: 'More power for heavier loads while keeping the reliability the CT line is known for.',
      highlights: ['Stronger 150cc engine', 'Heavy-duty rear carrier', 'Good for provincial roads'],
    },
    {
      id: 'barako-2',
      image: 'assets/bikes/barako-2.webp',
      name: 'Kawasaki Barako II 175',
      category: 'Commuter',
      price: 95500,
      engine: '175cc, 4-stroke, single cylinder',
      transmission: '5-speed manual',
      colors: ['Black', 'Red'],
      description: 'The "King of the Road" for tricycle drivers and hard workers. Built for heavy loads all day.',
      highlights: ['Best for tricycle use', 'High torque engine', 'Durable frame'],
      featured: true,
    },
    {
      id: 'barako-3',
      image: 'assets/bikes/barako-3.webp',
      name: 'Kawasaki Barako III',
      category: 'Commuter',
      price: 96500,
      engine: '175cc, 4-stroke, single cylinder',
      transmission: '5-speed manual',
      colors: ['Black', 'Blue', 'Red'],
      description: 'The newest Barako with updated looks and the same workhorse engine Filipinos trust.',
      highlights: ['Updated modern design', 'Strong pulling power', 'Easy to maintain'],
    },
    {
      id: 'brusky-125',
      image: 'assets/bikes/brusky-125.webp',
      name: 'Kawasaki Brusky 125',
      category: 'Scooter',
      price: 75000,
      engine: '124.8cc, 4-stroke, single cylinder',
      transmission: 'Automatic (CVT)',
      colors: ['Matte Black', 'Gray', 'Green'],
      description: 'An easy-to-ride automatic scooter for students, workers and city riding.',
      highlights: ['No clutch, no shifting', 'Under-seat storage', 'Light and easy to park'],
    },
    {
      id: 'rouser-ns125',
      image: 'assets/bikes/rouser-ns125.webp',
      name: 'Kawasaki Rouser NS125 FI',
      category: 'Naked',
      price: 82000,
      engine: '124.45cc, fuel-injected, single cylinder',
      transmission: '5-speed manual',
      colors: ['Burnt Red', 'Pewter Gray', 'Sapphire Blue'],
      description: 'A sporty street bike with fuel injection, perfect as a first sport-style motorcycle.',
      highlights: ['Fuel injection', 'Perimeter frame', 'Sporty naked styling'],
    },
    {
      id: 'z500',
      name: 'Kawasaki Z500',
      category: 'Naked',
      price: 289800,
      engine: '451cc, parallel-twin',
      transmission: '6-speed manual',
      colors: ['Metallic Spark Black', 'Candy Lime Green'],
      description: 'The Sugomi-styled naked bike: aggressive looks, upright seating and twin-cylinder power.',
      highlights: ['Parallel-twin engine', 'Assist & slipper clutch', 'Dual-channel ABS'],
    },
    {
      id: 'z900',
      name: 'Kawasaki Z900',
      category: 'Naked',
      price: 566500,
      engine: '948cc, inline-four',
      transmission: '6-speed manual',
      colors: ['Metallic Matte Graphenesteel Gray', 'Candy Lime Green'],
      description: 'A big-bike naked with a powerful inline-four engine and modern electronics.',
      highlights: ['Inline-four power', 'Traction control', 'TFT color display'],
    },
    {
      id: 'ninja-500',
      name: 'Kawasaki Ninja 500',
      category: 'Sport',
      price: 353800,
      engine: '451cc, parallel-twin',
      transmission: '6-speed manual',
      colors: ['Lime Green', 'Metallic Matte Carbon Gray'],
      description: 'The newest entry to the Ninja family: full fairing, sharp looks and easy handling.',
      highlights: ['Ninja race-inspired design', 'Dual-channel ABS', 'Great beginner big bike'],
      featured: true,
    },
    {
      id: 'zx-25r',
      name: 'Kawasaki Ninja ZX-25R',
      category: 'Sport',
      price: 406000,
      engine: '249cc, inline-four',
      transmission: '6-speed manual with quick shifter (SE)',
      colors: ['Lime Green / Ebony', 'Metallic Spark Black'],
      description: 'A 250cc four-cylinder supersport that revs to the sky with a sound like a superbike.',
      highlights: ['Inline-four 250cc engine', 'Traction control', 'Power modes'],
      featured: true,
    },
    {
      id: 'ninja-650',
      name: 'Kawasaki Ninja 650',
      category: 'Sport',
      price: 456500,
      engine: '649cc, parallel-twin',
      transmission: '6-speed manual',
      colors: ['Lime Green', 'Metallic Spark Black'],
      description: 'A comfortable sport-tourer for highway rides and weekend trips.',
      highlights: ['Comfortable riding position', 'Smartphone connectivity', 'TFT display'],
    },
    {
      id: 'zx-10r',
      name: 'Kawasaki Ninja ZX-10R',
      category: 'Sport',
      price: 1020000,
      engine: '998cc, inline-four',
      transmission: '6-speed manual with quick shifter',
      colors: ['Lime Green / Ebony / Pearl Blizzard White'],
      description: "The championship-winning superbike built from Kawasaki's WorldSBK racing experience.",
      highlights: ['World Superbike DNA', 'Cornering ABS', 'Launch control'],
    },
    {
      id: 'klx150',
      name: 'Kawasaki KLX150',
      category: 'Off-Road',
      price: 136900,
      engine: '144cc, single cylinder',
      transmission: '5-speed manual',
      colors: ['Lime Green', 'Black'],
      description: 'A light dual-sport bike that handles both city roads and farm or mountain trails.',
      highlights: ['Long-travel suspension', 'High ground clearance', 'On-road and off-road'],
    },
    {
      id: 'klx230',
      name: 'Kawasaki KLX230',
      category: 'Off-Road',
      price: 196000,
      engine: '233cc, single cylinder, fuel-injected',
      transmission: '6-speed manual',
      colors: ['Lime Green'],
      description: 'A fuel-injected dual-sport for riders who want more power on rough roads.',
      highlights: ['Fuel injection', 'Dual-purpose tires', 'Light chassis'],
    },
    {
      id: 'eliminator',
      name: 'Kawasaki Eliminator',
      category: 'Cruiser',
      price: 366000,
      engine: '451cc, parallel-twin',
      transmission: '6-speed manual',
      colors: ['Metallic Flat Spark Black', 'Pearl Robotic White'],
      description: 'A low-seat modern cruiser that is relaxed to ride and easy to handle.',
      highlights: ['Low seat height', 'Classic cruiser style', 'Dual-channel ABS'],
    },
    {
      id: 'kle500',
      name: 'Kawasaki KLE500',
      category: 'Adventure',
      price: 341000,
      engine: '451cc, parallel-twin',
      transmission: '6-speed manual',
      colors: ['Lime Green', 'Pearl Robotic White'],
      description: 'A new 2026 adventure bike made for long trips across provinces and light trails.',
      highlights: ['Adventure-ready suspension', 'Long-distance comfort', 'New for 2026'],
    },
  ];

  private readonly accessories: Accessory[] = [
    {
      id: 'hel-full',
      name: 'Full-Face Helmet (ICC)',
      type: 'Helmet',
      price: 3500,
      icon: 'shield-checkmark',
      description: 'ICC-certified full-face helmet with clear and smoke visor.',
    },
    {
      id: 'hel-half',
      name: 'Half-Face Helmet',
      type: 'Helmet',
      price: 1800,
      icon: 'shield-half',
      description: 'Lightweight open-face helmet for city riding.',
    },
    {
      id: 'jacket',
      name: 'Riding Jacket with Armor',
      type: 'Riding Gear',
      price: 4200,
      icon: 'shirt',
      description: 'Mesh jacket with shoulder and elbow protection.',
    },
    {
      id: 'gloves',
      name: 'Riding Gloves',
      type: 'Riding Gear',
      price: 950,
      icon: 'hand-left',
      description: 'Breathable gloves with knuckle guards.',
    },
    {
      id: 'raincoat',
      name: 'Raincoat Set',
      type: 'Riding Gear',
      price: 1200,
      icon: 'rainy',
      description: 'Waterproof jacket and pants for the rainy season.',
    },
    {
      id: 'box',
      name: 'Top Box (30L)',
      type: 'Parts',
      price: 2500,
      icon: 'cube',
      description: 'Rear storage box that fits a full-face helmet.',
    },
    {
      id: 'mirror',
      name: 'Side Mirror Set',
      type: 'Parts',
      price: 450,
      icon: 'scan',
      description: 'Replacement mirror set for Kawasaki models.',
    },
    {
      id: 'chain',
      name: 'Chain & Sprocket Set',
      type: 'Parts',
      price: 1650,
      icon: 'cog',
      description: 'Genuine drive chain and sprocket kit.',
    },
    {
      id: 'oil',
      name: 'Kawasaki 4T Engine Oil (1L)',
      type: 'Care',
      price: 380,
      icon: 'water',
      description: 'Genuine Kawasaki oil for 4-stroke engines.',
    },
    {
      id: 'lube',
      name: 'Chain Lube Spray',
      type: 'Care',
      price: 320,
      icon: 'color-fill',
      description: 'Keeps your chain clean and protected from rust.',
    },
  ];

  private readonly servicePackages: ServicePackage[] = [
    {
      id: 'change-oil',
      name: 'Change Oil Package',
      price: 450,
      duration: '30 minutes',
      icon: 'water',
      inclusions: ['Genuine Kawasaki 4T oil', 'Oil filter check', 'Free 10-point safety check'],
    },
    {
      id: 'pms',
      name: 'Preventive Maintenance (PMS)',
      price: 1200,
      duration: '1 – 2 hours',
      icon: 'construct',
      recommended: true,
      inclusions: [
        'Change oil',
        'Air filter cleaning',
        'Spark plug check',
        'Brake adjustment',
        'Chain cleaning & lube',
      ],
    },
    {
      id: 'tune-up',
      name: 'General Tune-Up',
      price: 1800,
      duration: '2 – 3 hours',
      icon: 'speedometer',
      inclusions: [
        'Carburetor / FI cleaning',
        'Valve clearance check',
        'Spark plug replacement',
        'Battery test',
        'Test ride',
      ],
    },
    {
      id: 'brake',
      name: 'Brake Service',
      price: 650,
      duration: '1 hour',
      icon: 'disc',
      inclusions: ['Brake pad/shoe inspection', 'Brake fluid top-up', 'Brake cable adjustment'],
    },
    {
      id: 'free-check',
      name: 'Free Service (New Units)',
      price: 0,
      duration: 'Per schedule',
      icon: 'ribbon',
      inclusions: [
        '1st free check-up at 1,000 km',
        '2nd free check-up at 4,000 km',
        'Labor is free; parts not included',
      ],
    },
  ];

  readonly promos: Promo[] = [
    { title: 'Low Down Payment', subtitle: 'Bring home a Barako for as low as ₱9,999 DP', icon: 'pricetag' },
    { title: 'Free Helmet', subtitle: 'With every cash purchase of a brand-new unit', icon: 'gift' },
    { title: 'Free 1st PMS', subtitle: 'For all units bought at the Bitas branch', icon: 'construct' },
  ];

  getMotorcycles(): Motorcycle[] {
    return this.motorcycles;
  }

  getFeatured(): Motorcycle[] {
    return this.motorcycles.filter((bike) => bike.featured);
  }

  getMotorcycle(id: string): Motorcycle | undefined {
    return this.motorcycles.find((bike) => bike.id === id);
  }

  getAccessories(): Accessory[] {
    return this.accessories;
  }

  getServicePackages(): ServicePackage[] {
    return this.servicePackages;
  }
}
