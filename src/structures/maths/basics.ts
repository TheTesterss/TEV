import { red } from "../../modules/Colors";
import { ArgTypes, Types } from "../../types/enums";
import { $isNaN } from "./isNaN";

export const $sum = {
    name: "$sum",
    type: Types.METHOD,
    lib: "maths",
    args: [{ name: "numbers...", type: ArgTypes.CONTENT, required: true }],
    // ? Adds two numbers.
    run: (...args: string[]): number => {
        let s: number = 0;
        for (const arg of args) {
            if ($isNaN.run(arg)) throw new Error(`${red("[TEV - Error]")} - Invalid number found in: ${red(arg)}`);
            s += parseFloat(arg);
        }
        return s;
    }
};

export const $sub = {
    name: "$sub",
    type: Types.METHOD,
    lib: "maths",
    args: [{ name: "numbers...", type: ArgTypes.CONTENT, required: true }],
    // ? Substracts two numbers.
    run: (...args: string[]): number => {
        let s: number = parseFloat(args[0]);
        for (const arg of args.slice(1)) {
            if ($isNaN.run(arg)) throw new Error(`${red("[TEV - Error]")} - Invalid number found in: ${red(arg)}`);
            s -= parseFloat(arg);
        }
        return s;
    }
};

export const $divide = {
    name: "$divide",
    type: Types.METHOD,
    lib: "maths",
    args: [{ name: "numbers...", type: ArgTypes.CONTENT, required: true }],
    // ? Divides two numbers.
    run: (...args: string[]): number => {
        let s: number = parseFloat(args[0]);
        for (const arg of args.slice(1)) {
            if ($isNaN.run(arg)) throw new Error(`${red("[TEV - Error]")} - Invalid number found in: ${red(arg)}`);
            s /= parseFloat(arg);
        }
        return s;
    }
};

export const $multi = {
    name: "$multi",
    type: Types.METHOD,
    lib: "maths",
    args: [{ name: "numbers...", type: ArgTypes.CONTENT, required: true }],
    // ? Mutiplies two numbers.
    run: (...args: string[]): number => {
        let s: number = parseFloat(args[0]);
        for (const arg of args.slice(1)) {
            if ($isNaN.run(arg)) throw new Error(`${red("[TEV - Error]")} - Invalid number found in: ${red(arg)}`);
            s *= parseFloat(arg);
        }
        return s;
    }
};

export const $modulo = {
    name: "$modulo",
    type: Types.METHOD,
    lib: "maths",
    args: [{ name: "numbers...", type: ArgTypes.CONTENT, required: true }],
    // ? Returns the rest of the division
    run: (...args: string[]): number => {
        let s: number = parseFloat(args[0]);
        for (const arg of args.slice(1)) {
            if ($isNaN.run(arg)) throw new Error(`${red("[TEV - Error]")} - Invalid number found in: ${red(arg)}`);
            s %= parseFloat(arg);
        }
        return s;
    }
};

export const $power = {
    name: "$power",
    type: Types.METHOD,
    lib: "maths",
    args: [{ name: "numbers...", type: ArgTypes.CONTENT, required: true }],
    // ? Returns the number of a number to the power of a second number.
    run: (...args: string[]): number => {
        let s: number = parseFloat(args[0]);
        for (const arg of args.slice(1)) {
            if ($isNaN.run(arg)) throw new Error(`${red("[TEV - Error]")} - Invalid number found in: ${red(arg)}`);
            s ^= parseFloat(arg);
        }
        return s;
    }
};
