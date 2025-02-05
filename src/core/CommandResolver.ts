import { only } from "node:test";
import { red } from "../modules/Colors";
import { FunctionArgType } from "../types/interfaces";
import CommandExecutor from "./CommandExecutor";

export default class CommandResolver {
    private text: string = "[TEV - Error]";
    private executor: CommandExecutor;

    constructor(executor: CommandExecutor) {
        this.executor = executor;
    }

    private parseArguments(argsString: string): string[] {
        let args: string[] = [];
        let currentArg = '';
        let depth = 0;

        for (let i = 0; i < argsString.length; i++) {
            let char = argsString[i];

            if (char === '[') depth++;
            if (char === ']') depth--;

            if (char === ';' && depth === 0) {
                // Ajoute l'argument uniquement si on n'est pas dans une fonction imbriquée
                args.push(currentArg.trim());
                currentArg = '';
            } else {
                currentArg += char;
            }
        }

        if (currentArg) {
            args.push(currentArg.trim());
        }

        return args;
    }

    public async resolve(command: string): Promise<{ method: string, args: string[] }> {
        // ? Handle attributes.
        if (/^\$\w+$/.test(command) && this.executor.CommandMap[command]) {
            const method = command;
            return { method, args: [] };
        }

        // ? Handle methods.
        const matches = command.match(/^\$(\w+)\[(.*)\]$/);

        if (!matches) {
            throw new Error(`${red("[TEV - Error]")} - ${red(command)} is incorrectly written.`);
        }

        const method = `$${matches[1]}`;
        const argsString = matches[2];

        if (!this.executor.CommandMap[method]) {
            throw new Error(`${red("[TEV - Error]")} - ${red(command)} is not a valid function.`);
        }

        const args = this.parseArguments(argsString);

        if (this.executor.CommandMap[method].args!.filter((arg: FunctionArgType) => arg.required).length > args.length) {
            throw new Error(`${red("[TEV - Error]")} - ${red(command)} asked for ${this.executor.CommandMap[method].args!.filter((arg: FunctionArgType) => arg.required).length} args but only received ${args.length}.`);
        }

        return { method, args };
    }

    public async resolveSome(command: string): Promise<{ method: string, args: string[] }> {
        const matches = command.match(/^\$(\w+)\[(.*)\]$/);

        if (!matches) {
            throw new Error(`${red("[TEV - Error]")} - ${red(command)} is incorrectly written.`);
        }

        const method = `$${matches[1]}`;
        const args = this.parseArguments(matches[2]);

        return { method, args };
    }

    public async resolveArg(arg: string, rec: number = 0): Promise<any> {
        const max = 100;
        if (rec > max) {
            throw new Error(`${red(this.text)} - Maximum recursive loop for: ${red(arg)}`);
        }

        if (arg.startsWith("$")) {
            const { method, args } = await this.resolve(arg);

            if (this.executor.CommandMap[method]) {
                const resolvedArgs = await Promise.all(args.map((arg_1: string) => this.resolveArg(arg_1, rec + 1)));
                return await this.executor.CommandMap[method].run(...resolvedArgs);
            } else {
                throw new Error(`${red(this.text)} - Invalid method found in argument: ${red(arg)}`);
            }
        }
        return arg;
    }

    public async resolveConditionArg(condition: string): Promise<string> {
        const matches = condition.match(/\$[a-zA-Z]+\[.*?\]/g);
        if (!matches) return condition;
        for (const match of matches) {
            const { method, args } = await this.resolve(match);
            if (this.executor.CommandMap[method]) {
                const resolved = await this.executor.CommandMap[method].run(...args);
                condition = condition.replace(match, resolved.toString());
            } else {
                throw new Error(`${red(this.text)} - Invalid method found in argument: ${red(match)}`);
            }
        }
    
        return condition;
    }
}