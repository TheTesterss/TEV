#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { ConfigContentType, ConfigType } from "./types/interfaces";
import CommandLoader from "./core/CommandLoader";
import { Commands } from "./modules/Commands";
import { blue, green, red, yellow } from "./modules/Colors";
import { Lib } from "./types/interfaces";

export default class TEV {
    // * Default configuration.
    public config: ConfigType = {
        path: path.resolve(process.cwd(), ".tev.json"),
        content: {
            events: "",
            libs: [],
            main: ""
        }
    };
    public text: string = "[TEV - Config]"
    private listLibs: Lib[] = [
        { name: "os", description: "Allows the usage of os functions and methods.", version: "0.0.1", author: "TheTesterss" },
        { name: "events", description: "Allows the usage of custom events.", version: "0.0.1", author: "TheTesterss" },
        { name: "path", description: "Allows the usage of path methods.", version: "0.0.1", author: "TheTesterss" },
        { name: "fs", description: "Allows the usage of commands to manage the file system.", version: "0.0.1", author: "TheTesterss" },
        { name: "axios", description: "Allows the usage of methods to request to apis.", version: "0.0.1", author: "TheTesterss" }
    ];

    constructor() {
        this.loadInitialConfig();
    }

    private loadInitialConfig(): void {
        if (fs.existsSync(this.config.path)) {
            const content = fs.readFileSync(this.config.path, "utf-8");
            const json = JSON.parse(content) as ConfigContentType;
            // ? Loads the new configurations.
            this.config.content = { ...this.config.content, ...json };
            this.saveConfig();
        }
    }

    public loadConfig(file?: string): void {
        if (file && typeof file !== "string") {
            console.error(`${red(this.text)} : The registered file must be a valid string.`);
            process.exit(1);
        }

        this.config.path = file ? path.resolve(process.cwd(), file) : this.config.path;
        if (!fs.existsSync(this.config.path) || !this.config.path.endsWith(".json")) {
            console.error(`${red(this.text)} : No configuration file found for ${red(this.config.path)}`);
            process.exit(1);
        }

        const config_1: ConfigContentType = JSON.parse(fs.readFileSync(this.config.path, "utf-8"));

        if (config_1.events && typeof config_1.events === "string") {
            this.config.content.events = config_1.events;
            console.log(`${green(this.text)} : Event folder found and now available: ${green(this.config.content.events)}`);
        }

        if (config_1.main && typeof config_1.main === "string") {
            this.config.content.main = config_1.main;
            console.log(`${green(this.text)} : Main file found and now available: ${green(this.config.content.main)}`);
        }

        this.saveConfig();
    }

    public addLibrairy(lib: string): void {
        if (this.config.content.libs.some((lib_1: Lib) => lib_1.name === lib)) {
            console.warn(`${yellow(this.text)} : Library ${yellow(lib)} is already downloaded.`);
            return;
        }

        if (!this.listLibs.some((lib_1: Lib) => lib_1.name === lib)) {
            console.error(`${red(this.text)} : Library ${red(lib)} not recognized by the system.`);
            process.exit(1);
        }

        // ? Adds library and update configuration file.
        const me: Lib = this.listLibs.find((lib_1: Lib) => lib_1.name === lib)!;
        this.config.content.libs.push(
            { name: me.name, description: me.description, version: me.version, addedAt: Math.floor(Date.now() / 1000), author: me.author }
        );
        this.saveConfig();
        console.info(`${blue(this.text)} : ${green(lib)} has been downloaded.`);
    }

    public delLibrairy(lib: string): void {
        if (!this.config.content.libs.some((lib_1: Lib) => lib_1.name === lib)) {
            console.warn(`${yellow(this.text)} : Library ${yellow(lib)} is not currently downloaded.`);
            return;
        }

        // ? Removes library from the array and update configuration.
        this.config.content.libs = this.config.content.libs.filter((lib_1: Lib) => lib_1.name !== lib);
        this.saveConfig();
        console.info(`${blue(this.text)} : ${green(lib)} has been undownloaded.`);
    }

    private saveConfig(): void {
        // ? Saves in the json configurated file.
        fs.writeFileSync(this.config.path, JSON.stringify(this.config.content, null, 4), "utf-8");
    }

    public async run(): Promise<void> {
        const loader = new CommandLoader();
        await loader.loadMain(this);
    }
}

// ! Initialization of each commands.
const tev = new TEV();
Commands(tev);
