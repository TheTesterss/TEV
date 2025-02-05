import { commands, text, args as args_1 } from "../Commands";
import { blue, green, red, yellow } from "../Colors";
import { Command, Arg, Lib } from "../../types/interfaces";
import TEV from "../../main";
import loadArguments from "../Arguments";

const package_1 = (tev: TEV, args: string[]): void => {
    const command: Command = commands.find((command: Command) => command.name == "package")!;
    const options: String[] = ["add", "del", "reset"];

    // ? Three cases: an option, an argument, none of both.
    if (options.includes(args[0]) && (args[1] || args[0] === "reset")) {
        switch (args[0]) {
            case "add":
                downloadLib(tev, args[1]);
                break;
            case "del":
                deleteLib(tev, args[1]);
                break;
            case "reset":
                resetLibs(tev);
                break;
        }
    } else if (command.availableArgs.includes(args[0])) {
        loadArguments(command, args);
    } else {
        console.error(`${red(text)} - ${red(args[0])} is not correct.\n`);
        console.error(yellow(`${text} - Available usage(s):`));
        let i: number = 0;
        for (const usage of command.usages) {
            i++;
            console.error(`${" ".repeat(15 - i.toString().length)}${yellow(i.toString())} | ${usage}`);
        }
    }
};

// ? Commands used to download, delete and reset all the libs.
const downloadLib = (tev: TEV, libName: string) => {
    tev.addLibrairy(libName);
};

const deleteLib = (tev: TEV, libName: string) => {
    tev.delLibrairy(libName);
};

const resetLibs = (tev: TEV) => {
    tev.config.content.libs.forEach((lib: Lib) => {
        tev.delLibrairy(lib.name);
    });
};

export default package_1;
