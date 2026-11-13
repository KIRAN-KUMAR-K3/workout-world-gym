/**
 * EQUIPMENT CATALOGUE
 * -------------------
 * This list is built from the equipment the gym owner confirmed is present at
 * Workout World Gym. No equipment is invented.
 *
 * PHOTOS: each item uses a representative free-licensed image defined in
 *   src/config/media.ts. To use your own photo of the actual machine, change
 *   the matching line in that file (see the instructions at the top of it).
 */

import { media } from '@/config/media';

export type EquipmentCategory =
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Arms'
  | 'Legs'
  | 'Abs'
  | 'Cardio';

export interface EquipmentItem {
  id: string;
  name: string;
  category: EquipmentCategory;
  target: string;
  description: string;
  /** Path to the real photo once added (see note above). */
  image?: string;
}

export const equipment: EquipmentItem[] = [
  {
    id: 'lat-pulldown',
    image: media.latPulldown,
    name: 'Lat Pulldown Station',
    category: 'Back',
    target: 'Lats & upper back',
    description:
      'Cable pulldown station for building a wide, strong back with controlled, full-range reps.',
  },
  {
    id: 'seated-cable-row',
    image: media.seatedRow,
    name: 'Seated Cable Row',
    category: 'Back',
    target: 'Mid-back & rhomboids',
    description:
      'Seated rowing machine that targets mid-back thickness and improves posture.',
  },
  {
    id: 'multi-gym-cable',
    image: media.cableStation,
    name: 'Multi-Gym Cable Station',
    category: 'Back',
    target: 'Full upper body',
    description:
      'Versatile cable crossover station supporting dozens of pushing and pulling movements.',
  },
  {
    id: 'chest-press',
    image: media.chestPress,
    name: 'Chest Press Machine',
    category: 'Chest',
    target: 'Chest & triceps',
    description:
      'Guided chest press for safe, progressive pressing strength and chest development.',
  },
  {
    id: 'chest-fly',
    image: media.chestFly,
    name: 'Chest Fly (Pec Deck)',
    category: 'Chest',
    target: 'Pectorals',
    description:
      'Isolation fly machine that focuses contraction directly on the chest.',
  },
  {
    id: 'shoulder-press',
    image: media.shoulderPress,
    name: 'Shoulder Training Station',
    category: 'Shoulders',
    target: 'Deltoids',
    description:
      'Dedicated shoulder equipment for pressing and building rounded, capped delts.',
  },
  {
    id: 'leg-curl-extension',
    image: media.legExtension,
    name: 'Leg Curl / Leg Extension',
    category: 'Legs',
    target: 'Hamstrings & quads',
    description:
      'Combination machine to isolate the hamstrings and quadriceps through a full range.',
  },
  {
    id: 'preacher-curl',
    image: media.preacherCurl,
    name: 'Preacher Curl Bench',
    category: 'Arms',
    target: 'Biceps',
    description:
      'Preacher bench that locks the arms in place for strict, peak-focused biceps curls.',
  },
  {
    id: 'benches',
    image: media.benches,
    name: 'Flat & Adjustable Benches',
    category: 'Chest',
    target: 'Chest, shoulders & arms',
    description:
      'Flat and incline/decline benches for pressing, dumbbell work and accessory lifts.',
  },
  {
    id: 'dumbbells',
    image: media.dumbbells,
    name: 'Dumbbells & Dumbbell Racks',
    category: 'Arms',
    target: 'Full body',
    description:
      'A full range of dumbbells on organised racks for strength and hypertrophy training.',
  },
  {
    id: 'barbells-plates',
    image: media.barbellsPlates,
    name: 'Barbells & Weight Plates',
    category: 'Legs',
    target: 'Compound lifts',
    description:
      'Olympic barbells and weight plates for squats, deadlifts, presses and rows.',
  },
  {
    id: 'pull-up-bar',
    image: media.pullUpBar,
    name: 'Pull-Up Bar',
    category: 'Back',
    target: 'Back & grip',
    description:
      'Fixed pull-up bar for bodyweight pulling strength and back development.',
  },
  {
    id: 'treadmills',
    image: media.treadmills,
    name: 'Treadmills',
    category: 'Cardio',
    target: 'Cardio & endurance',
    description:
      'Motorised treadmills for warm-ups, fat loss and cardiovascular conditioning.',
  },
  {
    id: 'exercise-bikes',
    image: media.exerciseBikes,
    name: 'Stationary Exercise Bikes',
    category: 'Cardio',
    target: 'Cardio & legs',
    description:
      'Low-impact stationary cycles for endurance work and active recovery.',
  },
];

/** Categories that actually have equipment, in display order. */
const CATEGORY_ORDER: EquipmentCategory[] = [
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Legs',
  'Abs',
  'Cardio',
];

export const activeCategories: EquipmentCategory[] = CATEGORY_ORDER.filter(
  (cat) => equipment.some((e) => e.category === cat),
);
