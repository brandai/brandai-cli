# brandai-cli

Command line tool that can help you easily sync your style assets from [Brand.ai](https://brand.ai) to 
your current working environment.

## Installation
```
npm install --global brandai-cli
```

## Usage
```
$ brandai --help

 Usage
    $ brandai  <json|images|icons> --org <organization> --s <styleguide> --k <share key>
    $ brandai  <json|images|icons> --org <organization> --s <styleguide> --k <share key> --dest <destination folder>
    $ brandai  <json|images|icons>
    $ brandai  <json|images|icons> --dest <destination folder>

  Example
    brandai json --org acme-demo-new --s style
    brandai icons --organization acme-demo-new --styleguide style --dest temp/
    brandai images                     (style data settings should be configured in brandai-config.json file)
    brandai json --dest source/_data   (style data settings should be configured in brandai-config.json file)

  Options
    -d, --dest               Where to place the downloaded files, default is current directory
    -org, --organization     Organization name
    -s, --styleguide         Style guide name
    -k, --key                share key (if your styleguide is private)
```

#### Connecting to your styleguide
As you see from the examples above you can provide your styleguide information either by setting it in brandai-config.json or ar one 
of the flags on the command itself.

Note: If the styleguide is private you will need to provide a share key that can be found in the share menu. 

#### Data types:
* json - will download your style guide information and create style-data.json file in the defined directory.
    
    Example of style-data.json built from our [example styleguide](https://brand.ai/acme-demo-new/style/applications/data-export/json)
* icons - will download and extract your styleguide icons
* images - will download and extract your styleguide images
