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
        method: ['console','website'],
      }
)
singleKLogging.info('info_msg')
singleKLogging.warn('warn_msg')
singleKLogging.error('warm_msg')
```

The corresponding website page is <http://qiniu.404mzk.com/website.html?app_name=K-Logging>

tips: The corresponding app_name and set consitent

[see exaple.gif](http://qiniu.404mzk.com/k-logging_demo.gif)

## Installation

```html
<script src="http://qiniu.404mzk.com/K-Logging_0.0.1.js"></script>
```

And it's just as easy with [npm](http://npmjs.com):

```sh
npm i --save npm install k-logging 
```

