module.exports = (context, opts = {}) => ({
  presets: [
    [require.resolve('babel-preset-env'), {
      modules: false,
      ...opts['preset-env']
    }]
  ],
  plugins: [
    require.resolve('babel-plugin-transform-object-rest-spread'),
    require.resolve('babel-plugin-transform-class-properties'),
    [require.resolve('babel-plugin-transform-runtime'), opts['transform-runtime'] || {}]
  ]
})
