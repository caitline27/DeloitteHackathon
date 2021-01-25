import { Base, Type } from "./type";
import { Rect } from "./Rect";
import { Uri } from "./Uri";
import { Image } from "./Image";
/**
 * @hidden
 */
export declare class Tile extends Base {
    static $t: Type;
    c: number;
    d: number;
    e: number;
    h: Image;
    g: Image;
    b: Date;
    readonly i: Rect;
    a: boolean;
    f: Uri;
}
