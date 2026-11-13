import type { LucideIcon } from 'lucide-react';
import { media } from '@/config/media';
import {
  Dumbbell,
  HeartPulse,
  Users,
  Salad,
  ClipboardCheck,
  Flame,
  ShieldCheck,
  Clock,
  MapPin,
  Sparkles,
  Target,
  Gauge,
} from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

/* Facilities */
export const facilities: Feature[] = [
  {
    icon: Dumbbell,
    title: 'Strength & Weight Training',
    description:
      'A full free-weights and machine floor for serious strength and muscle building.',
  },
  {
    icon: HeartPulse,
    title: 'Cardio Zone',
    description:
      'Treadmills and stationary bikes for warm-ups, fat loss and conditioning.',
  },
  {
    icon: Users,
    title: 'Personal Training',
    description:
      'One-on-one guidance to train safely and reach your goals faster.',
  },
  {
    icon: Salad,
    title: 'Diet Plans',
    description:
      'Practical nutrition guidance built around your routine and goals.',
  },
  {
    icon: ClipboardCheck,
    title: 'Fitness Consultations',
    description:
      'Sit down with our team to map out a plan that actually fits your life.',
  },
  {
    icon: Flame,
    title: 'General Fitness Training',
    description:
      'Structured training for all levels — from first-timers to experienced lifters.',
  },
];

/* Why choose us (factual, no invented stats or reviews) */
export const whyChoose: Feature[] = [
  {
    icon: MapPin,
    title: 'Right in Mathikere',
    description:
      'Conveniently located near M.S. Ramaiah Bus Stop — easy to reach on your way to or from work.',
  },
  {
    icon: Clock,
    title: 'Long Opening Hours',
    description:
      'Open 5:00 AM to 11:00 PM, Monday to Saturday, so you can train on your schedule.',
  },
  {
    icon: ShieldCheck,
    title: 'Well-Equipped Floor',
    description:
      'Strength machines, cable stations, free weights and cardio — everything for a complete workout.',
  },
  {
    icon: Target,
    title: 'Goal-Focused Coaching',
    description:
      'Personal training, diet plans and consultations to keep you progressing.',
  },
  {
    icon: Gauge,
    title: 'For Every Level',
    description:
      'Beginner-friendly guidance alongside serious training for experienced members.',
  },
  {
    icon: Sparkles,
    title: 'Transparent Pricing',
    description:
      'Clear membership fees and a simple one-time admission fee — no hidden charges.',
  },
];

/* Gallery — representative images from src/config/media.ts.
   Swap them for real gym photographs there. */
export interface GallerySlot {
  id: string;
  label: string;
  image?: string;
}

export const gallerySlots: GallerySlot[] = [
  { id: 'g1', label: 'Strength floor', image: media.gallery[0] },
  { id: 'g2', label: 'Machines & free weights', image: media.gallery[1] },
  { id: 'g3', label: 'Training zone', image: media.gallery[2] },
  { id: 'g4', label: 'Barbell station', image: media.gallery[3] },
  { id: 'g5', label: 'Machine area', image: media.gallery[4] },
  { id: 'g6', label: 'Dumbbell work', image: media.gallery[5] },
  { id: 'g7', label: 'Racks & plates', image: media.gallery[6] },
  { id: 'g8', label: 'Heavy lifting', image: media.gallery[7] },
];
