import loadPolyfills from './polyfills';

loadPolyfills();

const reloadScarcityCounters = () => {
	const counters = document.querySelectorAll('.scarcity-counter');

	// saves already processed IDs.
	const done = [];

	for (let i = 0; i < counters.length; i += 1) {
		const ctr = counters[i];

		const { id } = ctr.dataset;
		const start = Number(ctr.dataset.start);
		const reduction = Number(ctr.dataset.reduction);
		const min = Number(ctr.dataset.min);

		const savedCount = localStorage.getItem(`scarcitycounter_${id}`);
		let newCount = savedCount || start;

		const timelimit = Number(ctr.dataset.timelimit);
		const savedSeconds = Number(localStorage.getItem(`scarcitycounter_${id}_secondsLimit`));
		const currentTime = new Date().getTime();
		const isOverSecondsLimit = currentTime - savedSeconds > timelimit;

		if (!done.includes(id) && isOverSecondsLimit && newCount > min) {
			// random number between 1 and reduction
			newCount -= Math.floor((Math.random() * reduction) + 1);
			// set to limit if newCount is smaller than the limit.
			newCount = newCount < min ? min : newCount;
			// save current time.
			localStorage.setItem(`scarcitycounter_${id}_secondsLimit`, currentTime);
		}

		ctr.textContent = newCount;

		// save current count.
		localStorage.setItem(`scarcitycounter_${id}`, newCount);
		// save already updated ids to use them multiple times on page and show the same number.
		done.push(id);
	}
};

reloadScarcityCounters();

// Credits to @vsync from SO: https://stackoverflow.com/a/14570614/2180161
const observeDOM = (function () {
	const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	const eventListenerSupported = window.addEventListener;

	return function (obj, callback) {
		if (MutationObserver) {
			// define a new observer
			const obs = new MutationObserver(((mutations) => {
				if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) { callback(); }
			}));
			// have the observer observe foo for changes in children
			obs.observe(obj, { childList: true, subtree: true });
		} else if (eventListenerSupported) {
			obj.addEventListener('DOMNodeInserted', callback, false);
			obj.addEventListener('DOMNodeRemoved', callback, false);
		}
	};
}());

// Observe a specific DOM element:
observeDOM(document.querySelector('body'), () => {
	reloadScarcityCounters();
});
