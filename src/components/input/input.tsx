import {ChangeEvent, FC, ReactNode, useEffect, useState} from "react";
import s from './input.module.scss'
import {clsx} from "clsx";

type PropsType = {
    onChange(value: string): void;
    placeholder: string;
    children?: ReactNode;
    className?: string
    initValue?: string
};

export const Input: FC<PropsType> = ({onChange, placeholder, children, className,initValue = '' }) => {
    const [value, setValue] = useState<string>(initValue);
    const [timerId, setTimerId] = useState<number | null>(null);

    const onSetValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    useEffect(() => {
        if (timerId) {
            clearTimeout(timerId);
        }
        setTimerId(
            +setTimeout(() => {
                onChange(value);
            }, 1000),
        );
    }, [value]);


    useEffect(() => {
      setValue(initValue)
    }, [initValue]);


    return (
        <div className={clsx(s.root, className)}>
            <input className={s.input}  type="text" value={value} onChange={onSetValue}
                   placeholder={placeholder}/>
            <div className={s.iconPlaceholder}>
                {children}
            </div>
        </div>
    );
};
