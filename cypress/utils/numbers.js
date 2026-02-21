export const toNumber = (value) => Number(String(value ?? "").replace(/\D/g, ""));
