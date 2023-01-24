import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Сжатие CSS файл
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Групировка медиа запросов

const sass = gulpSass(dartSass);

export const scss = () => {
    app.gulp.src(app.path.src.blocksCss, {sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(
            rename({
                basename: "style",
            })
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    overrideBrowserslist: ["last 8 versions"],
                    cascade: true,
                    grid: "autoplace",
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.blocksCss))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            basename: "style",
            extname: ".min.css",
        }))
        .pipe(app.gulp.dest(app.path.build.blocksCss));

    app.gulp.src([`${app.path.srcFolder}/scss/*.scss`, `!${app.path.srcFolder}/scss/style.scss`], {sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    overrideBrowserslist: ["last 8 versions"],
                    cascade: true,
                    grid: "autoplace",
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: ".min.css",
        }))
        .pipe(app.gulp.dest(app.path.build.css));
    return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(
            rename({
                basename: "style",
            })
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    overrideBrowserslist: ["last 8 versions"],
                    cascade: true,
                    grid: "autoplace",
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            basename: "style",
            extname: ".min.css",
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());

};
