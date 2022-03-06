const projectFolder = "dist";
// const projectFolder = require('path').basename(__dirname);
const pathF = require("path");
const srcFolder = "src";
const path = {
    build: {
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        js: projectFolder + "/js/",
        images: projectFolder + "/images/",
        fonts: projectFolder + "/fonts/",
        lib: projectFolder + "/lib/",
        widgets: projectFolder + "/widgets/",
    },
    src: {
        html: [srcFolder + "/*.html", "!" + srcFolder + "blocks/*.html"],
        css: srcFolder + "/scss/style.scss",
        js: srcFolder + "/js/script.js",
        images: srcFolder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: srcFolder + "/fonts/*.ttf",
        lib: srcFolder + "/lib/**/*",
        widgets: srcFolder + "/blocks/widgets/**/*.html",
    },
    watch: {
        html: srcFolder + "/**/*.html",
        css: srcFolder + "/**/*.scss",
        js: srcFolder + "/**/*.js",
        images: srcFolder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
        widgets: srcFolder + "/widgets/**/*",
    },
    clean: "./" + projectFolder + "/",
};

const gulp = require("gulp");
const {src, dest} = require("gulp");
const browserSync = require("browser-sync");
const fileInclude = require("gulp-file-include");
const del = require("del");
const scss = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const groupMedia = require("gulp-group-css-media-queries");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
// const webp = require("gulp-webp");
// const webpHtml = require("gulp-webp-html");
// const webpCss = require("gulp-webpcss");
const svgSprite = require("gulp-svg-sprite");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const flatten = require("gulp-flatten");
// const fonter = require("gulp-fonter");
// const fs = require("fs");
const plumber = require('gulp-plumber');

function sync() {
    browserSync.init({
        server: {
            baseDir: "./" + projectFolder + "/",
        },
        port: 3000,
        notify: false,
    });
}

function html() {
    return (
        src(path.src.html)
            .pipe(
                fileInclude({
                    prefix: "@@",
                    basepath: srcFolder + "/blocks/",
                })
            )
            // .pipe(webpHtml())
            .pipe(dest(path.build.html))
            .pipe(browserSync.stream())
    );
}

function css() {
    src([srcFolder + "/**/*.scss", "!" + srcFolder + "/scss/*.scss"])
        .pipe(plumber())
        .pipe(
            scss({
                outputStyle: "expanded",
            })
        )
        // .pipe(flatten({ subPath: [0, -1] }))
        .pipe(
            rename({
                basename: "style",
            })
        )
        .pipe(groupMedia())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 8 versions"],
                cascade: true,
                grid: "autoplace",
            })
        )
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(
            rename({
                basename: "style",
                extname: ".min.css",
            })
        )
        .pipe(dest(path.build.css));
    src([srcFolder + "/scss/*.scss"])
        .pipe(plumber())
        .pipe(
            scss({
                outputStyle: "expanded",
            })
        )
        .pipe(groupMedia())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 8 versions"],
                cascade: true,
                grid: "autoplace",
            })
        )
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(
            rename({
                extname: ".min.css",
            })
        )
        .pipe(dest(path.build.css));
    return (
        src(path.src.css)
            .pipe(plumber())
            .pipe(
                scss({
                    outputStyle: "expanded",
                })
            )
            .on("error", scss.logError)
            .pipe(groupMedia())
            .pipe(
                autoprefixer({
                    overrideBrowserslist: ["last 8 versions"],
                    cascade: true,
                    grid: "autoplace",
                })
            )
            // .pipe(webpCss({ webpClass: ".webp", noWebpClass: ".no-webp" }))
            .pipe(dest(path.build.css))
            .pipe(cleanCss())
            .pipe(
                rename({
                    basename: "style",
                    extname: ".min.css",
                })
            )
            .pipe(dest(path.build.css))
            .pipe(browserSync.stream())
    );
}

function js() {
    return src(path.src.js)
        .pipe(fileInclude())
        .pipe(dest(path.build.js))
        .pipe(
            rename({
                extname: ".min.js",
            })
        )
        .pipe(uglify())
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream());
}

function images() {
    return (
        src(path.src.images)
        /* .pipe(
        webp({
          quality: 70,
        })
      )
      .pipe(dest(path.build.images))
      .pipe(src(path.src.images))*/
            .pipe(
                imagemin({
                    progressive: true,
                    svgoPlugins: [{removeViewBox: true}],
                    interlaced: true,
                    optimizationLevel: 3,
                })
            )
            .pipe(dest(path.build.images))

            .pipe(browserSync.stream())
    );
}

gulp.task("svgSprite", function () {
    return gulp
        .src([srcFolder + "/iconsprite/*.svg"])
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: "../icons/icons.svg",
                        example: true,
                    },
                },
            })
        )
        .pipe(dest(path.build.images));
});

function external() {
    src(path.src.widgets).pipe(dest(path.build.widgets));
    return src(path.src.lib)
        .pipe(dest(path.build.lib))
        .pipe(browserSync.stream());
}

function fonts() {
    /*src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));*/

    return src(path.src.fonts).pipe(dest(path.build.fonts));
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.images], images);
}

function clean() {
    return del(path.clean);
}

const build = gulp.series(
    clean,
    // gulp.parallel(css)
    gulp.parallel(js, css, html, images, "svgSprite", fonts, external)
);
const watch = gulp.parallel(build, watchFiles, sync);

exports.external = external;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.build = build;
exports.html = html;
exports.watch = watch;
exports.default = watch;
