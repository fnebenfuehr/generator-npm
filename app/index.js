'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var NpmGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the fantastic Npm generator.'));

    var prompts = [{
      name: 'name',
      message: 'Module Name',
      default: path.basename(process.cwd())
    }, {
      name: 'description',
      message: 'Description',
      default: 'The best module ever.'
    }, {
      name: 'homepage',
      message: 'homepage'
    }, {
      name: 'license',
      message: 'License',
      default: 'MIT'
    }, {
      name: 'githubUsername',
      message: 'GitHub username'
    }, {
      name: 'authorName',
      message: 'Author\'s Name'
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email'
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage'
    }];

    this.currentYear = (new Date()).getFullYear();

    this.prompt(prompts, function (props) {
      this.slugname = this._.slugify(props.name);
      this.safeSlugname = this.slugname.replace(
        /-([a-z])/g,
        function (g) { return g[1].toUpperCase(); }
      );

      if(!props.githubUsername){
        this.repoUrl = 'https://github.com/' + props.githubUsername + '/' + this.slugname;
      } else {
        this.repoUrl = 'user/repo';
      }

      if (!props.homepage) {
        props.homepage = this.repoUrl;
      }

      this.props = props;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('lib');
    this.mkdir('src');
    this.template('lib/name.coffee', 'src/' + this.slugname + '.coffee');

    this.mkdir('test');
    this.template('test/name_test.coffee', 'test/' + this.slugname + '_test.coffee');
  },

  projectfiles: function () {
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('travis.yml', '.travis.yml');

    this.template('README.md');
    this.template('gulpfile.coffee');
    this.template('_package.json', 'package.json');
  }
});

module.exports = NpmGenerator;