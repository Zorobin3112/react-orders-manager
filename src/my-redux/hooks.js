import { useSelector, useDispatch } from 'react-redux'

export function useMyStore() {
    const orders = useSelector(state => state.store.database.orders) 
    const packages = useSelector(state => state.store.database.packages) 
    const prods = useSelector(state => state.store.database.prods) 

    const prodClipboard = useSelector(state => state.store.pageStats.prodClipboard) 
    const orderPageStats = useSelector(state => state.store.pageStats.orderPage) 
    const packagePageStats = useSelector(state => state.store.pageStats.packagePage) 

    const dispatch = useDispatch()

    return {orders, packages, prods, prodClipboard, orderPageStats, packagePageStats, dispatch}
}