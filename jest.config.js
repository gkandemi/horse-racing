export default {
  transform: {
    "^.+\\.js$": "babel-jest", // Babel ile ES Modules desteği
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Alias yapılandırması (Vue projelerinde yaygın)
  },
};
