import {GraphQLClient} from "graphql-request";
import {cache} from "react"; // For request memoization

export interface IDatoRequestProps<TVariables = Record<string, unknown>> {
    query: string;
    variables?: TVariables;
    includeDrafts?: boolean;
    excludeInvalid?: boolean;
    revalidate?: number | false; // Control Next.js cache
}

export const request = async <TResponse, TVariables = Record<string, unknown>>({
                                                                                   query,
                                                                                   variables,
                                                                                   includeDrafts,
                                                                                   excludeInvalid,
                                                                                   revalidate = 600, // Default 10 min cache
                                                                               }: IDatoRequestProps<TVariables>): Promise<TResponse> => {

    const client = new GraphQLClient("https://graphql.datocms.com", {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
            ...(includeDrafts && {"X-Include-Drafts": "true"}),
            ...(excludeInvalid && {"X-Exclude-Invalid": "true"}),
        },
        // Integrates with Next.js fetch cache
        fetch: (url, config) =>
            fetch(url, {
                ...config,
                next: {revalidate}
            }),
    });

    return await client.request<TResponse>(query, variables as any);
};

export const datoCMS = cache(request);