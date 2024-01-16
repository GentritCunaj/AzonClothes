const path = require('path');

module.exports = function override(config, env) {
  // Add a rule to handle SCSS files outside the src directory
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: [
      path.resolve(__dirname, 'public/scss'),
      // Add any other paths as needed
    ],
  });

  return config;
};