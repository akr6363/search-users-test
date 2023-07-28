import {FC, ReactNode} from 'react'

import {clsx} from 'clsx'

import s from './tables.module.scss'

const tableHeaders: Column[] = [
    {title: "Photo", width: '20%'},
    {title: "Name", width: '30%'},
    {title: "Link to github", width: '30%'},
    {title: "", width: '20%'},
];

export const Table: FC<TableProps> = ({children, className}) => {
    return (
        <div className={s.container}>
            <table className={clsx(s.table, className)}>
                <thead>
                <tr>
                    {tableHeaders.map(({title, width}, index) => {
                        return (
                            <th key={`column-${index}`} style={{width}}>
                                {title}
                            </th>
                        )
                    })}
                </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    )
}

type Column = {
    title: string
    width?: string
}

export type TableProps = {
    children?: ReactNode
    className?: string
}

