import { Typography } from '@material-ui/core'
import React from 'react'

export default function TypographyRe({ title, re, ...restProps }) {
    if (re != null) {
        const split = title.split(re)
        const highlight = title.match(re)
        const arr = Array.from(Array(split.length + highlight.length).keys())
        return (
            <Typography {...restProps}>
                {arr.map(index => {
                    const i = Math.floor(index / 2)
                    if (index % 2 === 0) {
                        return split[i]
                    } else {
                        return <b>{highlight[i]}</b>
                    }
                })}
            </Typography>
        )
    } else {
        return (
            <Typography {...restProps}>
                {title}
            </Typography>
        )
    }


}
