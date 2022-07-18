#!/usr/bin/env node

import { getArgs, Args } from './helpers/args.js';
import ErrorHandlerService from './services/ErrorHandlerService.js';
import LogService from './services/LogService.js';

const args: Args = getArgs(process.argv);
console.log(args);

if (args.key)
	ErrorHandlerService.fetch(
		{ key: 'API_KEY', value: args.key },
		'Уникальный ключ сохранён'
	);
if (args.c)
	ErrorHandlerService.fetch({ key: 'CITY', value: args.c }, 'Город сохранён');
if (args.h) LogService.help();
