import { Types, ArgTypes } from "../../types/enums";

export const $isNaN = {
    name: "$isNaN",
    type: Types.METHOD,
    lib: "maths",
    args: [{ name: "number", type: ArgTypes.CONTENT, required: true }],
    // ? Verifies if the entered value is a number.
    run: (number: string): boolean => {
        return isNaN(parseFloat(number));
    }
};
