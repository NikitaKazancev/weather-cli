#!/usr/bin/env node

import { getArgs, Args } from './helpers/args.js';
import APIService from './services/APIService.js';
import ErrorHandlerService from './services/ErrorHandlerService.js';
import LogService from './services/LogService.js';
import { DBKeys } from './services/StorageService.js';

const args: Args = getArgs(process.argv);

enum argsTypes {
	HELP = 'h',
	CITY = 'c',
	KEY = 'key',
}

APIService.getWeather('moscow');

// if (args[argsTypes.KEY])
// 	ErrorHandlerService.fetch(
// 		{ key: DBKeys.API_KEY, value: args.key },
// 		'Уникальный ключ сохранён'
// 	);
// if (args[argsTypes.CITY])
// 	ErrorHandlerService.fetch(
// 		{ key: DBKeys.CITY, value: args.c },
// 		'Город сохранён'
// 	);
// if (args.h) LogService.help();
