#!/usr/bin/env node

import { getArgs, Args } from './helpers/args.js';
import LogService from './services/LogService.js';

const args: Args = getArgs(process.argv);

LogService.help();
