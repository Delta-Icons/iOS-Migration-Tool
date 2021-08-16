<template>
	<div>
		<h1>Processing</h1>
	</div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

// let matches = []
const domp = new DOMParser()

export default {
	name: 'Processing',
	computed: {
		...mapGetters([
			'rawDrawable',
			'rawMappedDrawables',
			'alreadyMapped',
			'iOSApps',
			'apps'
		])
	},
	methods: {
		...mapMutations([
			'setApps',
			'setAlreadyMapped',
			'resetIndex',
		]),
		...mapActions([
			'mapApp'
		]),
		parseNumberFromWord(input){
			const words = {
				'ninety': 90,
				'eighty': 80,
				'seventy': 70,
				'sixty': 60,
				'fifty': 50,
				'forty': 40,
				'thirty': 30,
				'twenty': 20,
				'nineteen': 19,
				'eighteen': 18,
				'seventeen': 17,
				'sixteen': 16,
				'fifteen': 15,
				'fourteen': 14,
				'thirteen': 13,
				'twelve': 12,
				'eleven': 11,
				'ten': 10,
				'nine': 9,
				'eight': 8,
				'seven': 7,
				'six': 6,
				'five': 5,
				'four': 4,
				'three': 3,
				'two': 2,
				'one': 1,
			}
			let sum = 0
			for (const [word, value] of Object.entries(words)){
				if (input.indexOf(word) > -1) sum += value
			}
			return sum
		}
	},
	mounted() {
		let appData = {}
		this.setApps({})
		this.setAlreadyMapped(this.rawMappedDrawables.split(/\r?\n/))
		this.resetIndex()
		if (this.rawDrawable.length) {
			let drawableName, altName, altNum
			const appFilterXML = domp.parseFromString(this.$store.getters.rawAppFilter, 'text/xml')
			const drawableXML = domp.parseFromString(this.$store.getters.rawDrawable, 'text/xml')
			for (const x of drawableXML.querySelectorAll('item')) {
				if (x.getAttribute('name')) {
					drawableName = x.getAttribute('drawable')
					if (this.alreadyMapped.includes(drawableName)) continue
					if(drawableName.indexOf('_alt') == -1) {
						// match the drawable attributes to get all package ids mapped to a drawable
						let appFilters = [...appFilterXML.querySelectorAll(`[drawable="${drawableName}"]`)]
						appFilters = appFilters.map(y => {
							const component = y.getAttribute('component')
							return component.substring(14, component.indexOf('/'))
						})
						if(appData[drawableName] == null) {
							// add icon as new one
							appData[drawableName] = {
								niceName: x.getAttribute('name'),
								packages: appFilters
							}
						} else {
							// if somehow an alt got added before the main icon
							appData[drawableName] = {
								niceName: x.getAttribute('name'),
								packages: appFilters,
								...appData[drawableName]
							}
						}
					} else {
						altName = drawableName
						const suffixPos = drawableName.indexOf('_alt')
						const altSuffix = drawableName.substring(suffixPos + 4)
						if (altSuffix == '' || altSuffix == '_one') {
							altNum = 1
						} else {
							altNum = this.parseNumberFromWord(altSuffix)
						}
						drawableName = drawableName.substring(0, suffixPos)
						// Only add alts property, the rest will be filled up by the regular icon
						if (!appData[drawableName]){
							appData[drawableName] = {
								alts: {}
							}
						} else if (appData[drawableName].alts == null) {
							appData[drawableName].alts = {}
						}
						appData[drawableName].alts[altNum] = altName
					}
				}
			}
			this.setApps(appData)
			console.log(this.apps);
			this.$router.push('/package/' + Object.keys(appData)[0])
		} else {
			// this.$router.push('/')
		}
	},
}
</script>

<style></style>
