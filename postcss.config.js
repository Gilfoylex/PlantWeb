module.exports = {
    plugins: {
        'postcss-px-to-viewport-8-plugin': {
            viewportWidth: 375,
            unitPrecision: 6,
            unitToConvert: 'px',
            propList: ['*'],
            mediaQuery: false,
            landscape: true,
            landscapeUnit: 'vw',
            landscapeWidth: 1024
        }
    }
}

