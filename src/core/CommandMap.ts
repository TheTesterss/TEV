// ? Mapping every methods/attributs to be used with their owns arguments and the function that comes with.

import * as methods from "../structures/methods/index";
import * as attributs from "../structures/attributs/index";

export const commandMap: { [key: string]: any } = {
    $log: methods.$log,
    $get: methods.$get,
    $stack: methods.$stack,

    $process: attributs.$process,
    $OS: attributs.$OS
};
