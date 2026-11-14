/**
 * =============================================================================
 *  MEDIA — every photo and video used on the site, in one place
 * =============================================================================
 *  Real photographs of Deepak Kaverappa live in  public/images/  (WebP,
 *  metadata stripped) and are referenced below as site-relative paths.
 *
 *  The equipment tiles and the training clips are still free-to-use stock
 *  media from Pexels (pexels.com/license — free for commercial use, no
 *  attribution required). They are REPRESENTATIVE, not shot at the gym.
 *
 *  TO REPLACE ANY OF THEM WITH YOUR OWN PHOTO:
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

  /* ---------------- Section imagery (real photos) ---------------- */
  about: '/images/deepak-portrait-red.webp',
  services: '/images/deepak-back-pose.webp',
  finalCta: '/images/deepak-double-biceps.webp',

  /* ---------------- Founder ---------------- */
  founder: {
    /** Main portrait in the founder section (16:10 frame). */
    main: '/images/deepak-cable-crossover-wide.webp',
    /** Competition moments shown as a strip under the founder text. */
    moments: [
      {
        src: '/images/deepak-stage.webp',
        alt: 'Deepak Kaverappa posing on a bodybuilding competition stage',
        label: 'On stage',
      },
      {
        src: '/images/deepak-trophy.webp',
        alt: 'Deepak Kaverappa smiling with a trophy and garland after a win',
        label: 'Title win',
      },
      {
        src: '/images/deepak-artwork.webp',
        alt: 'Illustrated artwork of Deepak Kaverappa performing a cable crossover',
        label: 'Signature',
      },
    ],
  },

  /* ---------------- Gallery (real photos) ---------------- */
  gallery: [
    {
      src: '/images/deepak-cable-crossover.webp',
      label: 'Cable crossover',
      alt: 'Deepak Kaverappa performing a cable crossover on the gym floor',
    },
    {
      src: '/images/deepak-between-sets.webp',
      label: 'Between sets',
      alt: 'Deepak Kaverappa resting on the dumbbell rack between sets',
    },
    {
      src: '/images/deepak-outdoors.webp',
      label: 'Off the floor',
      alt: 'Deepak Kaverappa in a vest and sunglasses outside the gym',
    },
    {
      src: '/images/deepak-barbell-curl.webp',
      label: 'Barbell curls',
      alt: 'Deepak Kaverappa curling an EZ bar under red light',
    },
    {
      src: '/images/deepak-dumbbell-rack.webp',
      label: 'The rack',
      alt: 'Deepak Kaverappa seated among rows of dumbbells',
    },
    {
      src: '/images/deepak-dumbbell-curl.webp',
      label: 'Dumbbell work',
      alt: 'Deepak Kaverappa curling a heavy dumbbell',
    },
    {
      src: '/images/deepak-overhead-press.webp',
      label: 'Overhead press',
      alt: 'Deepak Kaverappa pressing two dumbbells overhead',
    },
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
