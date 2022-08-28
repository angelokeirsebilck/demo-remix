import React from 'react'

interface IProps {
    children: React.ReactNode
}

const Container = (props: IProps) => {
    const { children } = props
    return <div className="container">{children}</div>
}

export default Container
