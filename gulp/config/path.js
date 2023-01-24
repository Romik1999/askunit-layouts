import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        blocks: `${buildFolder}/blocks/`,
        blocksCss: `${buildFolder}/blocks/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        files: `${buildFolder}/files/`,
        libs: `${buildFolder}/libs`,
    },
    src: {
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
        scss: `${srcFolder}/scss/style.scss`,
        blocks: `${srcFolder}/blocks/**/*.html`,
        blocksCss: `${srcFolder}/blocks/**/*.scss`,
        html: `${srcFolder}/*.html`,
        libs: `${srcFolder}/libs/**/*.*`,
        files: `${srcFolder}/files/**/*.*`,
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        blocks: `${srcFolder}/blocks/**/*.html`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp,svg}`,
        files: `${srcFolder}/files/**/*.*`,
        libs: `${srcFolder}/libs/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
};