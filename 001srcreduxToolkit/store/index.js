import { configureStore } from "@reduxjs/toolkit"
import reduxThunk from 'redux-thunk'
import taskSliceReducer from './features/taskSlice';
import reduxPromise from 'redux-promise'
import reduxLogger from 'redux-logger'
const store = configureStore({
    // appoint reducer
    reducer:{
        // Manage reducers exported from various slices by module
        task:taskSliceReducer
    },
    /*  If we do not specify any middleware, 
    the reduxThunk is integrated by default. 
    However, once set, the default value will be replaced as a whole, 
    and the thunk middleware needs to be manually specified */
    middleware:[reduxLogger,reduxThunk,reduxPromise]

})

export default store