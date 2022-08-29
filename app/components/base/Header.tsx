import React from 'react'
import Logo from '@assets/img/ak-logo-black.png'
import Nav from '@components/nav/Nav'
import type { NavItem } from '@utils/types'
import Container from './Container'
import LangSwitcher from '../nav/LangSwitcher'
import { useEffect } from 'react'

interface IHeaderProps {
    navMain: Array<NavItem>
    lang: string
    locales: Array<object>
}

function Header(props: IHeaderProps) {
    return (
        <Container>
            <div className="flex justify-between">
                <img src={Logo} alt="" />
                <div className="flex items-center">
                    <Nav lang={props.lang} mainNav={props.navMain} />

                    <LangSwitcher lang={props.lang} locales={props.locales} />
                </div>
            </div>
        </Container>
    )
}

export default Header
