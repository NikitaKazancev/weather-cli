import APIService from './APIService.js';
import LogService from './LogService.js';
import StorageService, { RequestBody } from './StorageService.js';
import { AxiosError } from 'axios';

type APIResult =
	| {
			body: any;
			type: 'success';
	  }
	| { type: 'error' };

function checkErrorObj(e: any): e is AxiosError {
	return 'response' in e;
}

export default class ErrorHandlerService {
	private static res: any;

	public static async fetchDB(
		body: RequestBody,
		successMessage: string = 'Done!'
	) {
		try {
			if (body.value) {
				await StorageService.post(body);
				LogService.success(successMessage);
			} else this.res = await StorageService.get(body.key);
		} catch (e) {
			if (e instanceof Error) LogService.error(e.message);
		}

		return this.res;
	}

	public static async fetchAPI(): Promise<APIResult> {
		try {
			this.res = await APIService.getWeather();
			this.res = { body: this.res, type: 'success' };
		} catch (e) {
			if (checkErrorObj(e) && e.response?.status == 401)
				LogService.error('Incorrect api-key');
			else if (e instanceof Error) LogService.error(e.message);

			this.res = { type: 'error' };
		}

		return this.res;
	}
}
