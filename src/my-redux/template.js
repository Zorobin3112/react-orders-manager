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
            orderPage: {
                selectingIDs: [],
                expandingIDs: [],
                editingIDs: []
            },
            packagePage: {
                selectingIDs: [],
                expandingIDs: [],
                editingIDs: []
            }
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
        },
        info: {
            customerName: 'Khanh',
            total: 0,
            note: 'order note',
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
        },
        info: {
            creatingDate: getDateOfNow(),
            price: 1000,
            weight: 10,
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
            name: 'Quan',
            quantity: 1,
            buyPrice: 1000,
            sellPrice: 1100,
            code: '123456789'
        }
    }

    return [id, value]
}
