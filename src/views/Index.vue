<template>
	<div>
		<h1>Delta iOS Migration</h1>
		<p>
			This, if successful, generates a renaming script for icons for bash / cmd.
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
		Proceed
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
			'setiOSApps',
			'resetData',
		])
	},
	async mounted () {
		try{
			this.resetData()
			this.$store.state.apps = {}
			const drawableData = await fetch('https://raw.githubusercontent.com/Delta-Icons/android/master/app/src/main/res/xml/drawable.xml')
			const appFilterData = await fetch('https://raw.githubusercontent.com/Delta-Icons/android/master/app/src/main/res/xml/appfilter.xml')
			const iconBundles = await fetch('https://api.github.com/repos/delta-icons/iOS/contents/Library/Themes/Delta%20Icons.theme/IconBundles')
			const drawableXML = await drawableData.text()
			const appFilterXML = await appFilterData.text()
			const iconBundlesArray = await iconBundles.json()
			const iOSpackages = iconBundlesArray.map(icon => icon.name.replace('-large.png'))
			this.setRawDrawable(drawableXML)
			this.setRawAppFilter(appFilterXML)
			this.setiOSApps(iOSpackages)
			this.loaded = true
		} catch (e) {
			this.error = true
			this.loaded = true
		}
	},
}
</script>
