export const toDBFormat = (date: Date | null) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
  
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};
  
export const fromDBFormat = (str: string | null) => {
    if (!str) return null;

    const [datePart, timePart] = str.split("T");
    if (!datePart || !timePart) return null;

    const [dd, mm, yyyy] = datePart.split("/").map(Number);
    const [HH, ii, ss] = timePart.split(":").map(Number);

    return new Date(yyyy, mm - 1, dd, HH, ii, ss);
};

export const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};