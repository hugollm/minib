module.exports = {

    Setup: {
        dev: 'mkdir -p hello/.dev && rm -rf hello/.dev/*',
        build: 'mkdir -p hello/dist && rm -rf hello/dist/*',
    },

    Index: {
        after: 'Setup',
        dev: 'cp hello/src/index.html hello/.dev/index.html',
        build: 'cp hello/src/index.html hello/dist/index.html',
        watch: 'hello/src/index.html',
        reload: 'page',
    },

    TypeScript: {
        after: 'Setup',
        dev: 'tsc hello/src/index.ts --outFile hello/.dev/index.js --sourceMap',
        build: 'tsc hello/src/index.ts --outFile hello/dist/index.js',
        watch: 'hello/src/*.ts',
        reload: 'page',
    },

    Sass: {
        after: 'Setup',
        dev: 'sass hello/src/index.scss hello/.dev/index.css --source-map',
        build: 'sass hello/src/index.scss hello/dist/index.css --no-source-map',
        watch: 'hello/*.scss',
        reload: 'styles',
    },

    Static: {
        after: 'Setup',
        dev: 'cp -r hello/static/* hello/.dev/',
        build: 'cp -r hello/static/* hello/dist/',
        watch: 'hello/static/**',
        reload: 'page',
    },

    Uglify: {
        after: 'TypeScript',
        build: 'uglifyjs hello/dist/index.js --compress --mangle --output hello/dist/index.js',
    },
};
