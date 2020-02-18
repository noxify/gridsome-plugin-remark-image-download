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

## Configuration options

`targetPath` Defines the target directory for the downloaded images If you set `./src/assets/contentImages`, it will save the images to `<projectroot>/src/assets/contentImages/`

## Example Markdown

```md
---
title: Markdown test file
---

## Images

### Local Images

![Image](./images/alexandr-podvalny-220262-unsplash.jpg)

### Remote Images

![Image](https://raw.githubusercontent.com/gridsome/gridsome-starter-blog/master/content/posts/images/alexandr-podvalny-220262-unsplash.jpg)

```
