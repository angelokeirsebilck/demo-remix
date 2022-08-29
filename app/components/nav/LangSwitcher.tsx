import React from 'react'

import { NavLink } from '@remix-run/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
interface ILangSwitcher {
    locales: Array<object>
    lang: string
}

function LangSwitcher(props: ILangSwitcher) {
    return (
        <div className="ml-8">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>{props.lang}</DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content>
                        {props.locales.map((locale, index) => {
                            let to = `/${locale.language}/${locale.uri}`

                            if (locale.uri == '__home__') {
                                to = `/${props.locales[0].language}`
                            }
                            return (
                                <DropdownMenu.Item key={index}>
                                    <NavLink prefetch="render" to={to}>
                                        {locale.language}
                                    </NavLink>
                                </DropdownMenu.Item>
                            )
                        })}
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    )
}

export default LangSwitcher
