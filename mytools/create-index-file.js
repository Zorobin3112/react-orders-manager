const fs = require('fs');
const path = require('path');

let pathF = `${process.argv[2]}`
let mode = `${process.argv[3]}`

console.log(mode);

const pathList = {
    "-icon": './src/view/assets/icon',
    "-core": './src/view/components/Core',
    "-form": './src/view/components/Form',
    "-section": './src/view/components/Section',
}

const headerList = {
    "-icon": 'i_',
}

const folderPath = (pathList[pathF] !== undefined) ? 
    pathList[pathF]: pathF

const headerName = (headerList[pathF] !== undefined) ?
    headerList[pathF]: ''

    let indexData
if(!mode) {
    indexData = fs.readdirSync(folderPath).reduce((acc, file) => {
        const fileName = headerName + path.parse(file).name;
        return ((fileName !== 'index')&&(fileName !== 'styles')) ? 
            (acc + `export const ${fileName} = require('./${file}')\n`) : acc
    },'');
} 
else if(mode === '-m'){
    indexData = fs.readdirSync(folderPath).reduce((acc, file) => {
        const fileName = path.parse(file).name;
        return ((fileName !== 'index')&&(fileName !== 'styles')) ? 
            (acc + `export {default as ${fileName}} from './${file}'\n`) : acc
    },'');
}

fs.writeFileSync(folderPath +`/index.js`, indexData, 
    (err) => {
        if (err) throw err
    }
)
