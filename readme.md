## Spinney

A fast and simple web scraping parser.

### Basic Example

```javascript
const { Spider } = require('spinney');

// Register an endpoint to scrape
const spider = new Spider('https://google.com/');

// Begin search process on provided keys
const observable = spider.spin(['foo', 'bar']);

// Subscribe to key changes
observable.subscribe({
	next(elements) {
		console.log(elements);
	},
	error(error) {
		console.log(error);
	},
	complete() {
		console.log('completed');
	},
});

// Unsubscribe to key changes
observable.unsubscribe();
```
