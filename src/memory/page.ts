import type { Store } from 'vuex'

import index from './pages/page-index-store'

// ACTIVITY
export const pageIndexState: Page.IndexPageStore = index.state
export const pageIndexCommit: Function = index.commit
export const pageIndexDispatch: Function = index.dispatch