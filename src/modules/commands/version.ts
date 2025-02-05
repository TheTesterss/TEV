import { commands, text, args as args_1 } from "../Commands";
import fs from "node:fs";
import path from "node:path";
import { blue, green, red, yellow } from "../Colors";
import { Command, Arg } from "../../types/interfaces";
import TEV from "../../main";
import loadArguments from "../Arguments";

const version = (tev: TEV, args: string[]): void => {
    const command: Command = commands.find((command: Command) => command.name == "version")!;

    // ? When there's no argument.
    if (!args || args.length == 0) {
        const me = JSON.parse(fs.readFileSync(path.join(".", "package.json"), "utf-8"));

        if (!me || !me.devDependencies?.tev)
            return void console.error(`${red(text)} - Not able to find this information.`);
        else return void console.info(`${blue(text)} - Currently running on V${me.devDependencies.tev}.`);
    }

    // ? Executes the argument.
    if (args[0]) {
        loadArguments(command, args);
    }
};

export default version;
