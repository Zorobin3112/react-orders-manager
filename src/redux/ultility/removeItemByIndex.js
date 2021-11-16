export default function removeItemByIndex(array, indexList) {
    let deletedItemNum = 0

    indexList.forEach(item => {
        array.splice(item-deletedItemNum, 1)
        deletedItemNum++
    });
}