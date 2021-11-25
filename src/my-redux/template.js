import { getDateOfNow, createID } from './utils'

export function createInitData() {
    return {   
        database: {
            orders: {},
            packages: {},
            prods: {},
        },
        pageStats: {
            prodClipboard: [],
            "/order": {
                selectingIDs: [],
                expandingIDs: [],
                editingIDs: []
            },
            "/package": {
                selectingIDs: [],
                expandingIDs: [],
                editingIDs: []
            }
        },
        report: {
            resetDate: getDateOfNow(),
            orderTotal: 0,
            buyTotalPrice: 0,
            sellTotalPrice: 0,
            packageTotal: 0,
            postTotalPrice: 0
        }
    }
}

export function createInitOrder() {
    const id = createID('OD')
    const value = {
        stats: {
            selecting: [],
            expanding: true,
            editing: true,
            completed: false, 
            reported: false, 
        },
        info: {
            customerName: '',
            total: 0,
            note: '',
            creatingDate: getDateOfNow(),
            completeDate: '',
        },
        prodIDs: []
    }

    return [id, value]
}

export function createInitPackage() {
    const id = createID('PK')
    const value = {
        stats: {
            selecting: [],
            expanding: true,
            editing: true,
            completed: false,  
            reported: false,  
        },
        info: {
            creatingDate: getDateOfNow(),
            price: 0,
            weight: 0,
            note: 'pack note'
        },
        prodIDs: []
    } 

    return [id, value]
}

export function createInitProd() {
    const id = createID('PD')
    const value = {
        stats: {
            inStock: false
        },
        parents: {
            orderID: '',
            packageID: ''
        },
        info: {
            name: '',
            quantity: 0,
            buyPrice: 0,
            sellPrice: 0,
            code: ''
        }
    }

    return [id, value]
}
