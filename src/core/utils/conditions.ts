import { Types, ArgTypes } from "../../types/enums";

export const $checkCondition = {
    name: "$checkCondition",
    lib: null,
    type: Types.METHOD,
    args: [{ name: "condition", type: ArgTypes.CONTENT, required: true }],
    run: (condition: string): boolean => {
        return !!eval(condition);
    }
};
