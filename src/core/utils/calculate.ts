import Resolver from "../CommandResolver";
import { Types, ArgTypes } from "../../types/enums";

export const $calculate = {
    name: "$calculate",
    lib: null,
    type: Types.METHOD,
    args: [
        { name: "expression", type: ArgTypes.CONTENT, required: true },
        { name: "resolver", type: ArgTypes.CONTENT, required: false }
    ],
    run: async (expression: string, resolver: Resolver): Promise<number> => {
        return eval(expression);
    }
};
