export type Args = {
	[k: string]: string | boolean;
};

export function getArgs(args: string[] = []): Args {
	let flag = '-';
	const tempArr: [string, string | boolean][] = [];

	args.forEach(arg => {
		if (arg[0] == '-') {
			if (flag != '-') tempArr.push([flag.slice(1), true]);
			flag = arg;
		} else if (flag != '-') {
			tempArr.push([flag.slice(1), arg]);
			flag = '-';
		}
	});

	if (flag != '-') tempArr.push([flag.slice(1), true]);

	return Object.fromEntries(tempArr);
}
