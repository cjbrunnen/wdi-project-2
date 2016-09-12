const gulp     = require("gulp");
const babel    = require("gulp-babel");
const cleanCSS = require("gulp-clean-css");

const src  = "src";
const dist = "public";

gulp.task("es6", () => {
    return gulp.src(`${src}/**/*.js`)
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(gulp.dest(dist));
});

gulp.task("minifyCSS", () => {
    return gulp.src(`${src}/**/*.css`)
        .pipe(cleanCSS({ compatibility: "ie8"}))
        .pipe(gulp.dest(dist));
});

gulp.task("watch", () => {
  gulp.watch(`${src}/**/*.js`, ['es6']);
    gulp.watch(`${src}/**/*.css`, ['minifyCSS']);
});

gulp.task("default", ['es6', 'minifyCSS', 'watch']);
