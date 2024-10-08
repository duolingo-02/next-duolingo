// Container Styles
export const containerStyles = {
  fullScreenCenter:
    "flex items-center justify-center min-h-screen bg-duolingoDark",
  fullWidthCenter: "flex items-center justify-center w-full",
  card: "w-full max-w-4xl p-10 text-duolingoLight bg-duolingoDark rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl",
  secondCard:
    "w-full max-w-md md:w-96 p-8 mx-auto text-duolingoLight bg-duolingoDark2 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl",
  progressContainer: "flex items-center justify-center mb-6",
  formGroup: "flex flex-col md:flex-row md:gap-6",
  centeredSection: "text-center py-10",
  gridLayout: "grid grid-cols-1 md:grid-cols-2 gap-4",
  flexWrap: "flex flex-wrap",
  columnCenter: "flex flex-col items-center justify-center",
  rowCenter: "flex flex-row items-center justify-center",
  gameContainer:
    "flex justify-center items-center min-h-screen bg-duolingoDark",
  gameCard:
    "w-full max-w-2xl p-6 text-duolingoLight bg-duolingoDark rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl",
  fullScreen: "w-full min-h-screen bg-duolingoDark",
  quizContainer:
    "w-full p-4 bg-duolingoLight rounded-lg shadow-xl mt-6 text-duolingoDark",
};

// Button Styles
export const buttonStyles = {
  primary:
    "w-full py-3 text-xl font-bold text-duolingoLight bg-duolingoGreen rounded-full shadow-lg hover:bg-green-500 transition-transform duration-300 hover:scale-105",
  secondary:
    "w-full py-3 text-xl font-bold text-duolingoLight bg-duolingoBlue rounded-full shadow-lg hover:bg-blue-500 transition-transform duration-300 hover:scale-105",
  logout:
    "w-full py-3 mt-8 text-xl font-bold text-duolingoLight bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-transform duration-300 hover:scale-105 mb-14",
  achievementsButton:
    "w-full py-3 text-xl font-bold text-duolingoLight bg-duolingoYellow rounded-full shadow-lg hover:bg-yellow-600 transition-transform duration-300 hover:scale-105",
  smallButton:
    "px-4 py-2 text-sm font-bold text-duolingoLight bg-duolingoGray rounded-full shadow-md hover:bg-gray-700 transition-transform duration-300",
  iconButton:
    "p-2 text-duolingoLight rounded-full hover:bg-duolingoGray transition",
  linkButton:
    "text-duolingoBlue hover:text-blue-600 underline transition-colors duration-200",
  selected:
    "w-full py-3 text-xl font-bold text-duolingoLight bg-duolingoYellow rounded-full shadow-lg scale-105 border-2 border-yellow-600 transition-all duration-300",
  option:
    "px-4 py-2 text-lg font-bold text-duolingoLight bg-duolingoGray rounded-full shadow-lg hover:bg-duolingoGreen hover:text-duolingoDark transition-colors duration-300",
  disabled:
    "px-4 py-2 text-lg font-bold text-duolingoGray bg-duolingoDarkLight rounded-full shadow-lg cursor-not-allowed",
  uploadButton:
    "block w-full p-2 mt-1 text-duolingoLight bg-duolingoBlue border border-gray-300 rounded-full shadow-lg cursor-pointer hover:bg-blue-500 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-duolingoBlue",
  next: "w-full py-3 text-xl font-bold text-duolingoLight bg-blue-600 hover:bg-blue-700 transition-colors duration-300",
  retry:
    "w-full py-3 text-xl font-bold text-duolingoLight bg-yellow-600 hover:bg-yellow-700 transition-colors duration-300",
  back: "w-full py-3 text-xl font-bold text-duolingoLight bg-red-600 hover:bg-red-700 transition-colors duration-300",
  confirm:
    "w-full py-3 text-xl font-bold text-duolingoLight bg-green-600 hover:bg-green-700 transition-colors duration-300",
};

// Typography Styles
export const typographyStyles = {
  heading1: "text-4xl font-bold text-duolingoLight mb-6",
  heading2: "text-3xl font-semibold text-duolingoLight mb-4",
  heading3: "text-2xl font-semibold text-duolingoGray mb-4",
  heading4: "text-2xl font-semibold text-duolingoGreen mb-4",
  paragraph: "text-base text-duolingoGray leading-relaxed",
  link: "text-duolingoBlue hover:text-blue-600 underline transition-colors duration-200",
  highlightText: "text-duolingoYellow font-semibold",
  subheading: "text-lg font-medium text-duolingoGray",
  caption: "text-sm text-duolingoGray",
  logoTitle: "text-6xl font-extrabold text-duolingoGreen drop-shadow-md",
  subtitle: "text-lg text-duolingoLight",
};

// Spacing and Utility Styles
export const spacingStyles = {
  marginAuto: "mx-auto",
  marginBottomLarge: "mb-10",
  paddingHorizontal: "px-4 md:px-8",
  paddingVertical: "py-4 md:py-6",
  roundedLg: "rounded-2xl",
  shadowLg: "shadow-lg",
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  marginTopMedium: "mt-6",
  marginBottomSmall: "mb-4",
  paddingSmall: "p-2",
};

// ...

// Profile-Specific Styles
export const profileStyles = {
  pictureContainer: "w-24 h-24 mb-4 flex justify-center items-center",
  picture:
    "object-cover w-full h-full border-4 border-duolingoBlue rounded-full shadow-lg",
  username: "mt-4 text-4xl font-bold text-duolingoLight text-center",
  profileDescription: "text-center text-duolingoGray mt-2",
};

// ...

// Form-Specific Styles
export const formStyles = {
  formGroup: "flex flex-col md:flex-row md:gap-6",
  label: "block text-lg font-medium text-duolingoGray",
  input:
    "block w-full p-2 mt-1 text-duolingoDark border border-gray-300 rounded-full shadow-sm focus:ring-duolingoBlue focus:border-duolingoBlue transition-all duration-200",
  errorText: "text-sm text-red-500 mt-2",
  submitButton:
    "w-full py-3 text-lg font-bold text-duolingoLight bg-duolingoGreen rounded-full shadow-lg hover:bg-green-600 transition-transform duration-300 hover:scale-105",
  disabledInput: "bg-gray-200 text-gray-500 cursor-not-allowed",
  fullWidthInput: "w-full",
  uploadButton:
    "block w-full p-2 mt-1 text-duolingoLight bg-duolingoBlue border border-gray-300 rounded-full shadow-lg cursor-pointer hover:bg-blue-500 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-duolingoBlue",
};

// Achievements Styles
export const achievementsStyles = {
  title: "mb-6 text-3xl font-bold text-center text-duolingoLight",
  progressCircle:
    "relative bg-gray-300 rounded-full w-36 h-36 flex items-center justify-center",
  levelTrophy: "text-4xl text-duolingoYellow",
  levelMedal: "text-4xl text-duolingoGray",
  levelStar: "text-4xl text-yellow-800",
  progressBar: "w-full h-4 bg-gray-200 rounded-full",
  progressText: "text-lg font-semibold text-duolingoGray text-center",
};

// Timer Styles
export const timerStyles = {
  circle:
    "w-24 h-24 flex items-center justify-center rounded-full bg-duolingoGreen text-duolingoLight text-2xl font-bold",
};

// Progress Bar Styles
export const progressStyles = {
  bar: "relative w-full h-4 bg-gray-300 rounded-full overflow-hidden",
  progress:
    "absolute top-0 left-0 h-full bg-duolingoGreen transition-all duration-300",
};

// Popup Styles
export const popupStyles = {
  popup:
    "fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50",
  popupContent:
    "w-full max-w-md p-8 bg-white rounded-xl shadow-lg text-center transition-transform duration-300",
  successIcon: "text-6xl text-duolingoGreen mb-4",
  errorIcon: "text-6xl text-red-600 mb-4",
};
