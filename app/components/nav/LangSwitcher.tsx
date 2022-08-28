import React from 'react'

import { NavLink } from '@remix-run/react'

interface ILangSwitcher {
    locales: Array<object>
}

function LangSwitcher(props: ILangSwitcher) {
    let to = `/${props.locales[0].language}/${props.locales[0].uri}`

    if (props.locales[0].uri == '__home__') {
        to = `/${props.locales[0].language}`
    }
    return (
        <div className="ml-8">
            <NavLink prefetch="render" to={to}>
                {props.locales[0].language}
            </NavLink>
        </div>
    )
}

export default LangSwitcher
