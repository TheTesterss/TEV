import { text, args as args_1 } from "./Commands";
import { Arg, Command } from "../types/interfaces";
import { green, red, yellow } from "./Colors";

const loadArguments = (command: Command, args: string[]) => {
    let i: number = 0;
    switch (args[0]) {
        case "--help":
            console.log(`${green(text)} - ${command.description}`);
            break;
        case "-h":
            console.log(`${green(text)} - ${command.description}`);
            break;
        case "--usage":
            console.error(yellow(`${text} - Available usage(s):`));
            for (const usage of command.usages) {
                i++;
                console.error(`${" ".repeat(15 - i.toString().length)}${yellow(i.toString())} | ${usage}`);
            }
            break;
        case "-u":
            console.error(yellow(`${text} - Available usage(s):`));
            for (const usage of command.usages) {
                i++;
                console.error(`${" ".repeat(15 - i.toString().length)}${yellow(i.toString())} | ${usage}`);
            }
            break;
        default:
            console.error(`${red(text)} - ${red(args[0])} is not a valid argument.\n`);
            console.error(yellow(`${text} - Available argument(s):`));
            for (const argName of command.availableArgs) {
                const arg_1: Arg = args_1.find((arg: Arg) => arg.name == argName)!;
                console.error(`${" ".repeat(15 - arg_1.name.length)}${yellow(arg_1.name)} | ${arg_1.description}`);
            }
            break;
    }
};

export default loadArguments;
