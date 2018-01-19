import React from 'react';
import ReactDOM from 'react-dom';

function init(): void {

    let Main: any = require('./main').default; // see https://github.com/webpack/webpack-dev-server/issues/100
    ReactDOM.render(<Main />, document.getElementById('app'));

}

init();

// listen for HMR
if ( module.hot ) {
    module.hot.accept( './main', init );
}
