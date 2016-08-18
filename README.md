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
    $ brandai  <json|images|icons> --org <organization> --l <library> --k <share key>
    $ brandai  <json|images|icons> --org <organization> --l <library> --k <share key> --dest <destination folder>
    $ brandai  <json|images|icons>
    $ brandai  <json|images|icons> --dest <destination folder>

  Example
    brandai json --org acme-demo-new --l style
    brandai icons --organization acme-demo-new --library style --dest temp/
    brandai images                     (style data settings should be configured in brandai-config.json file)
    brandai json --dest source/_data   (style data settings should be configured in brandai-config.json file)

  Options
    -d, --dest               Where to place the downloaded files, default is current directory
    -org, --organization     Organization name
    -l, --library            Design library name
    -k, --key                share key (if your design library is private)
```

#### Connecting to your design library
As you see from the examples above you can provide your design library information either by setting it in brandai-config.json or ar one
of the flags on the command itself.

Note: If the design library is private you will need to provide a share key that can be found in the share menu.

#### Data types:
* json - will download your design library information and create style-data.json file in the defined directory.
    
    Example of style-data.json built from our [example design library](https://brand.ai/acme-demo-new/style/applications/data-export/json)
* icons - will download and extract your design library icons
* images - will download and extract your design library images
