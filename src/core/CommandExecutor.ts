import * as fs from "fs";
import * as path from "path";
import CommandResolver from "./CommandResolver";
import { commandMap } from "./CommandMap";

export default class CommandExecutor {
    private config: any;

    constructor(config: any) {
        this.config = config;
    }

    public async load(): Promise<void> {
        await this.readMainFile();
    }

    private async readMainFile(): Promise<void> {
        const mainFilePath = path.resolve(process.cwd(), this.config.main);
        const commands = fs.readFileSync(mainFilePath, "utf-8").trim().split("\n");
        const resolver = new CommandResolver();

        for (const command of commands) {
            try {
                this.validateCommand(command);
                const resolvedCommand = await resolver.resolve(command);
                await this.executeCommand(resolvedCommand);
            } catch (error: any) {
                const line = commands.indexOf(command) + 1;
                console.error(`Error processing command on line ${line} ("${command}"):`, error.message);
            }
        }
    }

    private validateCommand(command: string): void {
        const openBrackets = (command.match(/\[/g) || []).length;
        const closeBrackets = (command.match(/\]/g) || []).length;
        if (openBrackets !== closeBrackets) {
            throw new Error("Unmatched brackets in command");
        }
    }

    private async executeCommand(command: string): Promise<void> {
        const matches = command.match(/\$(\w+)\[(.+?)\]/);
        if (matches) {
            const method = matches[1];
            const args = matches[2].split(";").map((arg) => arg.trim());

            const resolvedArgs = await Promise.all(
                args.map(async (arg) => {
                    if (arg.startsWith("$")) {
                        const resolvedArg = await this.resolveNestedCommand(arg);
                        return resolvedArg;
                    }
                    return arg;
                })
            );
            if (commandMap[`$${method}`]) {
                await commandMap[`$${method}`](...resolvedArgs);
            }
        } else if (commandMap[command]) {
            await commandMap[command]();
        }
    }

    private async resolveNestedCommand(command: string): Promise<string> {
        const resolver = new CommandResolver();
        const resolvedCommand = await resolver.resolve(command);
        return resolvedCommand;
    }
}
