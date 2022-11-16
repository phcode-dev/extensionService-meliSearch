import * as fs from "fs";

let APP_CONFIG = null;

export function getConfigs() {
    if (APP_CONFIG) {
        return APP_CONFIG;
    }
    if (!process.env.APP_CONFIG) {
        throw new Error('Please provide valid app config file by setting APP_CONFIG environment variable' +
            ' for example APP_CONFIG=./abc.json');
    }
    APP_CONFIG = _getAppConfig(process.env.APP_CONFIG);
    APP_CONFIG.port = APP_CONFIG.port || '5000';
    return APP_CONFIG;
}

function _getAppConfig(file) {
    const appConfigFile = fs.readFileSync(file);
    return JSON.parse(appConfigFile.toString());
}

export function deleteAppConfig() {
    APP_CONFIG = null;
}
