import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';

function init() {

    ReactDOM.render(<Main />, document.getElementById('app'));

}

init();

/*
//cache all assets if browser supports serviceworker
if ('serviceWorker' in navigator && location.protocol === 'https:') {
 navigator.serviceWorker.register('/sw.js');
}

//add Google Analytics
window.ga = new GAnalytics('UA-XXXXXXXX-X');
*/
