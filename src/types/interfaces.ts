export interface Command {
    name: string;
    description: string;
    availableArgs: string[];
    usages: string[];
}

export interface Arg {
    name: string;
    description: string;
}

export interface Lib {
    name: string;
    description?: string;
    version?: string;
    addedAt?: number;
    author?: string;
}

export interface ConfigType {
    path: string;
    content: ConfigContentType;
}

export interface ConfigContentType {
    main: string;
    events?: string;
    libs: Lib[];

    // TODO: Downloadable libs
    name?: string;
    description?: string;
    links?: ConfigContentLinkTypes;
    version?: string;
}

export interface ConfigContentLinkTypes {
    discord?: string;
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    npm?: string;
    github?: string;
}

export interface FunctionType {
    type: "attribute" | 'method';
    lib?: string | null;
    args?: FunctionArgType[];
    run: (...args: any[]) => any;
}

export interface FunctionArgType {
    name: string;
    type?: "callback" | "number" | "content" | "boolean" | "undefined";
    required?: boolean;
}
