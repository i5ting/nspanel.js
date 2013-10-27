# NSPanel

mobile panel

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/i5ting/nspanel.js/master/dist/jquery.nspanel.min.js
[max]: https://raw.github.com/i5ting/nspanel.js/master/dist/jquery.nspanel.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="jquery.hammer.min.js"></script>
<script src="fastclick.js"></script>
<script src="dist/jquery.nspanel.min.js"></script>
<script>
jQuery(function($) {
	FastClick.attach(document.body);
	
	$('.sectionloader').panel({
		animation:{
			speed_in:400,
			speed_out:100
		}
	});
});
</script>
```
## Examples

```
cd ${PROJECT_HOME}
./start.sh
```

http://127.0.0.1:5001/demo/index.html

## Documentation

_(Coming soon)_

## Release History

- v0.1.0 支持无限嵌套 2013-10-24
- v0.1.1 支持callback，切callback参数a)level  b)item_index   c)pre_panel_url


## Contributing

1. Fork it
1. Create your feature branch (git checkout -b my-new-feature)
1. Commit your changes (git commit -am 'Add some feature')
1. Push to the branch (git push origin my-new-feature)
1. Create new Pull Request

## License

this project is released under the MIT license:

http://www.opensource.org/licenses/mit-license.php

## 欢迎fork和反馈

在issue提问或邮件shiren1118@126.com
