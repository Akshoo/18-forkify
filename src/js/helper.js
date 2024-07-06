import { API_KEY, TIMEOUT_ERR, TIMEOUT_SEC } from './config';


const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(TIMEOUT_ERR(s)));
		}, s * 1000);
	});
};

// true if no ongoing api calls
let clear = true;
export const fetchJson = async function (url) {
	try {
		// only fetch if there is no other ongoing api call
		if (!clear) throw Error('Cannot Fetch.  💥💥');

		clear = false;
		const resp = await Promise.race([fetch(`${url}`), timeout(TIMEOUT_SEC)]);
		const data = await resp.json();
		clear = true;

		return data;
	} catch (err) {
		clear = true;
		throw err;
	}
};

export const sendJson = async function (url, uploadData) {
	try {
		// only fetch if there is no other ongoing api call

		const resp = await Promise.race([
			fetch(`${url}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(uploadData),
			}),
			timeout(TIMEOUT_SEC),
		]);
		const data = await resp.json();
		clear = true;

		return data;
	} catch (err) {
		throw err;
	}
};