#!/usr/bin/env node
import { program } from "commander";
import fs from "node:fs";
import path from "node:path";
import Core from "./classes/Core";

class TEV {
    private configPath: string | null;

    constructor() {
        this.configPath = null;
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

        const core = new Core(config);
        await core.load();
    }
}

const tev = new TEV();

program
    .version("1.0.0")
    .description("TEV CLI Tool")
    .option("--set-config <path>", "Set the configuration file.", (path) => {
        tev.setConfigPath(path);
    })
    .action(() => {
        tev.run();
    })
    .parse(process.argv);
