import { toStringTag, typeOf } from "../type-of";

const primitives = [
    ["string",  "String"],
    [0,         "Number"],
    [BigInt(0), "BigInt"],
    [true,      "Boolean"],
    [Symbol(),  "Symbol"],
    [null,      "Null"],
    [void 0,    "Undefined"],
] as const;

describe("toStringTag", () => {
    test.each(primitives)("toStringTag(%p)", (value, stringTag) => {
        expect(toStringTag(value)).toBe(stringTag);
    });
    test("object", () => {
        expect(toStringTag([])).toBe("Array");
        expect(toStringTag(/./)).toBe("RegExp");
        expect(toStringTag({ [Symbol.toStringTag]: "StringTag" })).toBe("StringTag");
        expect(toStringTag({})).toBe("Object");
        expect(toStringTag(new class MyClass {})).toBe("Object");
    });
});

describe("typeOf", () => {
    test.each(primitives)("typeOf(%p)", (value, stringTag) => {
        expect(typeOf(value)).toBe(stringTag.toLowerCase());
    });
    test("object", () => {
        expect(typeOf([])).toBe("Array");
        expect(typeOf(/./)).toBe("RegExp");
        expect(typeOf({ [Symbol.toStringTag]: "StringTag" })).toBe("StringTag");
        expect(typeOf({})).toBe("Object");
        expect(typeOf(new class MyClass {})).toBe("MyClass");
    });
    test("invalid constructor", () => {
        expect(typeOf({ constructor: null })).toBe("Object");
        expect(typeOf({ constructor: { name: "" } })).toBe("Object");
        expect(typeOf({ constructor: { name: 42 } })).toBe("Object");
    });
});
