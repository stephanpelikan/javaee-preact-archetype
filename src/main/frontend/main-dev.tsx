import { h, render } from "preact";
import 'preact/debug';  // support devtools

let root: Element;
function init() {

    let Main: any = require('./main').default; // see https://github.com/webpack/webpack-dev-server/issues/100
    root = render(<Main />, document.body, root);

}

init();

// listen for HMR
if ( module.hot ) {
    module.hot.accept( './main', init );
}
