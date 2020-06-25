import {
    QueryResponseCache,
    FetchFunction,
} from 'relay-runtime';
import errorHandler from './errorHandler';

const cacheTimeMs = 1 * 1000;
const cache = new QueryResponseCache({ size: 250, ttl: cacheTimeMs });

const getFetchQueryFunction = (endpoint: string, accessToken: string): FetchFunction => async (
    operation,
    variables,
    cacheConfig
) => {
    const queryID = operation.text;
    const isMutation = operation.operationKind === 'mutation';
    const isQuery = operation.operationKind === 'query';
    const forceFetch = cacheConfig && cacheConfig.force;
    const fromCache = cache.get(queryID ?? '', variables);

    if (isQuery && fromCache !== null && !forceFetch) {
        return fromCache;
    }

    if (isMutation) {
        cache.clear();
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    });

    const json = await response.json();

    if (json.errors) {
        if (Array.isArray(json.errors)) {
            throw new Error(errorHandler(json.errors));
        }
    }

    return json;
};

export default getFetchQueryFunction;
