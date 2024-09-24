import {applyMiddleware, combineReducers, createStore, compose} from 'redux'
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import sidebarReducer from './sidebarReducer'
import userReducer from './userReducer'
import authReducer from './authReducer'
import {thunk} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './appReducer'

const thunkMiddleware = thunk

let reducers = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    sidebar: sidebarReducer,
    usersPage: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)))

export default store
