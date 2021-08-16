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
	rawMappedDrawables: '',
	appMappings: {},
	alreadyMapped: [],
	index: 0,
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
		setRawMappedDrawables(state, data) {
			state.rawMappedDrawables = data
		},
		resetData (state) {
			Object.assign(state, defaultState)
		},
		setApps(state, data) {
			state.appMappings = data
		},
		setAlreadyMapped(state, data) {
			state.alreadyMapped = data
		},
		mapApp(state, data) {
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
		getApp (state) {
			return (drawableName) => state.appMappings[drawableName]
		},
		rawDrawable(state) {
			return state.rawDrawableXML
		},
		rawAppFilter(state) {
			return state.rawAppFilterXML
		},
		rawMappedDrawables(state) {
			return state.rawMappedDrawables
		},
		alreadyMapped(state) {
			return state.alreadyMapped
		},
		index(state) {
			return state.index
		},
		maxIndex(state) {
			return Object.keys(state.appMappings).length
		},
	}
})
