import * as React from 'react'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import type { HeadersFunction, LoaderFunction } from '@remix-run/node'
import { entryQuery } from '@graphql/pages/entry.gql'
import { categoryQuery } from '@graphql/pages/category.gql'
import { json } from '@remix-run/node'
import { cmsClient } from '@lib/cmsClient'
import Content from '~/components/base/Content'
import Container from '~/components/base/Container'

export const loader: LoaderFunction = async ({ params, request }) => {
    const queryParams = {
        uri: params['*'],
        site: params.lang
    }

    const searchParams = new URL(request.url).searchParams

    const preview = searchParams.get('preview')
    const token = searchParams.get('token')
    const xcraftpreview = searchParams.get('x-craft-preview')
    const xcraftlivepreview = searchParams.get('x-craft-live-preview')

    let pageContent
    const { data: page } = await cmsClient({
        query: entryQuery,
        variables: queryParams,
        routeQuery: {
            preview,
            token,
            'x-craft-preview': xcraftpreview,
            'x-craft-live-preview': xcraftlivepreview
        }
    })
    pageContent = page.page

    if (!pageContent) {
        const { data: page } = await cmsClient({
            query: categoryQuery,
            variables: queryParams,
            routeQuery: {
                preview,
                token,
                'x-craft-preview': xcraftpreview,
                'x-craft-live-preview': xcraftlivepreview
            }
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

    return (
        <Content
            lang={lang}
            navMain={navMain}
            locales={loaderData.page.localized}
        >
            <Container>{loaderData.page.title}</Container>
        </Content>
    )
}
