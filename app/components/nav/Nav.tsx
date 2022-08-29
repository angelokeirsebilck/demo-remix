import React from 'react'
import { NavLink } from '@remix-run/react'
import Container from '@components/base/Container'
import type { NavItem } from '@utils/types'

interface NavProps {
    mainNav: Array<NavItem>
    lang: string
}

function Nav(props: NavProps) {
    return (
        <div className="text-white bg-black-default">
            <Container>
                <ul className="flex items-center h-16 text-black">
                    <li className="mr-4">
                        <NavLink prefetch="intent" to={`/${props.lang}`}>
                            Home
                        </NavLink>
                    </li>
                    {props.mainNav.map((item, index: number) => {
                        return (
                            <li className="mr-4" key={index}>
                                <NavLink
                                    prefetch="render"
                                    className={({ isActive }) =>
                                        isActive ? 'text-orange-400' : undefined
                                    }
                                    to={item.element.uri}
                                >
                                    {item.title}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </Container>
        </div>
    )
}

export default Nav
