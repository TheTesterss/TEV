import { ArgTypes, Types } from "../../types/enums";

export const $stripeComment = {
    type: Types.METHOD,
    lib: null,
    args: [
        { name: "command", type: ArgTypes.CONTENT, required: true }
    ],
    // ? Removes comments from a command.
    run: (command: string): string => {
        const commentIndex = command.indexOf("$c ");
        if (commentIndex !== -1) {
            return command.slice(0, commentIndex).trim();
        }
        return command.trim();
    }
}