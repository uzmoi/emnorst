
export const isPrimitive = (value) => {
    const type = typeof value;
    return value == null
        || type === "string"
        || type === "number"
        || type === "boolean"
        || type === "bigint"
        || type === "symbol";
};
