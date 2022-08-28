import React, { useEffect } from 'react'
import Header from './Header'
import type { NavItem } from '@utils/types'

interface IHeaderProps {
    navMain: Array<NavItem>
    lang: string
    children: React.ReactNode
    locales: Array<object>
}

function Content(props: IHeaderProps) {
    return (
        <>
            <Header
                lang={props.lang}
                navMain={props.navMain}
                locales={props.locales}
            />
            <main>{props.children}</main>
        </>
    )
}

export default Content
