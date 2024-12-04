import TEV from "../Main";
import { Command } from "../types/interfaces";

export const commands = [
    {
        name: "config",
        description: "Sets the json configuration file.",
        availableArgs: ["--help", "-h", "--usage", "-u"],
        usages: ["tev config [path]", "tev config [args]"]
    },
    {
        name: "help",
        description: "Shows informations about commands.",
        availableArgs: ["--usage", "-u"],
        usages: ["tev help", "tev help [command]", "tev help [args]"]
    },
    {
        name: "init",
        description: "Creates and corrects the json configuration file.",
        availableArgs: ["--help", "-h", "--usage", "-u"],
        usages: ["tev init [args]"]
    },
    {
        name: "package",
        description: "Manages the imported librairies",
        availableArgs: ["--help", "-h", "--usage", "-u"],
        usages: ["tev package [add] [name]", "tev package [remove] [name]", "tev package [reset]", "tev package [args]"]
    },
    {
        name: "run",
        description: "Runs a tev file.",
        availableArgs: ["--help", "-h", "--usage", "-u"],
        usages: ["tev run", "tev run [args]"]
    },
    {
        name: "version",
        description: "Prints the used version of TEV",
        availableArgs: ["--help", "-h", "--usage", "-u"],
        usages: ["tev version [args]"]
    }
];
// TODO: --compile=false/true | Sets the compile mode, if true the code will be compiled else the code will be interpreted.
export const args = [
    { name: "--help", description: "Prints some details about a command." },
    { name: "-h", description: "Prints some details about a command." },
    { name: "--usage", description: "Shows the usage for this command." },
    { name: "-u", description: "Shows the usage for this command." },
    { name: "--auto", description: "Automatically complete the configuration." },
    { name: "-a", description: "Automatically complete the configuration." }
];
export const text = "[TEV - Command]";

// ? Execute the matched command.
export const Commands = (tev: TEV) => {
    const command = process.argv.slice(2);
    if (commands.some((cmd: Command) => cmd.name === command[0])) {
        const cmd = require(`./commands/${command[0]}`).default;
        cmd(tev, command.slice(1));
    }
};
