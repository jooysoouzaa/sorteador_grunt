module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/style.css': 'src/styles/style.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/style.min.css': 'src/styles/style.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*less'],
                tasks: ['less:development'],
            },
            html:{
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
                dev: {
                    options: {
                        patterns: [
                            {
                                match: 'ENDERECO_DO_CSS',
                                replacement: './styles/style.css'

                            },
                            {
                                match: 'ENDERECO_DO_JS',
                                replacement: '../src/scripts/scripts.js'

                            }
                        ]
                    },
                    files: [
                        {
                            expand: true, 
                            flatten: true,
                            src: ['src/index.html'],
                            dest: 'dev/'
                        }
                    ]
                },
                dist: {
                    options: {
                        patterns: [
                            {
                                match: 'ENDERECO_DO_CSS',
                                replacement: './styles/style.min.css'
                            },
                            {
                                match: 'ENDERECO_DO_JS',
                                replacement: './scripts/scripts.min.js'

                            }
                        ]
                    },
                    files: [
                        {
                            expand: true, 
                            flatten: true,
                            src: ['prebuild/index.html'],
                            dest: 'dist/'
                        }
                    ]
                }
        }, 
        htmlmin:{
            dist:{
                options:{
                    removeComments: true,
                    collapseWhitespace: true
                },
                files:{
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify:{
            target:{
                files:{
                    'dist/scripts/scripts.min.js': 'src/scripts/scripts.js'
                }
            }
        }

    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);
}
