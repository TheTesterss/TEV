import { commandMap } from "./CommandMap";

export default class CommandResolver {
    public async resolve(command: string): Promise<string> {
        return await this.processNested(command);
    }

    private async processNested(command: string): Promise<string> {
        const bracketStack: number[] = [];
        let updatedCommand = command;

        for (let i = 0; i < updatedCommand.length; i++) {
            if (updatedCommand[i] === "[") {
                bracketStack.push(i);
            } else if (updatedCommand[i] === "]") {
                const startIndex = bracketStack.pop();
                if (bracketStack.length === 0 && startIndex !== undefined) {
                    const nestedCommand = updatedCommand.slice(startIndex + 1, i);
                    const methodStart = updatedCommand.lastIndexOf("$", startIndex - 1);
                    const method = updatedCommand.slice(methodStart + 1, startIndex);
                    const resolvedValue = await this.resolveVariable(method, nestedCommand);
                    updatedCommand = updatedCommand.slice(0, methodStart) + resolvedValue + updatedCommand.slice(i + 1);
                    i = methodStart + (resolvedValue?.length || 0) - 1;
                }
            }
        }

        return updatedCommand;
    }

    private async resolveVariable(method: string, arg: string): Promise<any> {
        if (commandMap[`$${method}`]) {
            const args = arg.split(";").map((a) => a.trim());

            const resolvedArgs = await Promise.all(
                args.map(async (a) => {
                    if (a.match(/^\$\w+\[.*\]$/)) {
                        return await this.processNested(a);
                    }
                    return a;
                })
            );

            if (typeof commandMap[`$${method}`] === "function") {
                const result = await commandMap[`$${method}`](...resolvedArgs);
                return result;
            }
            throw new Error(`Method ${method} is not a function`);
        }
        return `$${method}[${arg}]`;
    }
}
