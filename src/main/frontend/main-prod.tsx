import { h, render } from "preact";
import Main from './main';

let root: Element;
function init() {

    root = render(<Main />, document.body, root);

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
