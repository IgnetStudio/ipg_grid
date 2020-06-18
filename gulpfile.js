var gulp = require('gulp');
var pug = require('gulp-pug');

gulp.task('pug', done => {
    gulp.src('./src/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./'));
    done();
});

gulp.task('watch', done => {
    gulp.watch('./src/*.pug', gulp.series('pug'));
    done();
});