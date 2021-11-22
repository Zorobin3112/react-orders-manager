const data = 
{   database: {
        orders: {
            OD193000123: {
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
                    creatingDate: '2021/11/17',
                    completeDate: '2021/12/17',
                },
                prodIDs: ['P201500234']
            }
        },
        package: {
            PK193000123: {
                stats: {
                    selecting: [],
                    expanding: true,
                    editing: true,
                    completed: false,   
                },
                info: {
                    creatingDate: '2021/11/18',
                    price: 1000,
                    weight: 10,
                    note: 'pack note'
                },
                prodIDs: ['P201500234']
            }
        },
        prods: {
            P201500234: {
                stats: {
                    inStock: false
                },
                parents: {
                    orderID: 'OD193000123',
                    packageID: 'PK193000123'
                },
                info: {
                    name: 'Quan',
                    quantity: 1,
                    buyPrice: 1000,
                    sellPrice: 1100,
                    code: '123456789'
                }
            }
        }

    },
    formStats: {
        orderForm: {
            selectingIDs: [],
            expandingIDs: [],
            editingIDs: []
        },
        packageForm: {
            selectingIDs: [],
            expandingIDs: [],
            editingIDs: []
        }
    }
}