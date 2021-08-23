<template>
	<div>
		<h1>Delta iOS Migration</h1>
		<p>
			This, if successful, generates a zip file with icons and record of all mapped android icons.
		</p>
		<div class="drawable">
			<div v-if="!loaded">
				Grabbing drawable.xml, appfilter.xml and iOS folder contents from Android...
			</div>
			<div v-else-if="error">
				There was an error grabbing the latest XML files from GitHub from GitHub.
			</div>
			<div v-else>
				All files loaded from GitHub, please proceed.
			</div>
		</div>
	</div>
	<router-link v-if="loaded & !error" to="processing">
		<button>Proceed</button>
	</router-link>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
	name: 'Index',
	data() {
		return {
			folderContents: [],
			loaded: false,
			error: false,
		}
	},
	methods: {
		...mapMutations([
			'setRawDrawable',
			'setRawAppFilter',
			'setRawMappedDrawables',
			'resetData',
		])
	},
	async mounted () {
		try{
			this.resetData()
			this.$store.state.apps = {}
			const drawableData = await fetch('https://raw.githubusercontent.com/Delta-Icons/android/master/app/src/main/res/xml/drawable.xml')
			const appFilterData = await fetch('https://raw.githubusercontent.com/Delta-Icons/android/master/app/src/main/res/xml/appfilter.xml')
			const mappedDrawables = await fetch('https://raw.githubusercontent.com/Delta-Icons/iOS/master/mapped_android_drawables.txt')
			const drawableXML = await drawableData.text()
			const appFilterXML = await appFilterData.text()
			const mappedDrawablesText = await mappedDrawables.text()
			this.setRawDrawable(drawableXML)
			this.setRawAppFilter(appFilterXML)
			this.setRawMappedDrawables(mappedDrawablesText)
			this.loaded = true
		} catch (e) {
			this.error = true
			this.loaded = true
		}
	},
}
</script>
