
export default function resetFilter(orders, filterKey) {
  let displayIndexList = []
  orders.forEach((order, index) => {
    const filterCond = {
        'all': true,
        'active': !order.stats.complete,
        'complete': order.stats.complete
    }
    if(filterCond[filterKey])
        displayIndexList.push(index) 
  })  

  return displayIndexList
}