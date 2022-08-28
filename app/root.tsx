import { Outlet } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'

import styles from './tailwind.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export default function App() {
    return <Outlet />
}
