import { commands, text, args as args_1 } from "../Commands";
import { blue, green, red, yellow } from "../Colors";
import { Command, Arg } from "../../types/interfaces";
import TEV from "../../Main";
import loadArguments from "../Arguments";

const run = async (tev: TEV, args: string[]): Promise<void> => {
    const command: Command = commands.find((command: Command) => command.name == "version")!;

    // ? Arguments executed first, otherwise it executes the configurated main file.
    if (args[0]) {
        loadArguments(command, args);
    } else {
        await tev.run();
    }
};

export default run;
