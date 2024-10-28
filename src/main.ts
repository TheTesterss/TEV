#!/usr/bin/env node
import { program } from "commander";
import fs from "node:fs";
import path from "node:path";
import CommandExecutor from "./core/CommandExecutor";

// * CLASS THAT HANDLE COMMAND RESPONSES AND START RUNNING THE CORE MODULE.
class TEV {
    private configPath: string;

    constructor() {
        this.configPath = ".tev.json";
    }

    public setConfigPath(configPath: string) {
        if (this.configPath && !fs.existsSync(this.configPath)) {
            console.error("Config file not found:", this.configPath);
            process.exit(1);
        }

        this.configPath = path.resolve(process.cwd(), configPath);
    }

    public async run() {
        if (!this.configPath) {
            console.error("Configuration path is not set.");
            process.exit(1);
        }

        const config = JSON.parse(fs.readFileSync(this.configPath, "utf-8"));
        console.log("Configuration loaded: ", this.configPath);

        // ! RUN THE CORE MODULE.
        const core = new CommandExecutor(config);
        await core.load();
    }
}

const tev = new TEV();

// ? CREATE THE COMMAND
program
    .version("1.0.0")
    .description("TEV CLI Tool")
    .option("--set-config <path>", "Set the configuration file.", (path) => {
        tev.setConfigPath(path);
    })
    .action(() => {
        tev.run(); // ! Functions used to run the core module.
    })
    .parse(process.argv);
