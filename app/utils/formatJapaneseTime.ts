export function formatJapaneseTime(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}年${month}月${day}日${hours}時${minutes}分`;
}
