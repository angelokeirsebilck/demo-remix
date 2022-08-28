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

    return (
        <html lang={loaderData.lang}>
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Nav
                    lang={loaderData.lang}
                    mainNav={loaderData.navMain.navigationNodes}
                />

                <main>
                    <Outlet />
                </main>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
