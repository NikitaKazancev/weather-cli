#!/usr/bin/env node
import 'dotenv/config';

import { getArgs, Args } from './helpers/args.js';
import ErrorHandlerService from './services/ErrorHandlerService.js';
import LogService from './services/LogService.js';
import { DBKeys } from './services/StorageService.js';

export enum argsTypes {
	HELP = 'h',
	CITY = 'c',
	API_KEY = 'key',
}

export default async function weatherCLI() {
	const args: Args = getArgs(process.argv);

	function saveKey(
		keyType: argsTypes,
		key: DBKeys,
		value: string | boolean,
		message: string
	) {
		if (args[keyType]) ErrorHandlerService.fetchDB({ key, value }, message);
	}

	if (args[argsTypes.HELP]) LogService.help();

	saveKey(
		argsTypes.API_KEY,
		DBKeys.API_KEY,
		args.key,
		'Уникальный ключ сохранён'
	);
	saveKey(argsTypes.CITY, DBKeys.CITY, args.c, 'Город сохранён');

	if (JSON.stringify(args).length == 2) {
		const apiResult = await ErrorHandlerService.fetchAPI();
		if (apiResult.type == 'success') LogService.showWeather(apiResult.body);
	}
}

weatherCLI();
