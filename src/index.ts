#!/usr/bin/env node
import 'dotenv/config';

import { getArgs, Args } from './helpers/args.js';
import ErrorHandlerService from './services/ErrorHandlerService.js';
import LogService from './services/LogService.js';
import { DBKeys } from './services/StorageService.js';

const args: Args = getArgs(process.argv);

enum argsTypes {
	HELP = 'h',
	CITY = 'c',
	API_KEY = 'key',
}

function saveKey(
	keyType: argsTypes,
	key: DBKeys,
	value: string | boolean,
	message: string
) {
	if (args[keyType]) ErrorHandlerService.fetchDB({ key, value }, message);
}

saveKey(
	argsTypes.API_KEY,
	DBKeys.API_KEY,
	args.key,
	'Уникальный ключ сохранён'
);
saveKey(argsTypes.CITY, DBKeys.CITY, args.c, 'Город сохранён');

if (args.h) LogService.help();

function showWeather(weatherData: any) {
	console.log(weatherData);
}

async function app() {
	const apiResult = await ErrorHandlerService.fetchAPI();
	if (apiResult.type == 'success') showWeather(apiResult.body);
}

app();
