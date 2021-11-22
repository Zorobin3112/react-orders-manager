import { createSlice } from "@reduxjs/toolkit"
import {    createInitData, 
            createInitOrder,
            createInitPackage,
            createInitProd } from "./template.js"
import copy from 'copy-to-clipboard'

export const orderSlice = createSlice({
    name: 'store',
    initialState: createInitData(),
    reducers: {
        //order form
        addOrder: ({database, pageStats}) => {
            const [orderID, newOrder] = createInitOrder()
            const [prodID, newProd] = createInitProd()

            newOrder.prodIDs.push(prodID)
            newProd.parents.orderID = orderID
            
            database.orders[orderID] = newOrder
            database.prods[prodID] = newProd

            pageStats.orderPage.expandingIDs.push(orderID)
            pageStats.orderPage.editingIDs.push(orderID)
        },
        addProd: ({database, pageStats}, action) => {
            const orderID = action.payload
            const order = database.orders[orderID]

            const [prodID, newProd] = createInitProd()
            order.prodIDs.push(prodID)
            newProd.parents.orderID = orderID
            database.prods[prodID] = newProd

            if(!order.stats.editing) {
                order.stats.editing = true
                pageStats.orderPage.editingIDs.push(orderID)
            }
            if(!order.stats.expanding) {
                order.stats.expanding = true
                pageStats.orderPage.expandingIDs.push(orderID)
            }
        },
        
        //Package
        addPackage: ({database, pageStats}) => {
            const [packageID, newPackage] = createInitPackage()
            
            database.packages[packageID] = newPackage

            pageStats.packagePage.expandingIDs.push(packageID)
            pageStats.packagePage.editingIDs.push(packageID)
        },
        pasteProdToPackage: ({database, pageStats}, action) => {
            const packageID = action.payload

            database.packages[packageID].prodIDs = [
                ...database.packages[packageID].prodIDs, 
                ...pageStats.prodClipboard
            ]
            pageStats.prodClipboard = []

            database.packages[packageID].prodIDs.forEach(prodID => {
                database.prods[prodID].parents.packageID = packageID
            })

            pageStats.packagePage.selectingIDs = 
                pageStats.packagePage.selectingIDs.filter(ID => ID !== packageID)
        },
        copyProdCode: ({database, pageStats}) => {
            if(pageStats.packagePage.selectingIDs.length !== 0) {
                const data = (pageStats.packagePage.selectingIDs.reduce((result, packageID) => {
                    const pack = database.packages[packageID]
                    const selectStat = pack.stats.selecting
                    pack.stats.selecting = []
                    return result + selectStat.reduce((acc, prodID) => {
                        return acc + database.prods[prodID].info.code + '\n'
                    }, '')
                }, ''))
                console.log(data);
                pageStats.packagePage.selectingIDs = []
                copy(data)
            }
        },
        //Order and package 
        changeItemInfo: ({database}, action) => {
            const [type, itemID, infoKey, value] = action.payload
            database[`${type}s`][itemID].info[infoKey] = value
        },

        toggleSelectItem: ({database, pageStats}, action) => {
            const [type, itemID] = action.payload
            const item = database[`${type}s`][itemID]
            const statsOfPage = pageStats[`${type}Page`]

            if(item.stats.selecting.length !== 0) {
                item.stats.selecting = []
                statsOfPage.selectingIDs = 
                    statsOfPage.selectingIDs.filter(ID => ID !== itemID)
            }
            else {
                item.stats.selecting = item.prodIDs
                    statsOfPage.selectingIDs.push(itemID)
            }
        },
        toggleCompletedItem: ({database}, action) => {
            const [type, itemID] = action.payload
            const item = database[`${type}s`][itemID]

            item.stats.completed = !item.stats.completed
        },
        toggleExpandingItem: ({database, pageStats}, action) => {
            const [type, itemID] = action.payload
            const item = database[`${type}s`][itemID]
            const statsOfPage = pageStats[`${type}Page`]

            if(!item.stats.expanding) {
                item.stats.expanding = true
                statsOfPage.expandingIDs.push(itemID)
            }
            else {
                item.stats.expanding = false
                statsOfPage.expandingIDs =
                    statsOfPage.expandingIDs.filter(ID => ID !== itemID)
            }
        },

        //Prod
        toggleSelectProd: ({database, pageStats}, action) => {
            const [type, prodID] = action.payload
            const prod = database.prods[prodID]
            const itemID = prod.parents[`${type}ID`]
            const item = database[`${type}s`][itemID]
            
            if(item.stats.selecting.length === 0) {
                item.stats.selecting.push(prodID)
                pageStats[`${type}Page`].selectingIDs.push(itemID)
            }
            else if(item.stats.selecting.includes(prodID)) {
                item.stats.selecting =
                    item.stats.selecting.filter(ID => ID !== prodID)
            }
            else {
                item.stats.selecting.push(prodID)
            }

            if(item.stats.selecting.length === 0) 
                pageStats[`${type}Page`].selectingIDs = 
                    pageStats[`${type}Page`].selectingIDs.filter(ID => ID !== itemID)
        },
        toggleInStockProd: ({database}, action) => {
            const prodID = action.payload
            const prod = database.prods[prodID]

            prod.stats.inStock = !prod.stats.inStock
        },

        //Footer
        toggleSelectAllItem: ({database, pageStats}, action) => {
            const pageName = action.payload
            const data = pageName === 'orderPage'? 
                database.orders: database.packages
            const stats = pageStats[pageName]

            if(stats.selectingIDs.length === 0) {
                Object.values(data).forEach(item => {
                    item.stats.selecting = item.prodIDs
                })
                stats.selectingIDs = Object.keys(data)
            }
            else {
                Object.values(data).forEach(item => {
                    item.stats.selecting = []
                })
                stats.selectingIDs = []
            }
        },
        toggleExpandAllItem: ({database, pageStats}, action) => {
            const pageName = action.payload
            const data = pageName === 'orderPage'? 
                database.orders: database.packages
            const stats = pageStats[pageName]

            if(stats.expandingIDs.length === 0) {
                Object.values(data).forEach(item => {
                    item.stats.expanding = true
                })
                stats.expandingIDs = Object.keys(data)
            }
            else {
                Object.values(data).forEach(item => {
                    item.stats.expanding = false
                })
                stats.expandingIDs = []
            }
        },
        toggleEditingMode: ({database, pageStats}, action) => {
            const pageName = action.payload
            const data = pageName === 'orderPage'? 
                database.orders: database.packages
            const stats = pageStats[pageName]

            if(stats.editingIDs.length === 0) {
                stats.selectingIDs.forEach(ID => {
                    data[ID].stats.editing = true
                    data[ID].stats.selecting = []
                })
                stats.editingIDs = stats.selectingIDs
                stats.selectingIDs = []
            }
            else {
                Object.values(data).forEach(item => {
                    item.stats.editing = false
                })
                stats.editingIDs = []
            }
        },
        deleteHandleForPackage: ({database, pageStats}, action) => {
            const packages = database.packages
            const prods = database.prods
            const packagePageStats = pageStats.packagePage

            packagePageStats.selectingIDs.forEach(packageID => {
                packages[packageID].prodIDs = 
                    packages[packageID].prodIDs.filter(prodID => {
                        const deleteCond = packages[packageID].stats.selecting.includes(prodID)
                        if(deleteCond)
                            prods[prodID].parents.packageID = ''
                        return !deleteCond
                    }
                    )
                packages[packageID].stats.selecting = []
                if(packages[packageID].prodIDs.length === 0) 
                    delete packages[packageID]
            })
            packagePageStats.selectingIDs = []
        },
        deleteHandleForOrder: ({database, pageStats}, action) => {
            const {orders, packages, prods} = database
            const orderPageStats = pageStats.orderPage

            orderPageStats.selectingIDs.forEach(orderID => {
                const order = orders[orderID]
                order.stats.selecting.forEach(prodID => {
                    const pack = packages[prods[prodID].parents.packageID]
                    pack.prodIDs = pack.prodIDs.filter(ID => ID !== prodID)
                    if(pack.prodIDs.length === 0) 
                        delete packages[prods[prodID].parents.packageID]

                    order.prodIDs = order.prodIDs.filter(ID => ID !== prodID)
                    
                    delete prods[prodID]
                })

                order.stats.selecting = []
                if(order.prodIDs.length === 0) 
                    delete orders[orderID]

            })
            orderPageStats.selectingIDs = []
        },
        copySelectingProd: ({database, pageStats}) => {
            const selectingProds = 
                pageStats.orderPage.selectingIDs.reduce((acc, orderID) => {
                    const newAcc = [...acc, ...database.orders[orderID].stats.selecting]
                    database.orders[orderID].stats.selecting = []
                    return newAcc
                }, [])
            pageStats.orderPage.selectingIDs = []
            pageStats.prodClipboard = selectingProds.filter(prodID => 
                database.prods[prodID].parents.packageID === ''
            )
            console.log('clip: ', pageStats.prodClipboard)
        }
    }
})

export const {  
    addOrder,
    addProd,
    addPackage,
    pasteProdToPackage,
    copyProdCode,
    changeItemInfo,
    toggleSelectItem,
    toggleCompletedItem,
    toggleExpandingItem,
    toggleSelectProd,
    toggleInStockProd,
    toggleSelectAllItem,
    toggleExpandAllItem,
    toggleEditingMode,
    copySelectingProd,
    deleteHandleForPackage,
    deleteHandleForOrder

} = orderSlice.actions

export default orderSlice.reducer