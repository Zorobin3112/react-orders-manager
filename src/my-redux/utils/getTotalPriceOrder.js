
export default function getTotalPriceOrder(order, prods) {
    return order.prodIDs.reduce((total, prodID) => {
        total.buyTotalPrice = total.buyTotalPrice + Number(prods[prodID].info.buyPrice)
        total.sellTotalPrice = total.sellTotalPrice + Number(prods[prodID].info.sellPrice)
        return total
    }, {
        buyTotalPrice: 0,
        sellTotalPrice: 0
    })

}