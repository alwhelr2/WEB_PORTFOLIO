export function ARGBtoRGBA( num: number ) {
    num >>>= 0;
    const b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16,
        a = 1;
    return "rgba(" + [ r, g, b, a ].join(",") + ")";
}