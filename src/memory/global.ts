import type { Store } from 'vuex'
import ui from './app/ui-store'
import ele from './app/ele-store'
import app from './app/app-store'
import auth from './user/auth-store'
import layout from './user/layout-store'

// UI
export const uiStore: Store<UiStore> = ui
export const uiState: UiStore = ui.state
export const uiGetters: ONE = ui.getters
export const uiCommit: Function = ui.commit
export const uiDispatch: Function = ui.dispatch
export const uiReFresh: (n: UI_STORE_FIELD, v: any) => void = 
    (n: UI_STORE_FIELD, v: any) => ui.dispatch('change', [ n, v ])

// APP
export const appStore: Store<AppStore> = app
export const appState: AppStore = app.state
export const appGetters: ONE = app.getters
export const appCommit: Function = app.commit
export const appDispatch: Function = app.dispatch
export const appReFresh: (n: APP_STORE_FIELD, v: any) => void = 
    (n: APP_STORE_FIELD, v: any) => app.dispatch('change', [ n, v ])

// AUTH
export const authStore: Store<AuthStore> = auth
export const authState: AuthStore = auth.state
export const authGetters: AuthGetters = auth.getters
export const authCommit: Function = auth.commit
export const authDispatch: Function = auth.dispatch
export const authReFresh: (n: AUTH_STORE_FIELD, v: any) => void = 
    (n: AUTH_STORE_FIELD, v: any) => auth.dispatch('change', [ n, v ])
    
// ELE
export const eleStore: Store<EleStore> = ele
export const eleState: EleStore = ele.state
export const eleGetters: ONE = ele.getters
export const eleCommit: Function = ele.commit
export const eleDispatch: Function = ele.dispatch
export const eleReFresh: (n: ELE_STORE_FIELD, v: any) => void = 
    (n: ELE_STORE_FIELD, v: any) => ele.dispatch('change', [ n, v ])

// LAYOUT
export const ulStore: Store<LayoutStore> = layout
export const ulState: LayoutStore = layout.state
export const ulGetters: ONE = layout.getters
export const ulCommit: Function = layout.commit
export const ulDispatch: Function = layout.dispatch
export const ulReFresh: (n: LAYOUT_STORE_FIELD, v: any) => void = 
    (n: LAYOUT_STORE_FIELD, v: any) => layout.dispatch('change', [ n, v ])
