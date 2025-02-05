import { ArgTypes, Types } from "../../types/enums";

export const $stripeComment = {
    name: "$stripeComment",
    lib: null,
    type: Types.METHOD,
    args: [{ name: "command", type: ArgTypes.CONTENT, required: true }],
    //? Removes comments from a command.
    run: (command: string): string => {
        command = command.replace(/\$c\[.*?\]/gs, "").trim();
        return command.includes("$c ") ? command.split("$c ")[0].trim() : command;
    }
};
