<template>
	<div>
		<h1>Current icon:</h1>
		<div class="currentItem" v-if="currentItem">
			<img :src="deltaIconUrl" class="currentIcon">
			<div class="text">
				<h1>
					{{ currentItem.niceName }}
				</h1>
				<span>Package Names on Android</span>
				<ul>
					<li v-for="pack in currentItem.packages" :key="pack">
						{{pack}}
					</li>
				</ul>
			</div>
		</div>
	</div>
	<h2>Options</h2>
	<div class="results" v-if="results.length > 0">
		<div class="result" v-for="result in results" :key="result.bundleId">
			<input type="radio" name="app" :id="result.bundleId" :value="result.bundleId" v-model="selection">
			<label :for="result.bundleId" class="grid">
				<div class="thumb">
					<img :src="result.artworkUrl100" />
				</div>
				<div>
					<div class="name">{{ result.trackName }}</div>
					<span>{{ result.bundleId }}</span><br>
					<span> {{ result.artistName }}</span>
				</div>
			</label>
		</div>
		<div class="result none">
			<input type="radio" name="app" id="none" :value="null" v-model="selection">
			<label for="none">None of the above</label>
		</div>
	</div>
	<div v-else class="nope">
		<h3>No Results :(</h3>
	</div>
	<div class="navigation">
		<button v-if="index > 0" @click="navigateBack">Previous</button>
		<span>{{ index }} / {{maxIndex}}</span>
		<button v-if="index < maxIndex" @click="navigateNext">Save &amp; Next</button>
		<router-link to="/checkout" class="checkout-link">
			Save and generate files
		</router-link>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Package',
	props: ['drawableName'],
	data() {
		return {
			results: [],
			selection: null,
		}
	},
	computed: {
		...mapGetters([
			'index',
			'maxIndex',
			'apps',
			'getApp'
		]),
		currentItem () {
			return this.getApp(this.drawableName)
		},
		deltaIconUrl () {
			return `https://raw.githubusercontent.com/Delta-Icons/android/master/app/src/main/res/drawable-nodpi/${this.drawableName}.png` // get android icon from github
		}
	},
	methods: {
		...mapActions([
			'nextPage',
			'prevPage',
			'mapApp',
		]),
		navigateBack() {
			const pkg = Object.keys(this.apps)[this.index - 1]
			this.prevPage()
			this.$router.push('/package/' + pkg)
			// restore selection
			if(this.getApp(pkg).bundleId) {
				this.selection = this.getApp(pkg).bundleId
			}
		},
		navigateNext() {
			const pkg = Object.keys(this.apps)[this.index + 1]
			this.nextPage()
			this.$router.push('/package/' + pkg)
			if(this.selection != null) {
				this.mapApp({
					drawableName: this.drawableName,
					bundleId: this.selection
				})
			}
			this.selection = null
		},
		async search () {
			const res = await fetch(`https://itunes.apple.com/search?limit=5&media=software&term=${encodeURI(this.currentItem.niceName)}`)
			const data = await res.json()
			const exactMatch = data.results.filter(ele => this.currentItem.packages.includes(ele.bundleId))
			if (exactMatch.length) {
				this.selection = exactMatch[0].bundleId
				this.mapApp({
					drawableName: this.drawableName,
					bundleId: exactMatch[0].bundleId
				})
				this.navigateNext()
			} else if (!data.results.length) {
				this.navigateNext()
			}
			this.results = data.results
		}
	},
	mounted () {
		this.search()
	},
	watch: {
		drawableName () {
			this.search()
		}
	}
}
</script>

<style>
	.currentItem {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-gap: 1rem;
	}

	.currentItem h1 {
		margin-bottom: 1rem;
		margin-top: 0;
	}

	.currentIcon {
		width: 120px;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	span {
		opacity: 0.5;
		font-style: italic;
	}

	.results {
		margin-bottom: 3rem;
	}

	.result{
		margin-bottom: 1rem;
		display: flex;
		gap: 1rem;
	}

	.none {
		margin-top: 2rem;
	}

	label {
		cursor: pointer;
	}

	.grid{
		border: 2px solid #4a4a4a;
		border-radius: 12px;
		width: 100%;
		display: grid;
		grid-template-columns: auto auto;
		justify-content: flex-start;
		align-items: center;
		grid-gap: 1rem;
	}

	.thumb {
		line-height: 0;
		border-radius: 10px;
		overflow: hidden;
	}

	.name {
		font-size: 1.25rem;
		padding-right: 1rem;
	}

	.checkout-link  {
		margin-left: auto;
	}
</style>
