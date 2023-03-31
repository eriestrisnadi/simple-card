export function maskPossiblePhone(text: string) {
  if (typeof text !== "string") return;

  const re = /(\d{4})(\s*)(\d{4})/g; // SG possible phone numbers
  const result = text.replace(
    re,
    (_, group1, group2, group3) =>
      `${group1}${group2}${"X".repeat(group3.length)}`
  );

  return result;
}

export default maskPossiblePhone;
