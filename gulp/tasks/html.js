import fileInclude from "gulp-file-include";

export const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(fileInclude({
			prefix: "@@",
			basepath: "./src/blocks/",
		}))
		.pipe(app.plugins.replace(/@img\//g, 'img/'))
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream());
};

export const blocks = () => {
	return app.gulp.src(app.path.src.blocks)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(fileInclude({
			prefix: "@@",
			basepath: "./src/blocks/",
		}))
		.pipe(app.gulp.dest(app.path.build.blocks))
		.pipe(app.plugins.browsersync.stream());
};