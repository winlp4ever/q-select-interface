import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./_common.scss";
import App from './app/app';
import './behaviors';
import $ from 'jquery';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

var lastScrollTop = $(window).scrollTop();

$(window).on({
    scroll: (e) => {
        let n = $(window).scrollTop();
        if (n < 4) $('.menu').attr('class', 'menu init');
        else $('.menu').attr('class', 'menu');
        lastScrollTop = n; 
    }
})


function renderWeb() {
    ReactDOM.render(<App />, document.getElementById('main'));
}
renderWeb();


if (module.hot) {
    console.log('what fuct');
    module.hot.accept(
        [
            './app/app', 
        ], () => {
            console.log('what merde');
            renderWeb();
        }
    );
    module.hot.accept();
}