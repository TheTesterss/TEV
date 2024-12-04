import { FunctionType } from "../types/interfaces";
// import * as attributes from "../structures/attributes/index";
import * as methods from "../structures/methods/index";
import { $checkCondition } from "./utils/conditions";
import { $stripeComment } from "./utils/comments";

const CommandMap: { [key: string]: FunctionType } = {
    // ? Methods
    $log: methods.$log,
    $stack: methods.$stack,
    $get: methods.$get,

    // ? Attributes

    // ? Customized
    $checkCondition: $checkCondition,
    $stripeComment: $stripeComment
}

export default CommandMap;