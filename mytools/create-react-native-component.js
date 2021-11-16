const fs = require('fs')
const path = require('path')

const componentFolder = `./src/view/components/${process.argv[2]}`
const componentName = process.argv[3]
const camelCaseName = componentName.charAt(0).toLowerCase() + componentName.slice(1)



//Create Folder
fs.mkdirSync(componentFolder, { recursive: true }, 
    (err) => {
        if (err) throw err
    }
);

fs.mkdirSync(componentFolder+'/styles', { recursive: true }, 
    (err) => {
        if (err) throw err
    }
);

//Create components file
const componentJsData = 
`import React from 'react'
import styles from './styles/${componentName}.module.css'

export default function ${componentName}() {
    
    return (
        <div className={styles.container}>

        </div>
  )
}
`

fs.writeFileSync(componentFolder +`/${componentName}.js`, componentJsData, 
    (err) => {
        if (err) throw err
    }
)

//Create style file
const componentStyleData = 
`.container {
    
}
`

fs.writeFileSync(componentFolder +`/styles/${componentName}.module.css`, componentStyleData, 
    (err) => {
        if (err) throw err
    }
)