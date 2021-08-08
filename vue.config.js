module.exports = {
	devServer: {
		proxy: {
			'/icons': {
				target: 'https://raw.githubusercontent.com/Delta-Icons/android/master/app/src/main/res/drawable-nodpi/',
				secure: false,
				changeOrigin: true,
				pathRewrite: { '^/icons': '' },
			}
		}
	}
}