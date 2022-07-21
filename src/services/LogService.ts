import chalk from 'chalk';
import dedent from 'dedent-js';

export default class LogService {
	public static error(message: string) {
		console.log(`${chalk.bgRed(' ERROR ')} ${message}`);
	}

	public static success(message: string) {
		console.log(`${chalk.bgGreen(' SUCCESS ')} ${message}`);
	}

	public static help() {
		console.log(
			'\n' +
				'  ' +
				chalk.bgCyan(' HELP ') +
				'\n\n' +
				'  Without parameters - get weather\n\n' +
				"  '-h' for receiving help\n\n" +
				"  '-c [CITY]' for setting the city\n\n" +
				"  '-key [API_KEY]' for saving the api-key\n"
		);
	}

	private static colorTemperature(temp: string): string {
		if (+temp > 10) return chalk.rgb(244, 164, 96)(temp);
		else if (+temp < 10) return chalk.rgb(0, 139, 139)(temp);
		return chalk.rgb(220, 220, 220)(temp);
	}

	private static getIcon(icon: string) {
		switch (icon.slice(0, -1)) {
			case '01':
				return '☀️';
			case '02':
				return '🌤️';
			case '03':
				return '☁️';
			case '04':
				return '☁️';
			case '09':
				return '🌧️';
			case '10':
				return '🌦️';
			case '11':
				return '🌩️';
			case '13':
				return '❄️';
			case '50':
				return '🌫️';
			default:
				return '🌫️';
		}
	}

	public static showWeather({
		name,
		weather: [{ description, icon }],
		wind: { speed },
		main: { temp, feels_like, humidity },
	}: {
		name: string;
		weather: [{ description: string; icon: string }];
		wind: { speed: string };
		main: { temp: string; feels_like: string; humidity: string };
	}) {
		temp = this.colorTemperature(temp);
		feels_like = this.colorTemperature(feels_like);

		console.log(
			dedent(
				`${chalk.bgYellow(' WEATHER ')} Погода в городе ${name}
				${this.getIcon(icon)}  ${description}
				Температура: ${temp} градусов (ощущается как ${feels_like})
				Влажность: ${humidity}%
				Скорость ветра: ${speed}
				`
			)
		);
	}
}
