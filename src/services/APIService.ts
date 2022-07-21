import axios from 'axios';
import StorageService, { DBKeys } from './StorageService.js';

export default class APIService {
	private static baseUrl = 'https://api.openweathermap.org';

	private static async getKey(
		key: string | undefined,
		DBkey: DBKeys,
		keyName: string
	): Promise<string | undefined> {
		if (key) return key;
		let keyValue = await StorageService.get(DBKeys[DBkey]);
		if (!keyValue) throw new Error(`No ${keyName} in the database!`);
		return keyValue;
	}

	public static async getWeather() {
		let { API_KEY: apiKey, CITY: city } = process.env;
		apiKey = await this.getKey(apiKey, DBKeys.API_KEY, 'api-key');
		city = await this.getKey(city, DBKeys.CITY, 'city');

		const { data }: { data: any[] } = await axios.get(
			`${this.baseUrl}/geo/1.0/direct`,
			{
				params: {
					q: city,
					limit: 1,
					appid: apiKey,
				},
			}
		);
		if (!data.length) throw new Error('Sorry, we do not know such a place');

		const { data: weatherData } = await axios.get(
			`${this.baseUrl}/data/2.5/weather`,
			{
				params: {
					lat: data[0].lat,
					lon: data[0].lon,
					appid: apiKey,
					units: 'metric',
					lang: 'ru',
				},
			}
		);

		return weatherData;
	}
}
