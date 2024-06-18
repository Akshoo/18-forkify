import { TIMEOUT_ERR, TIMEOUT_SEC } from './config';

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(TIMEOUT_ERR(s)));
		}, s * 1000);
	});
};
export const fetchJson = async function (url) {
	try {
		const resp = await Promise.race([fetch(`${url}`), timeout(TIMEOUT_SEC)]);
		return await resp.json();
	} catch (err) {
		throw err;
	}
};
