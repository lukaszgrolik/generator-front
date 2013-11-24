'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var appDirs = [
  'css',
  'fonts',
  'images',
  'images-imagemin',
  'includes',
  'js',
  'js/modules',
  'js/vendor',
  'pages',
  'sass',
  'sass/blocks',
  'ui-docs'
];

var appFiles = [
  { templateName: '_package.json', name: 'package.json' },
  { templateName: '_bower.json', name: 'bower.json' },
  { templateName: 'gitignore', name: '.gitignore' },
  { templateName: 'Gruntfile.js', name: 'Gruntfile.js' },
  { templateName: 'config.rb', name: 'config.rb' },

  { templateName: 'page-1.html', name: 'pages/page-1.html' },

  { templateName: 'main.scss', name: 'sass/main.scss' },
  { templateName: 'config.scss', name: 'sass/_config.scss' },
  { templateName: 'init.scss', name: 'sass/_init.scss' },
  { templateName: 'temp.scss', name: 'sass/_temp.scss' },

  { templateName: 'main.js', name: 'js/modules/main.js' }
];

var FrontGenerator = module.exports = function FrontGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(FrontGenerator, yeoman.generators.Base);

FrontGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  // console.log(this.yeoman);

  var prompts = [{
    type: 'input',
    name: 'appName',
    message: 'App name:',
    default: 'project'
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;

    cb();
  }.bind(this));
};

FrontGenerator.prototype.app = function app() {
  var i, file;

  for (i = 0; i < appDirs.length; ++i) {
    this.mkdir(appDirs[i]);
  };

  for (i = 0; i < appFiles.length; ++i) {
    file = appFiles[i];

    this.copy(file.templateName, file.name);
  };
};

FrontGenerator.prototype.projectfiles = function projectfiles() {
  // this.copy('editorconfig', '.editorconfig');
  // this.copy('jshintrc', '.jshintrc');
};
