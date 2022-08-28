import type { MetaFunction, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from '@remix-run/react'

import { cmsClient } from '@lib/cmsClient'
import Nav from '@components/nav/Nav'
import { navMain } from '@graphql/nav/nav-main.gql'
import { entryQuery } from '@graphql/pages/entry.gql'
import { categoryQuery } from '@graphql/pages/category.gql'
import Header from '~/components/base/Header'
import Content from '~/components/base/Content'

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'New Remix App',
    viewport: 'width=device-width,initial-scale=1'
})

export const loader: LoaderFunction = async ({ params }) => {
    const { data: navigationNodes } = await cmsClient({
        query: navMain,
        variables: {
            site: params.lang
        },
        routeQuery: {}
    })

    return json({
        lang: params.lang,
        navMain: navigationNodes
    })
}

export default function Layout() {
    const loaderData = useLoaderData()

    const context = {
        lang: loaderData.lang,
        navMain: loaderData.navMain.navigationNodes
    }

    return (
        <html lang={loaderData.lang}>
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet context={context} />

                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
