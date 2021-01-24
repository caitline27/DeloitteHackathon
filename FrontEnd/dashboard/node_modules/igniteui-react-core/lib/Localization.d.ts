import { Base, Type } from "./type";
/**
 * @hidden
 */
export declare class Localization extends Base {
    static $t: Type;
    static a: (arg1: string, arg2: string) => string;
    private static b;
    static register(a: string, b: {
        readonly [key: string]: string;
    }): void;
    static c(a: string, b: string, ...c: any[]): string;
}
