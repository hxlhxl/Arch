module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: ['src/**/*.js'],
            options: {
                globals: {
                    _: false,
                    $: false,
                    jasmine: false,
                    describe: false,
                    it: false,
                    expect: false,
                    beforeEach: false,
                    afterEach: false,
                    sinon: false,
                },
                browser: true,
                devel: true
            }
        },
        testem: {
            unit: {
                src: [
                    'test/**/*.js'
                ],
                options:{
                    debug: true,
                    framework: 'jasmine2',
                    launch_in_dev: ['PhantomJS'],
                    before_tests: 'grunt jshint',
                    serve_files: [
                        'node_modules/sinon/pkg/sinon.js',
                        'src/**/*.js',
                        'test/**/*.js'
                    ],
                    watch_files: [
                        'src/**/*.js',
                        "test/**/*.js"
                    ]

                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-testem');
}
