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
  { templateName: 'composer.json', name: 'composer.json' },
  { templateName: 'gitignore', name: '.gitignore' },
  { templateName: 'Gruntfile.js', name: 'Gruntfile.js' },
  { templateName: 'dploy.yaml', name: 'dploy.yaml' },
  { templateName: 'web.php', name: 'web.php' },

  { templateName: 'page-1.html', name: 'pages/page-1.html' },

  { templateName: 'main.scss', name: 'sass/main.scss' },
  { templateName: 'config.scss', name: 'sass/_config.scss' },
  { templateName: 'init.scss', name: 'sass/_init.scss' },
  { templateName: 'temp.scss', name: 'sass/_temp.scss' },

  { templateName: 'modules-main.js', name: 'js/modules/main.js' }
];

var componentChoices = [
  { name: 'almond', value: 'almond', checked: true },
  { name: 'chosen', value: 'chosen', checked: true },
  { name: 'handlebars', value: 'handlebars', checked: true },
  { name: 'html5shiv', value: 'html5shiv', checked: true },
  { name: 'jquery.syncHeight', value: 'jquerysyncHeight', checked: true },
  { name: 'jquery.ui', value: 'jqueryui', checked: true },
  { name: 'jquery-icheck', value: 'jqueryicheck', checked: true },
  { name: 'jquery-placeholder', value: 'jqueryplaceholder', checked: true },
  { name: 'modernizr', value: 'modernizr', checked: true },
  { name: 'requirejs', value: 'requirejs', checked: true },
  { name: 'respond', value: 'respond', checked: true },
  { name: 'sass-handy-mixins', value: 'sasshandymixins', checked: true },
  { name: 'selectivizr', value: 'selectivizr', checked: true },
  { name: 'strict-reset.css', value: 'strictresetcss', checked: true }
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
  }, {
    type: 'checkbox',
    name: 'bowerComponents',
    message: 'Bower components (jquery already included):',
    choices: componentChoices
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;

    var components = props.bowerComponents;

    function hasComponent(component) { return components.indexOf(component) !== -1; }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    // this.jquery = hasComponent('jquery');
    // this.jqueryui = hasComponent('jqueryui');

    var value;
    var i;

    for (i = 0; i < componentChoices.length; ++i) {
      value = componentChoices[i].value;

      this[value] = hasComponent(value);
    };

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
