import TEV from "../main";
import fs from "node:fs";
import path from "node:path";
import CommandExecutor from "./CommandExecutor";

export default class CommandLoader {
    private tev!: TEV;

    public async loadMain(main: TEV): Promise<void> {
        this.tev = main;

        if (!("main" in this.tev.config.content)) {
            throw new Error("[TEV - Error] - Main is a required argument.");
        }

        const commands = fs.readFileSync(path.resolve(process.cwd(), this.tev.config.content.main), "utf-8").trim();
        const executor = new CommandExecutor(this.tev);
        await executor.execute(commands.split("\n"));
    }
}
