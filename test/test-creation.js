/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('front generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('front:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            // '.jshintrc',
            // '.editorconfig',

            'package.json',
            'bower.json',
            'composer.json',
            '.gitignore',
            'Gruntfile.js',
            'config.rb',
            'dploy.yaml',
            'index.php',

            'sass/_config.scss',
            'sass/_init.scss',
            'sass/main.scss',
            'sass/_temp.scss',

            'js/modules/main.js',

            'views/layout.twig',
            'views/home.twig',

            'ui-docs/ui-controls.html'
        ];

        var componentChoices = [
          { name: 'html5shiv', value: 'html5shiv', checked: true },
          { name: 'jquery.ui', value: 'jqueryui', checked: true },
          { name: 'requirejs', value: 'requirejs', checked: true },
        ];

        helpers.mockPrompt(this.app, {
            // 'someOption': true,
            'bowerComponents': componentChoices
        });

        this.app.options['skip-install'] = true;
        
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
