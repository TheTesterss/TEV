import TEV from "../Main";
import fs from "node:fs";
import path from "node:path";
import { red } from "../modules/Colors";

export default class CommandLoader {
    private tev!: TEV;

    public async loadMain(main: TEV): Promise<void> {
        this.tev = main;

        // ? Checks if there's a main file.
        if (!("main" in this.tev.config.content)) {
            console.error(`${red(main.text)} - Main is a required argument.`);
            process.exit(1);
        }

        // ? commands is the name given to the file content including a code made from "tev" functions.
        const commands = fs.readFileSync(path.resolve(process.cwd(), this.tev.config.content.main));
    }
}
