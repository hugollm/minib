listenForChanges();

function listenForChanges() {
    let socket = io({ path: '/_reload/server' });
    socket.on('connect', socket =>  console.warn('Connected to reload server.'));
    socket.on('reload:page', reloadPage);
    socket.on('reload:styles', reloadStyles);
}

function reloadPage() {
    window.location.reload();
}

function reloadStyles() {
    let styles = document.querySelectorAll('link[rel=stylesheet]');
    styles.forEach(style => style.href = style.href);
}
