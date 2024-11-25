import { commands, text, args as args_1 } from "../Commands";
import { blue, green, red, yellow } from "../Colors";
import { Command, Arg } from "../../types/interfaces";
import TEV from "../../Main";
import loadArguments from "../Arguments";

const config = async (tev: TEV, args: string[]): Promise<void> => {
    const command: Command = commands.find((command: Command) => command.name == "version")!;
    
    // ? first: the argument is executed, second: the file configures using the first argument as the file path, third: it returns an error if no argument is provided.
    if(command.availableArgs.includes(args[0])) {
        //TODO: Implements auto complete and better configuration methods.
        loadArguments(command, args)
    } else if(args[0]) {
        tev.loadConfig(args[0]);
    } else {
        console.error(`${red(text)} - No file found in the command.`)
    }
}

export default config;