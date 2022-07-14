import chalk from 'chalk';

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
}
