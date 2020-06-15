export const formatDate = (date: Date): string => {
    const dd: string = date.getDate() < 10
        ? "0" + date.getDate().toString()
        : date.getDate().toString();
    const mm: string = (date.getMonth() + 1) < 10
        ? "0" + (date.getMonth() + 1).toString()
        : (date.getMonth() + 1).toString();
    const yy: string = (date.getFullYear() % 100) < 10
        ? "0" + (date.getFullYear() % 100).toString()
        : (date.getFullYear() % 100).toString();

    return `${dd}.${mm}.${yy}`;
}