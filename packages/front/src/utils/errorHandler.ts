import { PayloadError } from 'relay-runtime';

export default (
    error: unknown,
    actionDescription?: string,
): string => {
    const gqlErrors = error as ReadonlyArray<PayloadError>;
    const messages: string[] = [];
    if (Array.isArray(gqlErrors)) {
        for (const e of gqlErrors) {
            messages.push(e.message);
        }
    } else {
        messages.push((error as Error).message);
    }
    return `${actionDescription ?? 'При выполнении запроса'}, произошл${
        messages.length > 1 ? 'и' : 'а'
        } ошибк${messages.length > 1 ? 'и' : 'а'}:«${messages.join(' ;')}»`;
};
