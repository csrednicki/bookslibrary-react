const fs = require('fs');

module.exports = {

    getData(fileName, type) {
        return new Promise((resolve, reject) => {
            fs.readFile(fileName, type, (err, data) => {
                //if has error reject, otherwise resolve
                return err ? reject(err) : resolve(data);
            });
        });
    },

    saveData(fileName, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, data, (err) => {
                //if has error reject, otherwise resolve
                return err ? reject(err) : resolve();
            });
        });
    },

    parseJson(result) {
        return JSON.parse(result.toString());
    }

};