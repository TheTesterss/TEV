import { commands, text, args as args_1 } from "../Commands";
import fs from "node:fs";
import path from "node:path";
import { blue, green, red, yellow } from "../Colors";
import { Command, Arg } from "../../types/interfaces";
import TEV from "../../Main";
import loadArguments from "../Arguments";

const help = (tev: TEV, args: string[]): void => {
    const command = commands.find((command: Command) => command.name == "version")!;

    // ? First: executes arguments, second: checks if the put command matchs with an existing command and show informations about, else and thirdly, it returns global commands informations.
    if(command.availableArgs.includes(args[0])) {
        loadArguments(command, args)
    } else if(args[0]) {
        if(!commands.some((cmd: Command) => cmd.name === args[0])) helpMessage(tev, command, args);
        else {
            const cmd: Command = commands.find((cmd: Command) => cmd.name === args[0])!;
            console.log(`${blue(text)} - ${cmd.description}`)
            let i = 0;
            console.error(yellow(`${text} - Available usage(s):`));
            for (const usage of cmd.usages) {
                i++;
                console.log(`${" ".repeat(15 - i.toString().length)}${yellow(i.toString())} | ${usage}`);
            }
            console.log(green(`${text} - Available argument(s):`));
            for (const argName of cmd.availableArgs) {
                const arg_1: Arg = args_1.find((arg: Arg) => arg.name == argName)!;
                console.log(`${" ".repeat(15 - arg_1.name.length)}${green(arg_1.name)} | ${arg_1.description}`);
            }
        }
    } else {
        helpMessage(tev, command, args);
    }
}

const helpMessage = (tev: TEV, command: Command, args: string[]) => {
    console.log(`${blue(text)} - Arguments: ${args_1.map((arg_1: Arg) => arg_1.name).join(", ")}\n`)
    console.log(yellow(`${text} - Available commands:`))
    for(const cmd of commands) {
        console.log(`${" ".repeat(15 - cmd.name.length)}${yellow(cmd.name)} | ${cmd.description}`)
    }
}

export default help;