import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { store } from './utils/store_config'

import 'semantic-ui-css/semantic.min.css';

var isChromium = window.chrome;
var winNav = window.navigator;
var vendorName = winNav.vendor;
var isOpera = typeof window.opr !== "undefined";
var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
var isIOSChrome = winNav.userAgent.match("CriOS");

if (isIOSChrome) {
   console.log('is Google Chrome on IOS');
} else if(
  isChromium !== null &&
  typeof isChromium !== "undefined" &&
  vendorName === "Google Inc." &&
  isOpera === false &&
  isIEedge === false
) {

   var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
   let version = parseInt(raw[2], 10);
   if(version >= 89){
     console.log('valid chrome');
   }else{
     console.log('invalid chrome');
   }
   console.log('is Google Chrome; ', version);
} else { 
  console.log('not Google Chrome');
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
