# Delta iOS Migration Tool
This tool allows you to search the iOS App Store for possible matches of existing themed Android icons and automatically generate named files and a list of the icons that can be matched.

## Usage
To use simply open (url incoming) and follow the only options you have until you've exceeded your motivation.
When on the brink of crying click `Save and generate files` in the bottom right corner and generate your ZIP file.
Replace the [mapped_android_drawables.txt](https://github.com/Delta-Icons/iOS/blob/master/mapped_android_drawables.txt) in the repo with the one from your zip and add the icons to the `IconBundles` folder in `Delta Icons.theme` or `Delta Icons Alt.theme`. Icons which names end with **a number** before `-large.png` belong in `Delta Icons Alt.theme`.

## Development
To run the tool locally for development or because it is offline simply clone the repo and run the following commands in the root folder:
```
yarn install
yarn dev
```

### Other automated tasks
To manually build a deployable version run `yarn build`. `yarn lint` allows you to lint the code with ESLint.
