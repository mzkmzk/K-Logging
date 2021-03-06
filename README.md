# K-Logging

![image](http://qiniu.404mzk.com/K-Logging_logo.png)

[![Build Status](https://travis-ci.org/mzkmzk/K-Logging.png?style=flat)](https://travis-ci.org/mzkmzk/K-Logging)
[![npm version](https://img.shields.io/npm/v/k-logging.svg?style=flat)](https://www.npmjs.com/package/k-logging)
[![Downloads](https://img.shields.io/npm/dt/k-logging.svg?style=flat)](https://www.npmjs.com/package/k-logging)
[![License](https://img.shields.io/npm/l/k-logging.svg?style=flat)](https://www.npmjs.com/package/k-logging)

Hope is the most useful you used js library of the log 

* **Configurable:** Can be configured to display your log 
* **Website:** Can be real-time display of your log in other web page

## Examples

```javascript
singleKLogging.setOptions(
      {
        app_name: 'K-Logging',
        open_level : ['info','warn','error'],
        method: ['console','display', 'website'],
      }
)
singleKLogging.info('info_msg')
singleKLogging.warn('warn_msg')
singleKLogging.error('warm_msg')
```

The corresponding website page is <http://qiniu.404mzk.com/website.html?app_name=K-Logging>

tips: The corresponding app_name and set consitent

[see exaple.gif](http://qiniu.404mzk.com/k-logging_demo.gif)

## DEMO


<http://k-logging.404mzk.com/Example/Website/index.html>

website show: <http://k-logging.404mzk.com/Example/Website/website.html?app_key=klogging>

## Installation

```html
<script src="http://qiniu.404mzk.com/K-Logging_0.0.1.js"></script>
```

And it's just as easy with [npm](http://npmjs.com):

```sh
npm i --save npm install k-logging 
```

## API


| key             | options                         | default                         | instructions                                                                                                                                   |
|-----------------|---------------------------------|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| app_key         | Any Numbers and letters         | ''                              | A unique identifier                                                                                                                            |
| open_level      | ['info','warn','error']         | ['info','warn','error']         | Limit the output level                                                                                                                         |
| method          | ['console','display','website'] | ['console','display','website'] | Output way                                                                                                                                     |
| evel_js         | Boolean                         | false                           | Whether in the display and input box to perform js website                                                                                     |
| switch_listener | Boolean                         | true                            | Whether listening to restore the default Settings, the commissioning of the web page is true, type app_key will return to the default Settings |
