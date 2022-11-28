import {readFile, writeFile} from 'fs';
//let globalSettings = require('../globalSettings.json')

function getDefaultGlobalSettings() {
    return JSON.parse(readFile('../defaultGlobalSettings.json'))
}

function getGlobalSettings() {
    return JSON.parse(readFile('../globalSettings.json'));
}

function saveGlobalSettings(newGlobalSettings) {
    writeFile('../globalSettings.json', JSON.stringify(newGlobalSettings), 'utf8');
}

module.exports = {
    getDefaultGlobalSettings,
    getGlobalSettings,
    saveGlobalSettings
}

