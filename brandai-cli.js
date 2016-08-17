#!/usr/bin/env node
'use strict';
var meow = require('meow');
var Download = require('download');
var progress = require('download-status');
var brandaiConfig = require('./brandai-config.json');

var cli = meow({
  help: [
    'Usage',
    '  $ brandai  <json|images|icons> --org <organization> --s <styleguide> --k <share key>',
    '  $ brandai  <json|images|icons> --org <organization> --s <styleguide> --k <share key> --dest <destination folder>',
    '  $ brandai  <json|images|icons>',
    '  $ brandai  <json|images|icons> --dest <destination folder>',
    '',
    'Examples',
    '  brandai json --org acme-demo-new --s style',
    '  brandai icons --organization acme-demo-new --styleguide style --dest temp/',
    '  brandai images                     (style data settings should be configured in brandai-config.json file)',
    '  brandai json --dest source/_data   (style data settings should be configured in brandai-config.json file)',
    '',
    'Options',
    '  -d, --dest               Where to place the downloaded files',
    '  -org, --organization     Organization name',
    '  -s, --styleguide         Style guide name',
    '  -k, --key                share key (if your styleguide is private)',
    ''
  ],
  description: false
}, {
  string: [
    'dest',
    'organization',
    'styleguide',
    'key',
  ],
  alias: {
    d: 'dest',
    org: 'organization',
    s: 'styleguide',
    k: 'key',
  },
  default: {
    dest: process.cwd(),
  }
});


//Brand.ai connection configuration
// var brandAIHost = 'https://assets.brand.ai/';
var brandAIHost = 'http://localhost:3002/';
var organization = cli.flags.organization || brandaiConfig.organization;
var styleguide = cli.flags.styleguide || brandaiConfig.styleguide;
var sharedKey = cli.flags.key || brandaiConfig.key;

var brandAiPath = (organization) + '/' + (styleguide);

function getKeyString(firstParam) {
  if (!sharedKey) {
    return '';
  }
  var keyString = firstParam ? '?key=' + sharedKey : '&key=' + sharedKey;
  return keyString;
};

var jsonURL = brandAIHost + brandAiPath + '/style-data.json?exportFormat=list,lookup' + getKeyString(false);
var iconsURL = brandAIHost + brandAiPath + '/icons.zip?' + getKeyString(true);
var imagesURL = brandAIHost + brandAiPath + '/images.zip?' + getKeyString(true);


var typeToUrl = {
  json: {url: jsonURL, fileName: 'style-data.json'},
  images: {url: imagesURL, options: {extract: true}},
  icons: {url: iconsURL, options: {extract: true}}
}

function run(src, dest) {
  var download = new Download(src.options);

  console.log(src);
  download.get(src.url);

  if (process.stdout.isTTY) {
    download.use(progress());
    download.dest(dest);
    if (src.fileName) {
      download.rename(src.fileName);
    }
  }

  download.run(function (err, files) {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
  });
}

/**
 * Apply arguments
 */

if (process.stdin.isTTY) {
  var src = cli.input;
  var dest = cli.flags.dest;

  if (!src.length || !organization || !styleguide) {
    cli.showHelp(1);
  }

  var dataType = src[0];
  if (Object.keys(typeToUrl).indexOf(dataType) === -1) {
    console.error([
      'Specify style data type you would like to fetch from brand.ai',
      'Example',
      '  brandai json',
      '  brandai icons --organization acme-demo-new --styleguide style --dest temp/'
    ].join('\n'));
    process.exit(1);
  }

  var data = typeToUrl[dataType];
  run(data, dest);
}
