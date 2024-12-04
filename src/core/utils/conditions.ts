import { ArgTypes, Types } from "../../types/enums";

export const $checkCondition = {
    type: Types.METHOD,
    lib: null,
    args: [
        { name: "condition", type: ArgTypes.CONTENT, required: true }
    ],
    // ? Verifies if a javascript condition is true or false.
    run: (condition: string): boolean => {
        return !!eval(condition);
    }
}