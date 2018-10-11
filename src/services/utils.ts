import { stringify } from "querystring";
import { Range } from "immutable";

export function padLeft(s: string, n: number, padWith: string = "0"): string {
    let toBePadded = n - s.length;
    if (toBePadded <= 0) {
        return s;
    }
    if (toBePadded % padWith.length !== 0) {
        throw new Error("Cannot pad if it doesn't fit");
    }
    let howMany = toBePadded / padWith.length;
    return Range(0, howMany).map(i => padWith).concat([s]).join("");
}