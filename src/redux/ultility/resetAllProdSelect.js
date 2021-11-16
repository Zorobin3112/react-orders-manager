
export default function resetAllProdSelect(order) {
  order.stats.select.forEach(prodIndex => {
    order.prods[prodIndex].stats.select = false
  })
  order.stats.select = []
}