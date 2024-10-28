import * as fs from "fs";
import * as path from "path";
import * as acorn from "acorn";
import { $log } from "../structures/methods/index";
import { $ping } from "../structures/attributs/index";

// Map to store attributes and methods
const commandMap: { [key: string]: any } = {
    $log: $log,
    $ping: $ping
};

class Core {
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

        for (const command of commands) {
            const matches = command.match(/\$(\w+)\[(\$\w+)\]/);
            if (matches) {
                const method = matches[1];
                const attribute = matches[2];

                if (commandMap[`$${method}`] && commandMap[attribute]) {
                    await commandMap[`$${method}`](commandMap[attribute]);
                }
            }
        }
    }
}

export default Core;
