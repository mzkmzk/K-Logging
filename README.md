# K-Logging

![image](http://qiniu.404mzk.com/K-Logging_logo.png)

[![Build Status](https://travis-ci.org/mzkmzk/K-Logging.png)](https://travis-ci.org/mzkmzk/K-Logging)

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
singleKLogging.warn('warm_msg')
singleKLogging.error('warm_msg')
```

对应的webisite页面<http://qiniu.404mzk.com/website.html?app_name=K-Logging>,参加app_name对应即可

## Installation

```html
<script src="http://qiniu.404mzk.com/K-Logging_0.0.1.js"></script>
```

And it's just as easy with [npm](http://npmjs.com):

```sh
npm i --save react //还没上,请稍等
```

## Releases

<https://github.com/mzkmzk/K-Logging/releases/>

## License

MIT

