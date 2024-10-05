import {applyMiddleware, Action, combineReducers, createStore, compose} from 'redux'
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import sidebarReducer from './sidebarReducer'
import userReducer from './userReducer'
import authReducer from './authReducer'
import {thunk, ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './appReducer'
import {ThunkDispatch} from 'redux-thunk'
import {AnyAction} from 'redux'

const thunkMiddleware = thunk

let rootReducer = combineReducers({
	dialogsPage: dialogsReducer,
	profilePage: profileReducer,
	sidebar: sidebarReducer,
	usersPage: userReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer
})

type RootReducerType = typeof rootReducer
export type  AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends {
	[keys: string]: (...args: any[]) =>
		infer U
} ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunkMiddleware)))
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>
export default store
