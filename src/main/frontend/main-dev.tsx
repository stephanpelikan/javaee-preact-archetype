import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Main from './main';

function init(Component: any): void {

    ReactDOM.render(<AppContainer><Component /></AppContainer>, document.getElementById('app'));

}

init(Main);

// listen for HMR
if ( module.hot ) {
    module.hot.accept( './main', () => { init(Main) } );
}
