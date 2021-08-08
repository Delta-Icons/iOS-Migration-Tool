<template>
	<div>
		<h1>Checkout</h1>
		<p>
			Mappings found for {{ mappedItems.length }} icons.
		</p>
		<button v-if="!loading" @click="generateAndSave">Generate and download ZIP file</button>
		<div v-else class="loading">
			<div class="loader"></div>
			<span>This will take a second.</span>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import JSZip from 'jszip'

const fr = new FileReader()

export default {
	name: 'Checkout',
	data () {
		return {
			loading: false
		}
	},
	computed: {
		...mapGetters([
			'apps',
			'getApp',
		]),
		mappedItems () {
			return Object.values(this.apps).filter(x => x.bundleId != null)
		},
	},
	methods: {
		blobToBase64 (blob) {
			return new Promise((resolve, reject) => {
				fr.onerror = reject
				fr.onload =	() => {
					resolve(fr.result)
				}
				fr.readAsDataURL(blob)
			})
		},
		async saveZip (zip) {
			let link = document.createElement('a')
			link.style = "display:none"
			const zipBlob = await zip.generateAsync({type: "blob"})
			const blobUrl = window.URL.createObjectURL(zipBlob)
			link.href = blobUrl
			link.download = "generated-delta-iOS.zip"
			link.click()
		},
		async addIcon (drawableName, fileName, zip) {
			const res = await fetch(`http://raw.githubusercontent.com/Delta-Icons/android/master/app/src/main/res/drawable-nodpi/${drawableName}.png`)
			const imgBlob = await res.blob()
			const base64Data = await this.blobToBase64(imgBlob)
			zip.file(`icons/${fileName}-large.png`, base64Data.substring(22), {base64: true})
		},
		async generateAndSave () {
			this.loading = true
			const zip = new JSZip()
			for (const [drawableName, values] of Object.entries(this.apps)) {
				if (values.bundleId != null) {
					await this.addIcon(drawableName, values.bundleId, zip)
					if (values.alts) {
						for (const [index, value] of Object.entries(values.alts)){
							await this.addIcon(value, values.bundleId + index.toString(), zip)
						}
					}
				}
			}
			this.saveZip(zip)
			this.loading = false
		},
	}
}
</script>

<style>
@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.loading {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.loader {
	width: 40px;
	height: 40px;
	display: inline-block;
	border-radius: 50%;
	background: conic-gradient(transparent, #fff);
	transform-origin: 50% 50%;
	animation: rotate 2s linear infinite;
}
.loader:after {
	content: '';
	position: relative;
	width: 34px;
	height: 34px;
	top: 3px;
	left: 3px;
	border-radius: 50%;
	display: block;
	background: #161616;
}
</style>