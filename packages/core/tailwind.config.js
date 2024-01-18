const sharedConfig = require("tailwind-config/tailwind.config.js");

module.exports = {
  // prefix ui lib classes to avoid conflicting with the app
  ...sharedConfig,
  prefix: "novel-",
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      lineHeight: {
        normal: '180%',
      }
    }
  }
};
