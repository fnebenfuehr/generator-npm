gulp       = require 'gulp'
gutil      = require 'gulp-util'
clean      = require 'gulp-clean'
coffee     = require 'gulp-coffee'
coffeelint = require 'gulp-coffeelint'

gulp.task 'clean', ->
  gulp.src('./lib/*', read: false)
      .pipe clean()

gulp.task 'lint', ->
  gulp.src('./src/*.coffee')
      .pipe(coffeelint())
      .pipe(coffeelint.reporter())


gulp.task 'coffee', ->
  # gutil.log('sourceMap', map)
  gulp.src('./src/*.coffee')
    .pipe coffee({sourceMap: true}).on('error', gutil.log)
    .pipe gulp.dest('./lib/')

# build app
gulp.task 'watch', ->
  gulp.watch './src/*.coffee', ['lint', 'coffee']

# build app
gulp.task 'build', ['lint', 'coffee']
  # gulp.tasks.clean.fn()
  # gulp.tasks.coffee.fn(true)

# The default task (called when you run `gulp` from cli)
gulp.task 'default', ['clean', 'lint', 'coffee', 'watch']