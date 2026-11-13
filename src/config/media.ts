/**
 * =============================================================================
 *  MEDIA — every photo and video used on the site, in one place
 * =============================================================================
 *  These are free-to-use stock photos/videos from Pexels (pexels.com/license —
 *  free for commercial use, no attribution required). They are REPRESENTATIVE
 *  images, not photographs of Workout World Gym itself.
 *
 *  TO USE YOUR OWN PHOTOS:
 *    1. Put the file in  public/images/   (e.g. public/images/lat-pulldown.webp)
 *    2. Replace the matching line below with the local path, e.g.
 *         latPulldown: '/images/lat-pulldown.webp',
 *  Nothing else needs to change.
 * =============================================================================
 */

const PX = 'https://images.pexels.com/photos';

/** Build an optimised Pexels image URL at the given width. */
const px = (path: string, w = 1200) =>
  `${PX}/${path}?auto=compress&cs=tinysrgb&w=${w}`;

export const media = {
  /* ---------------- Equipment ---------------- */
  latPulldown: px('12203215/pexels-photo-12203215.jpeg', 900),
  seatedRow: px('5769127/pexels-photo-5769127.jpeg', 900),
  cableStation: px('5327505/pexels-photo-5327505.jpeg', 900),
  chestPress: px('3838926/pexels-photo-3838926.jpeg', 900),
  chestFly: px(
    '18060022/pexels-photo-18060022/free-photo-of-muscular-man-exercising-on-the-peck-deck-machine-at-the-gym.jpeg',
    900,
  ),
  shoulderPress: px(
    '34669288/pexels-photo-34669288/free-photo-of-man-exercising-with-shoulder-press-machine-in-gym.jpeg',
    900,
  ),
  legExtension: px(
    '19722966/pexels-photo-19722966/free-photo-of-man-exercising-his-legs-at-the-gym.jpeg',
    900,
  ),
  preacherCurl: px(
    '17559309/pexels-photo-17559309/free-photo-of-man-practicing-at-gym.jpeg',
    900,
  ),
  benches: px(
    '40371837/pexels-photo-40371837/free-photo-of-modern-gym-with-dumbbells-and-benches.jpeg',
    900,
  ),
  dumbbells: px('6550849/pexels-photo-6550849.jpeg', 900),
  barbellsPlates: px('4793231/pexels-photo-4793231.jpeg', 900),
  pullUpBar: px('7672092/pexels-photo-7672092.jpeg', 900),
  treadmills: px('12250460/pexels-photo-12250460.jpeg', 900),
  exerciseBikes: px(
    '19254708/pexels-photo-19254708/free-photo-of-a-man-exercising-on-a-stationary-bicycle-at-the-gym.jpeg',
    900,
  ),

  /* ---------------- Section imagery ---------------- */
  about: px(
    '29392546/pexels-photo-29392546/free-photo-of-dimly-lit-modern-gym-with-equipment-reflection.jpeg',
    1200,
  ),
  services: px('7444444/pexels-photo-7444444.jpeg', 1200),
  finalCta: px('6389516/pexels-photo-6389516.jpeg', 1920),

  /* ---------------- Gallery ---------------- */
  gallery: [
    px('4753890/pexels-photo-4753890.jpeg', 1400),
    px('9545914/pexels-photo-9545914.jpeg', 1400),
    px(
      '29526371/pexels-photo-29526371/free-photo-of-modern-well-equipped-gym-with-diverse-fitness-equipment.jpeg',
      1400,
    ),
    px('1552252/pexels-photo-1552252.jpeg', 1400),
    px(
      '40371847/pexels-photo-40371847/free-photo-of-modern-gym-with-advanced-fitness-equipment.jpeg',
      1400,
    ),
    px('7690454/pexels-photo-7690454.jpeg', 1400),
    px(
      '19025671/pexels-photo-19025671/free-photo-of-a-gym-with-a-rack-of-weights-and-barbells.jpeg',
      1400,
    ),
    px(
      '35306856/pexels-photo-35306856/free-photo-of-close-up-of-barbell-on-gym-floor.jpeg',
      1400,
    ),
  ],

  /* ---------------- Looping training clips ("Press. Pull. Lift.") ------- */
  reels: [
    {
      title: 'Press',
      caption: 'Bench work for chest, shoulders and triceps.',
      src: 'https://videos.pexels.com/video-files/5320001/5320001-hd_1280_720_25fps.mp4',
      poster:
        'https://images.pexels.com/videos/5320001/pexels-photo-5320001.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Pull',
      caption: 'Heavy pulls from the floor for total-body strength.',
      src: 'https://videos.pexels.com/video-files/20559800/20559800-sd_540_960_30fps.mp4',
      poster:
        'https://images.pexels.com/videos/20559800/pexels-photo-20559800.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Lift',
      caption: 'Dumbbells for every muscle group and every level.',
      src: 'https://videos.pexels.com/video-files/20621391/20621391-hd_1280_720_60fps.mp4',
      poster:
        'https://images.pexels.com/videos/20621391/dumbbell-dumbbells-gym-lifting-20621391.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],

  /* ---------------- Looping video band ---------------- */
  video: {
    src: 'https://videos.pexels.com/video-files/5319998/5319998-hd_1280_720_25fps.mp4',
    poster:
      'https://images.pexels.com/videos/5319998/pexels-photo-5319998.jpeg?auto=compress&cs=tinysrgb&w=1280',
  },
} as const;
