import type { Store } from 'vuex'

import index from './pages/page-index-store'
import publish from './pages/page-publish-store'

// ACTIVITY
export const pageIndexState: Page.IndexPageStore = index.state
export const pageIndexCommit: Function = index.commit
export const pageIndexDispatch: Function = index.dispatch

// PUBLISH
export const pagePublishState: Page.PublishPageStore = publish.state
export const pagePublishDispatch: Function = publish.dispatch