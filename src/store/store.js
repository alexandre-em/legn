import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { authReducer } from './reducers'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
    auth: authReducer
})

const persistConfig = {
    key: 'auth',
    storage: storage
}

const pReducer = persistReducer(persistConfig, reducers)

const middleware = window.navigator.userAgent.includes('Chrome') ?
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    : compose(applyMiddleware(thunk))
const store = createStore(pReducer, middleware)

const persistor = persistStore(store)

export { store, persistor }
