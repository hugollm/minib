const exec = require('child_process').exec;

const chokidar = require('chokidar');

const log = require('./log');
const config = require(process.cwd() + '/minib.config.js');


main();

function main() {
    let args = process.argv.slice(2);
    let mode = args[0];
    if (mode != 'dev' && mode != 'build')
        return log.error('Invalid command: ' + mode);
    log.notice(mode.toUpperCase());
    runPipeline(mode);
}

function runPipeline(mode) {
    let tasks = getTasks(mode);
    for (let i in tasks)
        handleTask(tasks[i]);
}

function getTasks(mode) {
    return Object.keys(config).map(name => {
        task = config[name];
        task.name = name;
        task.cmd = task[mode];
        task.mode = mode;
        return task;
    });
}

function handleTask(task) {
    if (!task.cmd)
        return log.debug(task.name + ' SKIPPED');
    if (task.after)
        scheduleTask(task);
    else
        executeTask(task);
    if (task.watch && task.mode == 'dev')
        watchTask(task);
}

function scheduleTask(task) {
    log.debug(task.name + ' SCHEDULED');
    process.on('OK:' + task.after, () => executeTask(task));
}

function executeTask(task) {
    log.info(task.name + ' RUNNING');
    exec(task.cmd, (error, stdout, stderr) => {
        if (error)
            taskError(task, stdout + stderr);
        else
            taskOk(task, stdout + stderr);
    });
}

function taskOk(task, out) {
    log.ok(task.name + ' OK');
    if (out)
        log.output(out);
    process.emit('OK:' + task.name);
}

function taskError(task, out) {
    log.error(task.name + ' ERROR');
    log.output(out);
}

function watchTask(task) {
    log.notice(task.name + ' WATCHING');
    let watcher = chokidar.watch(task.watch, {
        ignored: /(^|[\/\\])\../,
        ignoreInitial: true,
    });
    watcher.on('add', () => executeTask(task));
    watcher.on('change', () => executeTask(task));
    watcher.on('unlink', () => executeTask(task));
}
