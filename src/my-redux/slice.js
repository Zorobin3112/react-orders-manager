import { createSlice } from "@reduxjs/toolkit"
import {    createInitData, 
            createInitOrder,
            createInitPackage,
            createInitProd } from "./template.js"
import copy from 'copy-to-clipboard'
import { getTotalPriceOrder, getDateOfNow } from '$my-redux/utils'

export const orderSlice = createSlice({
    name: 'store',
    initialState: createInitData(),
    reducers: {
        loadData: (state, action) => action.payload,
        //order form
        addOrder: ({database, pageStats}) => {
            const [orderID, newOrder] = createInitOrder()
            const [prodID, newProd] = createInitProd()

            newOrder.prodIDs.push(prodID)
            newProd.parents.orderID = orderID
            
            database.orders[orderID] = newOrder
            database.prods[prodID] = newProd

            pageStats['/order'].expandingIDs.push(orderID)
            pageStats['/order'].editingIDs.push(orderID)
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
                pageStats['/order'].editingIDs.push(orderID)
            }
            if(!order.stats.expanding) {
                order.stats.expanding = true
                pageStats['/order'].expandingIDs.push(orderID)
            }
        },
        
        //Package
        addPackage: ({database, pageStats}) => {
            const [packageID, newPackage] = createInitPackage()
            
            database.packages[packageID] = newPackage

            pageStats['/package'].expandingIDs.push(packageID)
            pageStats['/package'].editingIDs.push(packageID)
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

            pageStats['/package'].selectingIDs = 
                pageStats['/package'].selectingIDs.filter(ID => ID !== packageID)
        },
        copyProdCode: ({database, pageStats}) => {
            if(pageStats['/package'].selectingIDs.length !== 0) {
                const data = (pageStats['/package'].selectingIDs.reduce((result, packageID) => {
                    const pack = database.packages[packageID]
                    const selectStat = pack.stats.selecting
                    pack.stats.selecting = []
                    return result + selectStat.reduce((acc, prodID) => {
                        return acc + database.prods[prodID].info.code + '\n'
                    }, '')
                }, ''))
                pageStats['/package'].selectingIDs = []
                copy(data)
            }
        },
        //Order and package 
        changeItemInfo: ({database}, action) => {
            const [path, itemID, infoKey, value] = action.payload
            const items = path === '/order'? database.orders: database.packages
            items[itemID].info[infoKey] = value
        },

        toggleSelectItem: ({database, pageStats}, action) => {
            const [path, itemID] = action.payload
            const items = path === '/order'? database.orders: database.packages
            const statsOfPage = pageStats[path]

            if(items[itemID].stats.selecting.length !== 0) {
                items[itemID].stats.selecting = []
                statsOfPage.selectingIDs = 
                    statsOfPage.selectingIDs.filter(ID => ID !== itemID)
            }
            else {
                items[itemID].stats.selecting = items[itemID].prodIDs
                    statsOfPage.selectingIDs.push(itemID)
            }
        },
        toggleCompletedItem: ({database}, action) => {
            const [path, itemID] = action.payload
            const items = path === '/order'? database.orders: database.packages

            items[itemID].stats.completed = !items[itemID].stats.completed
        },
        toggleExpandingItem: ({database, pageStats}, action) => {
            const [path, itemID] = action.payload
            const items = path === '/order'? database.orders: database.packages
            const statsOfPage = pageStats[path]

            if(!items[itemID].stats.expanding) {
                items[itemID].stats.expanding = true
                statsOfPage.expandingIDs.push(itemID)
            }
            else {
                items[itemID].stats.expanding = false
                statsOfPage.expandingIDs =
                    statsOfPage.expandingIDs.filter(ID => ID !== itemID)
            }
        },

        //Prod
        changeProdInfo: ({database}, action) => {
            const [prodID, infoKey, value] = action.payload
            database.prods[prodID].info[infoKey] = value
        },
        toggleSelectProd: ({database, pageStats}, action) => {
            const [path, prodID] = action.payload
            const prod = database.prods[prodID]
            const itemID = path === '/order'? prod.parents.orderID: prod.parents.packageID
            const items = path === '/order'? database.orders: database.packages
            const statsOfPage = pageStats[path]
            
            if(items[itemID].stats.selecting.length === 0) {
                items[itemID].stats.selecting.push(prodID)
                statsOfPage.selectingIDs.push(itemID)
            }
            else if(items[itemID].stats.selecting.includes(prodID)) {
                items[itemID].stats.selecting =
                    items[itemID].stats.selecting.filter(ID => ID !== prodID)
            }
            else {
                items[itemID].stats.selecting.push(prodID)
            }

            if(items[itemID].stats.selecting.length === 0) 
                statsOfPage.selectingIDs = 
                    statsOfPage.selectingIDs.filter(ID => ID !== itemID)
        },
        toggleInStockProd: ({database}, action) => {
            const prodID = action.payload
            const prod = database.prods[prodID]

            prod.stats.inStock = !prod.stats.inStock
        },

        //Footer
        toggleSelectAllItem: ({database, pageStats}, action) => {
            const pathname = action.payload
            const data = pathname === '/order'? 
                database.orders: database.packages
            const stats = pageStats[pathname]

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
            const pathname = action.payload
            const data = pathname === '/order'? 
                database.orders: database.packages
            const stats = pageStats[pathname]

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
            const pathname = action.payload
            const data = pathname === '/order'? 
                database.orders: database.packages
            const stats = pageStats[pathname]

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
            const packagePageStats = pageStats['/package']

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
                if(packages[packageID].prodIDs.length === 0) {
                    packagePageStats.selectingIDs = []
                    packagePageStats.expandingIDs = 
                        packagePageStats.expandingIDs.filter(ID => ID !== packageID)
                    packagePageStats.editingIDs = 
                        packagePageStats.editingIDs.filter(ID => ID !== packageID)
                    delete packages[packageID]
                }
            })
            packagePageStats.selectingIDs = []
        },
        deleteHandleForOrder: ({database, pageStats}) => {
            const {orders, packages, prods} = database
            const orderPageStats = pageStats['/order']
            const packagePageStats = pageStats['/package']

            orderPageStats.selectingIDs.forEach(orderID => {
                const order = orders[orderID]
                order.stats.selecting.forEach(prodID => {
                    const packageID = prods[prodID].parents.packageID
                    const pack = packages[packageID]
                    if(pack){
                        pack.prodIDs = pack.prodIDs.filter(ID => ID !== prodID)
                        if(pack.prodIDs.length === 0) {
                            packagePageStats.selectingIDs = []
                            packagePageStats.expandingIDs = 
                                packagePageStats.expandingIDs.filter(ID => ID !== packageID)
                            packagePageStats.editingIDs = 
                                packagePageStats.editingIDs.filter(ID => ID !== packageID)
                            delete packages[prods[prodID].parents.packageID]
                        }
                    }
                    order.prodIDs = order.prodIDs.filter(ID => ID !== prodID)
                    delete prods[prodID]
                })
                order.stats.selecting = []
                if(order.prodIDs.length === 0) {
                    orderPageStats.expandingIDs = 
                        orderPageStats.expandingIDs.filter(ID => ID !== orderID)
                    orderPageStats.editingIDs = 
                        orderPageStats.editingIDs.filter(ID => ID !== orderID)
                    delete orders[orderID]
                }

            })
            orderPageStats.selectingIDs = []
        },
        copySelectingProd: ({database, pageStats}) => {
            const selectingProds = 
                pageStats['/order'].selectingIDs.reduce((acc, orderID) => {
                    const newAcc = [...acc, ...database.orders[orderID].stats.selecting]
                    database.orders[orderID].stats.selecting = []
                    return newAcc
                }, [])
            pageStats['/order'].selectingIDs = []
            pageStats.prodClipboard = selectingProds.filter(prodID => 
                database.prods[prodID].parents.packageID === ''
            )
        },

        updateReport: (state) => {
            const {database, report} = state
            const orderKeyArray = Object.keys(database.orders)
            const packageKeyArray = Object.keys(database.packages)

            let newReport = packageKeyArray.reduce((total, packageID) => {
                const reportCond = database.packages[packageID].stats.completed&&
                                    !database.packages[packageID].stats.reported
                if(reportCond) {
                    total.packageTotal++
                    total.postTotalPrice = total.postTotalPrice + Number(database.packages[packageID].info.price)
                    database.packages[packageID].stats.reported = true
                }
                return total
            }, report)

            newReport = orderKeyArray.reduce((total, orderID) => {
                const reportCond = database.orders[orderID].stats.completed&&
                                    !database.orders[orderID].stats.reported
                if(reportCond) {
                    const addTotal = getTotalPriceOrder(database.orders[orderID], database.prods)
                    total.orderTotal++
                    total.buyTotalPrice = total.buyTotalPrice + addTotal.buyTotalPrice
                    total.sellTotalPrice = total.sellTotalPrice + addTotal.sellTotalPrice

                    database.orders[orderID].stats.reported = true
                }
                return total
            }, newReport)
            
            state.report = newReport
        },
        deleteReportedItem: ({database: {orders, packages, prods}, pageStats}) => {
            Object.keys(orders).forEach(orderID => {
                if(orders[orderID].stats.reported) {
                    orders[orderID].prodIDs.forEach(prodID => {
                        delete prods[prodID]
                    })
                    pageStats['/order'].selectingIDs = 
                        pageStats['/order'].selectingIDs.filter(ID => ID !== orderID)
                    pageStats['/order'].editingIDs = 
                        pageStats['/order'].editingIDs.filter(ID => ID !== orderID)
                    pageStats['/order'].expandingIDs = 
                        pageStats['/order'].expandingIDs.filter(ID => ID !== orderID)
                    delete orders[orderID]
                }
            })

            Object.keys(packages).forEach(packageID => {
                if(packages[packageID].stats.reported) {
                    pageStats['/package'].selectingIDs = 
                        pageStats['/package'].selectingIDs.filter(ID => ID !== packageID)
                    
                    pageStats['/package'].editingIDs = 
                        pageStats['/package'].editingIDs.filter(ID => ID !== packageID)
                    
                    pageStats['/package'].expandingIDs = 
                        pageStats['/package'].expandingIDs.filter(ID => ID !== packageID)
                    
                    delete packages[packageID]
                }
            })
        },
        resetReport: ({report}) => {
            report.resetDate = getDateOfNow()
            report.orderTotal = 0
            report.buyTotalPrice = 0
            report.sellTotalPrice = 0
            report.packageTotal = 0
            report.postTotalPrice = 0
        },

        resetSelectingStats: ({database, pageStats}, action) => {
            const path = action.payload
            const itemPageStats = pageStats[path]

            itemPageStats.selectingIDs.forEach(orderID => {
                database.orders[orderID].stats.selecting = []
            })
            itemPageStats.selectingIDs = []
        }
    }
})

export const {  
    loadData,
    addOrder,
    addProd,
    addPackage,
    pasteProdToPackage,
    copyProdCode,
    changeItemInfo,
    toggleSelectItem,
    toggleCompletedItem,
    toggleExpandingItem,
    changeProdInfo,
    toggleSelectProd,
    toggleInStockProd,
    toggleSelectAllItem,
    toggleExpandAllItem,
    toggleEditingMode,
    copySelectingProd,
    deleteHandleForPackage,
    deleteHandleForOrder,
    updateReport,
    deleteReportedItem,
    resetReport,
    resetSelectingStats

} = orderSlice.actions

export default orderSlice.reducer