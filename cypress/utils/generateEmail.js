export function generateEmail(prefix = "e2eTest") {
  return `${prefix}+${Date.now()}@example.com`;
}
