import * as React from 'react'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import type { HeadersFunction, LoaderFunction } from '@remix-run/node'
import { entryQuery } from '@graphql/pages/entry.gql'
import { categoryQuery } from '@graphql/pages/category.gql'
import { json } from '@remix-run/node'
import { cmsClient } from '@lib/cmsClient'
import Content from '~/components/base/Content'

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
    const { lang, navMain } = useOutletContext()
    console.log(navMain)

    return (
        <Content
            lang={lang}
            navMain={navMain}
            locales={loaderData.page.localized}
        />
    )
}
