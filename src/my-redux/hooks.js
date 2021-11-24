import { useSelector, useDispatch } from 'react-redux'

export function useMyStore() {
    const myStore = useSelector(state => state.store)
    const orders = useSelector(state => state.store.database.orders) 
    const packages = useSelector(state => state.store.database.packages) 
    const prods = useSelector(state => state.store.database.prods) 

    const prodClipboard = useSelector(state => state.store.pageStats.prodClipboard) 
    const orderPageStats = useSelector(state => state.store.pageStats['/order']) 
    const packagePageStats = useSelector(state => state.store.pageStats['/package']) 
    const report = useSelector(state => state.store.report)
    const dispatch = useDispatch()

    const activeOrderKey = Object.keys(orders).filter(ID => !orders[ID].stats.completed)
    const completedOrderKey = Object.keys(orders).filter(ID => orders[ID].stats.completed)
    const activePackageKey = Object.keys(packages).filter(ID => !packages[ID].stats.completed)
    const completedPackageKey = Object.keys(packages).filter(ID => packages[ID].stats.completed)

    return {myStore,
            orders, 
            packages, 
            prods, 
            prodClipboard, 
            orderPageStats, 
            packagePageStats, 
            report,
            activeOrderKey,
            completedOrderKey,
            activePackageKey,
            completedPackageKey,
            dispatch}
}