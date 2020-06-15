# Gridsome Remark Plugin - Image Downloader

Simple plugin for `@gridsome/transformer-remark` to enable the download of remote images.

## Install

```
npm install -s https://github.com/noxify/gridsome-plugin-remark-image-download.git

```

## Setup

```js
module.exports = {
  siteName: 'Gridsome',
  plugins: [
    //...
  ],
  templates: {
    //...
  },
  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      plugins: [
        ['@noxify/gridsome-plugin-remark-image-download', {
          targetPath: './src/assets/contentImages'
        }]
      ]
    }
  }
}

```

## Documentation

You can find the complete documentation here: https://webstone.info/documentation/gridsome-plugin-remark-image-download
