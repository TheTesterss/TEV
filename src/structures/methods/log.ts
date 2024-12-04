import { ArgTypes, Types } from "../../types/enums";

export const $log = {
    type: Types.METHOD,
    lib: null,
    args: [
        { name: "content", type: ArgTypes.CONTENT,  required: false }
    ],
    // ? Logs something into the console.
    run: (content: string): void => {
        return void console.log(content);
    }
}