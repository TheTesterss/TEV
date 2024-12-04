import { red, yellow } from "../modules/Colors";
import { $stripeComment } from "./utils/comments";
import CommandMap from "./CommandMap";
import Resolver from "./CommandResolver";
import { $checkCondition } from "./utils/conditions";

export default class CommandExecutor {
    private conditions: boolean[] = [];
    private shouldSkipBlocks: boolean[] = [];
    private text: string = "[TEV - Error]";
    private resolver: Resolver = new Resolver();

    constructor() {}

    public async execute(commands: string[]): Promise<void> {
        for (let i = 0; i < commands.length; i++) {
            let command = commands[i].trim();

            // ? Ignores empty lines and comments
            command = $stripeComment.run(command);
            if (command === "") continue;

            // ? Runs the if.
            const block = this.conditions[this.conditions.length - 1] ?? true;
            try {
                if (command.startsWith("$if")) {
                    const condition = await this.evaluateCondition(command);
                    this.conditions.push(block && condition);
                    this.shouldSkipBlocks.push(!(block && condition));
                } else if (command.startsWith("$elseif")) {
                    if (this.conditions.length === 0) {
                        throw new Error(`${red(this.text)} - Unexpected ${red("$elseif")} without opened ${red("$if")}.`);
                    }
                    if(this.conditions[this.conditions.length - 1]) {
                        this.shouldSkipBlocks[this.shouldSkipBlocks.length - 1] = true
                        continue;
                    }
                    const condition = await this.evaluateCondition(command);
                    this.shouldSkipBlocks[this.shouldSkipBlocks.length - 1] = false
                    this.conditions[this.conditions.length - 1] = condition;
                } else if (command.startsWith("$else")) {
                    if (this.conditions.length === 0) {
                        throw new Error(`${red(this.text)} - Unexpected ${red("$else")} without opened ${red("$if")}.`);
                    }
                    if(this.conditions[this.conditions.length - 1]) {
                        this.shouldSkipBlocks[this.shouldSkipBlocks.length - 1] = true
                        continue;
                    }
                    this.shouldSkipBlocks[this.shouldSkipBlocks.length - 1] = false
                    this.conditions[this.conditions.length - 1] = true;
                } else if (command.startsWith("$endif")) {
                    if (this.conditions.length === 0) {
                        throw new Error(`${red(this.text)} - Unexpected ${red("$endif")} without opened ${red("$if")}.`);
                    }
                    this.conditions.pop();
                } else if (block && this.conditions.every((c) => c)) {
                    if(this.shouldSkipBlocks[this.shouldSkipBlocks.length - 1]) {
                        continue
                    }
                    await this.executeCommand(command);
                }
            } catch (e: any) {
                throw new Error(`${red(this.text)} - An error occured while running the program. At: ${yellow((i + 1).toString())}, In: ${yellow(command)}, Reason: ${e}`);
            }
        }

        if (this.conditions.length !== 0) {
            throw new Error(`${red(this.text)} - An error occured while running the program. At: ${yellow((commands.length).toString())}, Reason: ${red(this.text)} - ${red("$if")} opened but never closed.`)
        }
    }

    private async executeCommand(command: string): Promise<void> {
        const { method, args } = await this.resolver.resolve(command);
        if (method === "") {
            throw new Error(`${red(this.text)} - Invalid method found in: ${red(command)}`);
        }

        const finalArgs = await Promise.all(args.map((arg: string) => this.resolver.resolveArg(arg)));

        if (CommandMap[method]) {
            await CommandMap[method].run(...finalArgs);
        } else {
            throw new Error(`${red(this.text)} - Invalid method found: ${red(method)}`);
        }
    }

    private async evaluateCondition(command: string): Promise<boolean> {
        const matches = command.match(/^\$[a-zA-Z]+\[(.+?)\]$/);
        if (!matches || matches.length < 2) {
            throw new Error(`${red(this.text)} - The condition for the command: ${command} is invalid.`);
        }

        const condition = matches[1];
        try {
            const resolved = await this.resolver.resolveConditionArg(condition);
            return $checkCondition.run(resolved);
        } catch (e) {
            throw new Error(`${red(this.text)} - The condition for the command: ${command} is invalid.`);
        }
    }
}
