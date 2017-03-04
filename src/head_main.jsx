window.test = 'test';
try {
	document.body.style.cssText = 'background: #222;';
} catch (e) {
	console.trace(e); /* eslint no-console: off */
}
