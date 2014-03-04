gulp       = require 'gulp'
gutil      = require 'gulp-util'
clean      = require 'gulp-clean'
coffee     = require 'gulp-coffee'

gulp.task 'clean', ->
  gulp.src('./lib/*', read: false)
      .pipe clean()

compile = (map) ->
  gutil.log('sourceMap', map)
  gulp.src('./src/*.coffee')
    .pipe coffee({sourceMap: map}).on('error', gutil.log)
    .pipe gulp.dest('./lib/')

# build app
gulp.task 'watch', ->
  gulp.watch './src/*.coffee', =>
    compile(false)

# build app
gulp.task 'build', ->
  gulp.tasks.clean.fn()
  compile(true)

# The default task (called when you run `gulp` from cli)
gulp.task 'default', ->
  gulp.tasks.clean.fn()
  compile(false)
  gulp.tasks.watch.fn()
