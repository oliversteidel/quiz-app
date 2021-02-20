module.exports = {
    css: {
      loaderOptions: {
        sass: {
          prependData: `@import "@/styles/_globals.scss";`
        }
      }
    }
  };