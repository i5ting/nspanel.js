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

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_
