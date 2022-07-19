import axios from 'axios';
import { URL } from 'url';
import LogService from './LogService.js';
import StorageService, { DBKeys } from './StorageService.js';

export default class APIService {
	private static baseUrl = 'https://api.openweathermap.org';

	public static async getWeather(city: string) {
		const apiKey = await StorageService.get(DBKeys.API_KEY);
		if (!apiKey) return LogService.error('No api-key in the database!');

		const {
			data: [{ lat, lon }],
		} = await axios.get(`${this.baseUrl}/geo/1.0/direct`, {
			params: {
				q: city,
				limit: 1,
				appid: apiKey,
			},
		});
		if (!lat || !lon)
			return LogService.error('Sorry, we do not know such a place');

		const { data: weatherData } = await axios.get(
			`${this.baseUrl}/data/2.5/weather`,
			{
				params: {
					lat,
					lon,
					appid: apiKey,
					units: 'metric',
					lang: 'ru',
				},
			}
		);

		return weatherData;
	}
}
