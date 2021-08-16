import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index'
import Package from '../views/Package'
import Processing from '../views/Processing'
import Checkout from '../views/Checkout'
import Store from '../store'

const routes = [
	{
		path: '/',
		name: 'Index',
		component: Index
	},
	{
		path: '/processing',
		name: 'Processing',
		component: Processing
	},
	{
		path: '/package/:drawableName',
		name: 'Package',
		props: true,
		component: Package
	},
	{
		path: '/checkout',
		name: 'Checkout',
		props: true,
		component: Checkout
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	beforeEach ({next}) {
		Store.getters.maxIndex > 0
		? next()
		: next('/checkout')
	}
})

export default router
