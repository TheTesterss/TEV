import { red } from "../modules/Colors";
import { FunctionArgType } from "../types/interfaces";
import CommandMap from "./CommandMap";

export default class CommandResolver {
    private text: string = "[TEV - Error]";

    public async resolve(command: string): Promise<{ method: string, args: string[] }> {

        // ? Handle attributes.
        if(/^\$\w+$/.test(command) && CommandMap[command]) {
            const method = command;
            return { method, args: [] }
        }

        // ? Handle methods.
        const matches = command.match(/^\$(\w+)\[(.*?)\]$/);

        if(!matches) {
            throw new Error(`${red("[TEV - Error]")} - ${red(command)}'s uncorrectly written.`);
        }

        if(!CommandMap[`$${matches[1]}`]) {
            throw new Error(`${red("[TEV - Error]")} - ${red(command)}'s is not a valid function.`);
        }

        if(CommandMap[`$${matches[1]}`].args!.filter((arg: FunctionArgType) => arg.required).length > matches[2].split(";").filter((arg: string) => arg !== "").length) {
            throw new Error(`${red("[TEV - Error]")} - ${red(command)}'s asked for ${CommandMap[`$${matches[1]}`].args!.filter((arg: FunctionArgType) => arg.required).length} args but only received ${matches[2].split(";").filter((arg: string) => arg !== "").length} args.`);
        }

        const method = `$${matches[1]}`;
        const args = matches[2].split(";").map((arg: string) => arg.trim());
        return { method, args }
    }

    public async resolveArg(arg: string, rec: number = 0): Promise<any> {
        const max = 100;
        if (rec > max) {
            throw new Error(`${red(this.text)} - Maximum recursive loop for: ${red(arg)}`);
        }

        if(arg.startsWith("$")) {
            const { method, args } = await this.resolve(arg);

            if (CommandMap[method]) {
                const resolvedArgs = await Promise.all(args.map((arg_1: string) => this.resolveArg(arg_1, rec + 1)));
                return await CommandMap[method].run(...resolvedArgs);
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
            if (CommandMap[method]) {
                const resolved = await CommandMap[method].run(...args);
                condition = condition.replace(match, resolved.toString());
            } else {
                throw new Error(`${red(this.text)} - Invalid method found in argument: ${red(match)}`);
            }
        }
        return condition;
    }
    
}