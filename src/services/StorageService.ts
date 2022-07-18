import { promises } from 'fs';
import { URL } from 'url';

const path = (path: string) => new URL(path, import.meta.url).pathname.slice(1);

export type RequestBody = { key: string; value?: any };

export default class StorageService {
	private static filePath = path('../../weather-data.json');
	private static fileIsReady = true;

	private static async isExist(filePath: string): Promise<boolean> {
		try {
			await promises.stat(filePath);
			return true;
		} catch (_) {
			return false;
		}
	}

	public static async get(key: string): Promise<any> {
		this.fileIsReady = false;

		if (await this.isExist(this.filePath)) {
			const data = JSON.parse(
				(await promises.readFile(this.filePath)).toString()
			);
			if (data[key]) {
				this.fileIsReady = true;
				return data[key];
			}
		}

		this.fileIsReady = true;
		return undefined;
	}

	public static async post({ key, value }: RequestBody) {
		const i = setInterval(async () => {
			if (this.fileIsReady) {
				clearInterval(i);
				this.fileIsReady = false;

				let data: {
					[k: string]: any;
				} = {};
				if (await this.isExist(this.filePath))
					data = JSON.parse(
						(await promises.readFile(this.filePath)).toString()
					);

				data[key] = value;

				await promises.writeFile(this.filePath, JSON.stringify(data));

				this.fileIsReady = true;
			}
		}, 5);
	}
}
