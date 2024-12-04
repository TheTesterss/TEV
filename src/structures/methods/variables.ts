import { ArgTypes, Types } from "../../types/enums";

const storage: { [key: string]: any } = {};

export const $stack = {
    type: Types.METHOD,
    lib: null,
    args: [
        { name: "key", type: ArgTypes.CONTENT,  required: true },
        { name: "value", type: ArgTypes.CONTENT,  required: true }
    ],
    // ? Stocks a value locally.
    run: (key: string, value: string): void => {
        storage[key] = value;
        return;
    }
}

export const $get = {
    type: Types.METHOD,
    lib: null,
    args: [
        { name: "key", type: ArgTypes.CONTENT,  required: true }
    ],
    // ? Returns a locally stocked value.
    run: (key: string): void => {
        return storage[key]
    }
}