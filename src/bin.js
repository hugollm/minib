const exec = require('child_process').exec;

const log = require('./log');
const tasks = require(process.cwd() + '/minib.config.js');


main();

function main() {
    build();
}

function build() {
    for (let name in tasks) {
        tasks[name].name = name;
        handleTask(tasks[name]);
    }
}

function handleTask(task) {
    if (task.after)
        scheduleTask(task);
    else
        executeTask(task);
}

function scheduleTask(task) {
    log.debug(task.name + ' SCHEDULED');
    process.on('OK:' + task.after, () => executeTask(task));
}

function executeTask(task) {
    log.debug(task.name + ' RUNNING');
    exec(task.build, (error, stdout, stderr) => {
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
