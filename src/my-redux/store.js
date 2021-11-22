import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './slice'

export default configureStore({
    reducer: {
        store: orderReducer
    }
})