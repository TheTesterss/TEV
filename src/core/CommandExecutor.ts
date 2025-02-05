import Resolver from "./CommandResolver";
import { $stripeComment } from "./utils/comments";
import { $checkCondition } from "./utils/conditions";
import { $calculate } from "./utils/calculate";
import * as methods from "../structures/methods/index";
import TEV from "../main";
import { Lib } from "../types/interfaces";

export default class CommandExecutor {
    private conditions: boolean[] = [];
    private shouldSkipBlocks: boolean[] = [];
    private whileStack: { [position: string]: string } = {};
    private resolver: Resolver = new Resolver(this);
    private allowImports: boolean = true;

    public CommandMap: { [key: string]: any } = {
        $log: methods.$log,
        $stack: methods.$stack,
        $get: methods.$get,
        $checkCondition,
        $stripeComment,
        $calculate
    };
    public tev: TEV;

    constructor(tev: TEV) {
        this.tev = tev;
    }

    public async execute(commands: string[]): Promise<void> {
        for (let i = 0; i < commands.length; i++) {
            let command = commands[i].trim();
            command = $stripeComment.run(command);
            if (command === "") continue;

            if (!command.startsWith("$import") && this.allowImports) this.allowImports = false;

            const block = this.conditions[this.conditions.length - 1] ?? true;
            try {
                if (command.startsWith("$if")) {
                    const condition = await this.evaluateCondition(command);
                    this.conditions.push(block && condition);
                    this.shouldSkipBlocks.push(!(block && condition));
                } else if (command.startsWith("$elseif")) {
                    if (this.conditions.length === 0) throw new Error("[TEV - Error] - Unexpected $elseif without $if.");
                    if (this.conditions[this.conditions.length - 1]) {
                        this.shouldSkipBlocks[this.shouldSkipBlocks.length - 1] = true;
                        continue;
                    }
                    const condition = await this.evaluateCondition(command);
                    this.shouldSkipBlocks[this.shouldSkipBlocks.length - 1] = false;
                    this.conditions[this.conditions.length - 1] = condition;
                } else if (command.startsWith("$else")) {
                    if (this.conditions.length === 0) throw new Error("[TEV - Error] - Unexpected $else without $if.");
                    if (this.conditions[this.conditions.length - 1]) {
                        this.shouldSkipBlocks[this.shouldSkipBlocks.length - 1] = true;
                        continue;
                    }
                    this.shouldSkipBlocks[this.shouldSkipBlocks.length - 1] = false;
                    this.conditions[this.conditions.length - 1] = true;
                } else if (command.startsWith("$endif")) {
                    if (this.conditions.length === 0) throw new Error("[TEV - Error] - Unexpected $endif without $if.");
                    this.conditions.pop();
                } else if (command.startsWith("$import")) {
                    if(!this.allowImports) throw new Error("[TEV - Error] - Unexpected $import not in the top part of the script.");
                    const { args } = await this.resolver.resolveSome(command);
                    const lib = this.tev.listLibs.find((lib: Lib) => lib.name === args[0]);
                    if(!lib) throw new Error(`[TEV - Error] - Unknown library "${args[0]}".`);
                    if(!this.tev.config.content.libs.some((lib_1: Lib) => lib_1.name === lib.name)) throw new Error(`[TEV - Error] - Library "${args[0]}" is not downloaded.`);
                    const importations = require(`../structures/${args[0]}/index`);
                    for (const name in importations) if (args.length > 0 && args.slice(1).includes(name)) this.CommandMap[name] = importations[name];
                } else if (command.startsWith("$while")) {
                    const { args } = await this.resolver.resolveSome(command);
                    const condition = await this.resolver.resolveConditionArg(args[0]);
                    if (!$checkCondition.run(condition)) {
                        let found = false;
                        while (i<=commands.length && !found) {
                            i++;
                            if(!commands[i].trim().startsWith("$endWhile")) continue;
                            else found = true
                        }
                        if (!found) throw new Error("[TEV - Error] - Unclosed $while detected.");
                        else delete this.whileStack[Object.keys(this.whileStack)[Object.keys(this.whileStack).length - 1] as string];
                        continue;
                    }
                    this.whileStack[String(i)] = condition;
                } else if (command.startsWith("$endWhile")) {
                    if (Object.keys(this.whileStack).length === 0) throw new Error("[TEV - Error] - Unexpected $endWhile without $while.");
                    const whileIndex = Object.keys(this.whileStack)[Object.keys(this.whileStack).length - 1];
                    if ($checkCondition.run(this.whileStack[whileIndex])) {
                        i = parseInt(whileIndex)-1;
                    } else {
                        console.log('faux', this.whileStack[whileIndex], $checkCondition.run(this.whileStack[whileIndex]))
                        delete this.whileStack[whileIndex];
                        console.log(this.whileStack)
                    }
                } else if (block && this.conditions.every((c) => c)) {
                    if (this.shouldSkipBlocks[this.shouldSkipBlocks.length - 1]) continue;
                    await this.executeCommand(command);
                }
            } catch (e: any) {
                throw new Error(`[TEV - Error] - Error at line ${i + 1}, in: ${command}, Reason: ${e}`);
            }
        }

        if (this.conditions.length !== 0) throw new Error("[TEV - Error] - Unclosed $if detected.");
        if (Object.keys(this.whileStack).length > 0) throw new Error("[TEV - Error] - Unclosed $while detected.");
    }

    private async executeCommand(command: string): Promise<void> {
        const { method, args } = await this.resolver.resolve(command);
        if (!this.CommandMap[method]) throw new Error(`[TEV - Error] - Invalid method found: ${method}`);
        const finalArgs = await Promise.all(args.map((arg) => this.resolver.resolveArg(arg)));
        await this.CommandMap[method].run(...finalArgs);
    }

    private async evaluateCondition(command: string): Promise<boolean> {
        const matches = command.match(/^\$(\w+)\[(.+?)\]$/);
        if (!matches || matches.length < 3) throw new Error(`[TEV - Error] - Invalid condition in: ${command}`);
        return $checkCondition.run(await this.resolver.resolveConditionArg(matches[2]));
    }
}
