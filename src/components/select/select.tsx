import {FC, ForwardedRef, forwardRef, ReactNode} from 'react'

import * as S from '@radix-ui/react-select'
import {clsx} from 'clsx'

import {ArrowDown} from '../../assets/icons/components'

import s from './select.module.scss'

export type ShowOnPageSelectProps = {
    selectCurrent?: string
    selectOptions: string[]
    onSelectChange?: (item: string) => void
    disabled?: boolean
    className?: string
    placeholder?: string
}
export const Select: FC<ShowOnPageSelectProps> = (
    {
        selectCurrent,
        selectOptions,
        onSelectChange,
        disabled = false,
        className,
        placeholder,
    }) => {
    return (
        <S.Root value={selectCurrent} onValueChange={onSelectChange} disabled={disabled}>
            <S.Trigger className={clsx(s.trigger, className && s[className])}>
                <S.Value aria-label={selectCurrent} placeholder={placeholder}>
                    {selectCurrent && <p>{selectCurrent}</p>}
                </S.Value>
                <ArrowDown size={16}/>
            </S.Trigger>
            <S.Portal>
                <S.Content className={clsx(s.content, className && s[className])} position={'popper'}>
                    <S.Viewport>
                        <S.Group>
                            {selectOptions.map(option => (
                                <SelectItem key={option} value={option} className={s.item}>
                                    {option}
                                </SelectItem>
                            ))}
                        </S.Group>
                    </S.Viewport>
                </S.Content>
            </S.Portal>
        </S.Root>
    )
}

const SelectItem = forwardRef(
    (
        {children, className, value, ...props}: SelectItemProps,
        forwardedRef: ForwardedRef<HTMLDivElement>
    ) => {
        return (
            <S.Item className={clsx('SelectItem', className)} value={value} {...props} ref={forwardedRef}>
                <S.ItemText>
                    <p>{children}</p>
                </S.ItemText>
            </S.Item>
        )
    }
)

type SelectItemProps = {
    children: ReactNode
    className?: string
    value: string
}
