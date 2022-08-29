interface IGraphqlQuery {
    query: string
    routeQuery?: {
        [k: string]: string | string[] | number
    }
    variables?: {
        [k: string]: string | string[] | number
    }
}

interface ICustomHeaders {
    [key: string]: string | string[]
}

export const cmsClient = (params: IGraphqlQuery) => {
    const { CRAFT_CMS_GRAPHQL_API_TOKEN, CRAFT_CMS_GRAPHQL_API_ENDPOINT } =
        process.env

    const {
        preview,
        token,
        'x-craft-preview': xCraftPreview,
        'x-craft-live-preview': xCraftLivePreview
    } = params.routeQuery

    const apiUrl = token
        ? `${CRAFT_CMS_GRAPHQL_API_ENDPOINT}?token=${token}`
        : CRAFT_CMS_GRAPHQL_API_ENDPOINT
    const customHeaders: ICustomHeaders = {}

    // If Live Preview
    if (preview && xCraftLivePreview) {
        customHeaders['x-craft-live-preview'] = xCraftLivePreview
    }

    // If Preview
    if (preview && xCraftPreview) {
        customHeaders['x-craft-preview'] = xCraftPreview
    }

    return fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
            query: params.query,
            variables: params.variables || null
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${CRAFT_CMS_GRAPHQL_API_TOKEN}`,
            ...customHeaders
        }
    }).then((response) => {
        return response.json()
    })
}
