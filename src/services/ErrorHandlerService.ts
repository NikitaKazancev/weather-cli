import LogService from './LogService.js';
import StorageService, { RequestBody } from './StorageService.js';

export default class ErrorHandlerService {
	public static async fetch(
		body: RequestBody,
		successMessage: string = 'Done!'
	) {
		let res;

		try {
			if (body.value) {
				await StorageService.post(body);
				LogService.success(successMessage);
			} else res = await StorageService.get(body.key);
		} catch (e) {
			if (e instanceof Error) LogService.error(e.message);
		}

		return res;
	}
}
