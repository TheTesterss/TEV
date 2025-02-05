import { red } from "../../modules/Colors";
import { ArgTypes, Types } from "../../types/enums";
import { $isNaN } from "./isNaN";

export const $floor = {
    name: "$floor",
    type: Types.METHOD,
    lib: "maths",
    args: [{ name: "number", type: ArgTypes.CONTENT, required: true }],
    // ? Round the given number to the nearest and greater integer.
    run: (number: string): number => {
        if ($isNaN.run(number)) throw new Error(`${red("[TEV - Error]")} - Invalid number found in: ${red(number)}`);
        return Math.floor(parseFloat(number));
    }
};

export const $ceil = {
    name: "$ceil",
    type: Types.METHOD,
    lib: "maths",
    args: [{ name: "number", type: ArgTypes.CONTENT, required: true }],
    // ? Round the given number to the nearest and lower integer.
    run: (number: string): number => {
        if ($isNaN.run(number)) throw new Error(`${red("[TEV - Error]")} - Invalid number found in: ${red(number)}`);
        return Math.ceil(parseFloat(number));
    }
};

export const $round = {
    name: "$round",
    type: Types.METHOD,
    lib: "maths",
    args: [{ name: "number", type: ArgTypes.CONTENT, required: true }],
    // ? Round the given number.
    run: (number: string): number => {
        if ($isNaN.run(number)) throw new Error(`${red("[TEV - Error]")} - Invalid number found in: ${red(number)}`);
        return Math.round(parseFloat(number));
    }
};
