/**
 * @file The toutiao mini program env
 * @author sparklewhy@gmail.com
 */

'use strict';

/* global self:false */
/* global window:false */
/* global tt:false */
/* global getApp:false */
/* global getCurrentPages:false */

import globalAPI from './api';

/**
 * The native app global object
 *
 * @type {Object}
 */
export const appGlobal = (function getGlobal() {
    /* istanbul ignore next */
    if (typeof self === 'object' && self) {
        return self;
    }

    return Function('return this')();
})() || {};

/**
 * The native env variable
 *
 * @return {Object}
 */
export const appEnv = tt;

/**
 * The native env api
 *
 * @type {Object}
 */
export const api = globalAPI;

/**
 * Get current app instance
 *
 * @return {Object}
 */
export function getCurrApp() {
    return getApp();
}

/**
 * Get current opened pages stack
 *
 * @return {Array}
 */
export function getCurrPages() {
    return getCurrentPages();
}

