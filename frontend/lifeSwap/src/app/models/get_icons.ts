import {
  faGamepad,
  faHeart,
  faHouse,
  faPersonRunning,
  faAngleDown,
  faAngleUp,
  faPlus,
  faCircleExclamation,
  faXmark,
  faMagnifyingGlass,
  faSpinner,
  faAngleRight,
  faChevronLeft,
  faUser,
  faEnvelope,
  faLock,
  faEyeSlash,
  faEye

} from '@fortawesome/free-solid-svg-icons';

const ICON_PATH = 'icons/svg/';

export const get_icons: { [key: string]: any } = {
  //subcategories icons
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

  //category icons
  Sports: faPersonRunning,
  Health: faHeart,
  Home: faHouse,
  Hobbies: faGamepad,

  //general icons
  faAngleDown: faAngleDown,
  faAngleUp: faAngleUp,
  faPlus: faPlus,
  faCircleExclamation: faCircleExclamation,
  faXmark: faXmark,
  faMagnifyingGlass: faMagnifyingGlass,
  faSpinner: faSpinner,

  //user
  'userSignIn':`${ICON_PATH}sign-in-icon.svg`,
  'userSignInBg':`${ICON_PATH}bg-green-sign-in.svg`,
  faAngleRight:faAngleRight,
  faChevronLeft:faChevronLeft,
  faUser:faUser,
  faEnvelope:faEnvelope,
  faLock:faLock,
  faEyeSlash:faEyeSlash,
  faEye:faEye
};
