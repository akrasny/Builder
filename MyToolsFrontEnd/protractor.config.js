exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'firefox'
    },
    specs: ['test/features/Auth/e2e/login.spec.js'],
    jasmineNodeOpts: {
        showColors: true
    }
}