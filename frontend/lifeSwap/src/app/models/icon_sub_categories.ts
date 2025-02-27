import {
  faGamepad,
  faHeart,
  faHouse,
  faPersonRunning,
  faAngleDown,
  faAngleUp,
  faPlus,
  faCircleExclamation, faXmark,
} from '@fortawesome/free-solid-svg-icons';

const ICON_PATH = 'icons/svg/';

export const Icon_sub_categories: { [key: string]: string } = {
  Walking: `${ICON_PATH}walking.svg`,
  Workout: `${ICON_PATH}workout.svg`,
  Soccer: `${ICON_PATH}soccer.svg`,
  Yoga: `${ICON_PATH}yoga.svg`,

  Meditation: `${ICON_PATH}meditation.svg`,
  Nutrition: `${ICON_PATH}nutrition.svg`,
  Hydration: `${ICON_PATH}hydration.svg`,
  'Skin Care': `${ICON_PATH}skinCare.svg`,

  Cooking: `${ICON_PATH}cooking.svg`,
  Cleaning: `${ICON_PATH}cleaning.svg`,
  Laundry: `${ICON_PATH}laundry.svg`,
  Decoration: `${ICON_PATH}decor.svg`,

  Reading: `${ICON_PATH}reading.svg`,
  'Video Games': `${ICON_PATH}video_games.svg`,
  Painting: `${ICON_PATH}painting.svg`,
  Singing: `${ICON_PATH}singing.svg`,
};
export const icon_categories: { [key: string]: any } = {
  Sports: faPersonRunning,
  Health: faHeart,
  Home: faHouse,
  Hobbies: faGamepad,
};
export const general_icons: { [key: string]: any } = {
  faAngleDown: faAngleDown,
  faAngleUp: faAngleUp,
  faPlus: faPlus,
  faCircleExclamation: faCircleExclamation,
  faXmark: faXmark,
};
