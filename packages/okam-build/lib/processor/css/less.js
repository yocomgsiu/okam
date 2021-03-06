/**
 * @file The less processor
 * @author sparklewhy@gmail.com
 */

'use strict';

const path = require('path');
const less = require('less');
const relative = require('../../util').file.relative;

module.exports = function (file, options) {
    let {logger, config, root} = options;

    // init config
    config = Object.assign({
        filename: path.basename(file.fullPath),
        syncImport: true,
        relativeUrls: true
    }, config);

    // init the paths info for less find
    let confPaths = config.paths || [];
    [file.dirname, root].forEach(item => {
        if (confPaths.indexOf(item) === -1) {
            confPaths.push(item);
        }
    });
    config.paths = confPaths;

    let processResult = {};
    less.render(file.content.toString(), config, (err, result) => {
        if (err) {
            logger.error(`parse less file ${file.path} fail:`, err);
            throw err;
        }
        processResult.content = result.css;

        // normalize dep path relative to root
        let deps = result.imports;
        if (deps) {
            deps = deps.map(
                item => relative(path.join(
                    path.dirname(file.fullPath),
                    item
                ), root)
            );
        }

        processResult.deps = deps;
    });
    return processResult;
};
