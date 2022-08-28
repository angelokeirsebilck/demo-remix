import * as React from 'react'
import { useLoaderData } from '@remix-run/react'
import type { HeadersFunction, LoaderFunction } from '@remix-run/node'
import { entryQuery } from '@graphql/pages/entry.gql'
import { categoryQuery } from '@graphql/pages/category.gql'
import { json } from '@remix-run/node'
import { cmsClient } from '@lib/cmsClient'

export const loader: LoaderFunction = async ({ params, request }) => {
    const queryParams = {
        uri: '__home__',
        site: params.lang
    }
    console.log(params['*'])
    let pageContent
    const { data: page } = await cmsClient({
        query: entryQuery,
        variables: queryParams,
        routeQuery: {}
    })
    pageContent = page.page

    if (!pageContent) {
        const { data: page } = await cmsClient({
            query: categoryQuery,
            variables: queryParams,
            routeQuery: {}
        })

        pageContent = page.page
    }

    return json(
        {
            page: pageContent
        },
        { status: 200, headers: { 'cache-control': 'no-cache' } }
    )
}

export default function Slug() {
    const loaderData = useLoaderData()

    return (
        <div className="container">
            <p>{loaderData.page.title}</p>
        </div>
    )
}
