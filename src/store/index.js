import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

/*
	mapping: "drawable_name": {
		drawableName: "drawable_name",
		niceName: "Drawable App Name"
		packages: ["name.of.package", "more.optional.names"]
		bundleId: null <- this will be added if found
	}
*/

const defaultState = {
	rawDrawableXML: '',
	rawAppFilterXML: '',
	appMappings: {},
	index: 0,
	iOSApps: [],
}

const state = {...defaultState}

export default createStore({
	plugins: [createPersistedState()],
	state,
	mutations: {
		setRawDrawable(state, data) {
			state.rawDrawableXML = data
		},
		setRawAppFilter(state, data) {
			state.rawAppFilterXML = data
		},
		resetData (state) {
			Object.assign(state, defaultState)
		},
		setApps(state, data) {
			state.appMappings = data
		},
		setiOSApps(state, data) {
			state.iOSApps = data
		},
		setFolderContents(state, data) {
			state.folderContents = data
		},
		setMapping(state, data) {
			state.appMappings[data.drawableName].bundleId = data.bundleId
		},
		increaseIndex(state) {
			state.index += 1
		},
		decreaseIndex(state) {
			state.index -= 1
		},
		resetIndex(state) {
			state.index = 0
		},
	},
	actions: {
		mapApp({ commit }, data) {
			commit('setMapping', data)
		},
		prevPage({ commit }) {
			commit('decreaseIndex')
		},
		nextPage({ commit }) {
			commit('increaseIndex')
		}
	},
	getters: {
		apps(state) {
			return state.appMappings
		},
		iOSApps(state) {
			return state.iOSApps
		},
		getApp (state) {
			return (drawableName) => state.appMappings[drawableName]
		},
		rawDrawable(state) {
			return state.rawDrawableXML
		},
		rawAppFilter(state) {
			return state.rawAppFilterXML
		},
		index(state) {
			return state.index
		},
		maxIndex(state) {
			return Object.keys(state.appMappings).length
		},
	}
})
