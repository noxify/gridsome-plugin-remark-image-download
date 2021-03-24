const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const imageType = require('image-type')
const visit = require('unist-util-visit')
//const imageDownload = import('image-download')

import * as imageDownload from 'image-download'

const urlRegExp = /^(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\/)?([^?#]*)?$/gi;

module.exports = function attacher(options = {}) {

    const transformer = this.data('transformer')    

    return async function transform(tree, file) {
        
        const images = []

        visit(tree, 'image', node => images.push(node))
        
        for (const node of images) {
            let filePath;
            const data = node.data || {}
            const props = data.hProperties || {}
            const classNames = props.class || []

            
                

            let imageHTML = null
            let noscriptHTML = null

            try {

                const isExternal = (urlRegExp.exec(node.url) !== null);

                if (isExternal) {
                    filePath = await getRemoteImage(node.url, options);
                    filePath = transformer.resolveNodeFilePath(file.data.node, filePath)
                } else {
                    throw "Invalid Image URL";
                }
                
                const asset = await transformer.assets.add(filePath, {
                    alt: props.alt || node.alt,
                    width: props.width,
                    height: props.height,
                    classNames,
                    ...options
                })

                imageHTML = asset.imageHTML
                noscriptHTML = asset.noscriptHTML
            } catch (err) {
                console.log(err);
                return node.url
            }

            if (imageHTML) {
                node.type = 'html'
                node.value = imageHTML + noscriptHTML
            }
        }
    }
}

async function getRemoteImage(url, options) {

    const imagePath = await imageDownload(url).then(buffer => {

        const hash = crypto.createHash('sha256');
        hash.update(url);
        var targetFileName = hash.digest('hex');

        const type = imageType(buffer);

        const filePath = path.resolve(
            options.targetPath,
            `${targetFileName}.${type.ext}`
        )

        fs.writeFile(filePath, buffer, (err) => console.log(err ? err : ''));
        return filePath;
    });
        

    return imagePath;
}