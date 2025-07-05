import type { Store } from 'vuex'

import cart from './pages/page-cart-store'
import index from './pages/page-index-store'
import publish from './pages/page-publish-store'

// ACTIVITY
export const pageIndexState: Page.IndexPageStore = index.state
export const pageIndexCommit: Function = index.commit
export const pageIndexDispatch: Function = index.dispatch

// PUBLISH
export const pagePublishState: Page.PublishPageStore = publish.state
export const pagePublishDispatch: Function = publish.dispatch

// CART
export const pageCartState: Page.CartPageStore = cart.state
export const pageCartDispatch: Function = cart.dispatch