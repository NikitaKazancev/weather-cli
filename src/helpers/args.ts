type ArgsKey = `-${string}`;

interface IArgs {
	[k: ArgsKey]: string | boolean;
}

export type Args = IArgs | {};

export function getArgs(args: string[] = []): Args {
	let flag: ArgsKey = '-';
	const tempArr: [ArgsKey, string | boolean][] = [];

	args.forEach(arg => {
		if (arg[0] == '-') {
			if (flag != '-') tempArr.push([flag, true]);
			flag = arg as ArgsKey;
		} else if (flag != '-') {
			tempArr.push([flag, arg]);
			flag = '-';
		}
	});

	if (flag != '-') tempArr.push([flag, true]);

	return Object.fromEntries(tempArr);
}
