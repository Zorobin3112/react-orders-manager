import { createSlice } from "@reduxjs/toolkit"
import copy from 'copy-to-clipboard'
import {    getDateNow, 
            resetAllProdSelect,
            removeItemByIndex,
            resetFilter   } from "./ultility"
import {createNewEmptyOrder, createNewEmptyProd } from "./template.js"

export const orderSlice = createSlice({
    name: 'store',
    initialState: {
        appStats: {
            select: [],
            editing: [],
            expanding: []
        },
        filter: {
            key: '',
            displayIndexList: []
        },
        orders: [],

    },
    reducers: {
        loadData: (state, action) => action.payload,
        createOrder: ({appStats, orders, filter}) => {
            orders.push(createNewEmptyOrder())
            const newOrderIndex = orders.length - 1
            appStats.editing.push(newOrderIndex)
            appStats.expanding.push(newOrderIndex)
            if(filter.key === 'all' || filter.key === 'active')
                filter.displayIndexList.push(newOrderIndex)
        },
        createProd: ({appStats, orders}, action) => {
            const [orderIndex] = action.payload
            const order = orders[orderIndex]
            order.prods.push(createNewEmptyProd())
        },
        toggleSelectProd: ({appStats, orders}, action) => {
            const [orderIndex, prodIndex] = action.payload
            const order = orders[orderIndex]
            const prod = order.prods[prodIndex]

            if(!prod.stats.select) {
                prod.stats.select = true
                order.stats.select.push(prodIndex)
                if(order.stats.select.length === 1)
                    appStats.select.push(orderIndex)
            }
            else {
                prod.stats.select = false
                order.stats.select = order.stats.select.filter(item => item !== prodIndex )
                if(order.stats.select.length === 0)
                    appStats.select = appStats.select.filter(item => item !== orderIndex )
            }
        },
        toggleSelectAllProd: ({appStats, orders}, action) => {
            const [orderIndex] = action.payload
            const order = orders[orderIndex]

            if(order.stats.select.length !== 0) {
                order.stats.select.forEach(prodIndex => {
                    order.prods[prodIndex].stats.select = false
                })
                order.stats.select = []
                appStats.select = appStats.select.filter(item => item !== orderIndex )
            }
            else {
                order.prods.forEach((prod, index) => {
                    prod.stats.select = true
                    order.stats.select.push(index)
                })
                appStats.select.push(orderIndex)
            }
        },
        toggleSelectAllOrder: ({appStats, orders}) => {
            if(appStats.select.length !== 0) {
                appStats.select.forEach(orderIndex => {
                    const order = orders[orderIndex]
                    if(order.stats.select.length !== 0) {
                        order.stats.select.forEach(prodIndex => {
                            order.prods[prodIndex].stats.select = false
                        })
                        order.stats.select = []
                    }
                })
                appStats.select = []
            }
            else orders.forEach((order, index) => {
                order.prods.forEach((prod, index) => {
                    prod.stats.select = true
                    order.stats.select.push(index)
                })
                appStats.select.push(index)
            })
        },
        toggleExpandOrder: ({appStats, orders}, action) => {
            const [orderIndex] = action.payload
            const order = orders[orderIndex]
            if(!order.stats.expanding) {
                order.stats.expanding = true
                appStats.expanding.push(orderIndex)
            }
            else {
                order.stats.expanding = false
                appStats.expanding = appStats.expanding.filter(item => item !== orderIndex)
            }
        },
        toggleExpandAllOrder: ({appStats, orders}) => {
            if(appStats.expanding.length !== 0) {
                appStats.expanding.forEach(orderIndex => {
                    orders[orderIndex].stats.expanding = false
                })
                appStats.expanding = []
            }
            else orders.forEach((order, index) => {
                order.stats.expanding = true
                appStats.expanding.push(index)
            })
        },
        toggleEditingMode: ({appStats, orders}) => {
            if(appStats.editing.length !== 0) {
                appStats.editing.forEach(orderIndex => {
                    orders[orderIndex].stats.editing = false
                })
                appStats.editing = []
            }
            else {
                appStats.select.forEach(orderIndex => {
                    orders[orderIndex].stats.editing = true
                    resetAllProdSelect(orders[orderIndex])
                    appStats.editing.push(orderIndex)
                })
                appStats.select = []
            }
        },
        
        deleteSelectedItem: ({appStats, orders, filter}) => {
            let orderRemoveIndexList = []
            if(appStats.select.length !== 0) {
                appStats.select.forEach(orderIndex => {
                    const order = orders[orderIndex]
                    if(order.stats.select.length === order.prods.length) {
                        orderRemoveIndexList.push(orderIndex)
                    }
                    else {
                        removeItemByIndex(order.prods, order.stats.select)
                        order.stats.select = []

                    }
                })
                removeItemByIndex(orders, orderRemoveIndexList)
                appStats.select = []
                appStats.editing = []
                appStats.expanding = []
                orders.forEach((order, index) => {
                    if(order.stats.editing) appStats.editing.push(index)
                    if(order.stats.expanding) appStats.expanding.push(index)
                })
                filter.displayIndexList = resetFilter(orders, filter.key)
            }
        },
        
        toggleComplete: ({appStats, orders, filter}, action) => {
            const [orderIndex] = action.payload
            const order = orders[orderIndex]

            order.stats.complete = !order.stats.complete
            if(order.stats.complete)
                order.displayData.completeDate = getDateNow()
            else
                order.displayData.completeDate = null

            if(filter.key !== 'all')
                filter.displayIndexList = 
                    filter.displayIndexList.filter(item => item !== orderIndex)
        },
        setOrderData: ({appStats, orders}, action) => {
            const [orderIndex, dataKey, data] = action.payload
            const order = orders[orderIndex]

            order.displayData[dataKey] = data
        },
        setProdData: ({appStats, orders}, action) => {
            const [orderIndex, prodIndex, dataKey, data] = action.payload
            const order = orders[orderIndex]
            const prod = order.prods[prodIndex]

            prod.displayData[dataKey] = data
        },
        copyToClipboardPostCode: ({appStats, orders}) => {
            if(appStats.select.length !== 0) {
                const data = (appStats.select.reduce((result, orderIndex) => {
                    const order = orders[orderIndex]
                    const selectStat = order.stats.select
                    resetAllProdSelect(orders[orderIndex])
                    return result + selectStat.reduce((resultOfOrder, prodIndex) => {
                        return resultOfOrder + order.prods[prodIndex].displayData.postCode + '\n'
                    }, '')
                }, ''))
                console.log(data);
                appStats.select = []
                copy(data)
            }
        },
        setFilter: ({appStats, orders, filter}, action) => {
            const filterKey = action.payload
            filter.displayIndexList = resetFilter(orders, filterKey)
            filter.key = filterKey
        }
    }
})

export const {  
    loadData,
    createOrder, 
    createProd, 
    toggleSelectProd,
    toggleSelectAllProd,
    toggleSelectAllOrder,
    toggleExpandOrder,
    toggleExpandAllOrder,
    toggleEditingMode,
    deleteSelectedItem,
    toggleComplete,
    setOrderData,
    setProdData,
    copyToClipboardPostCode,
    setFilter

} = orderSlice.actions

export default orderSlice.reducer