import {FC, memo} from 'react'

import {clsx} from 'clsx'

import {Select} from '../select'

import s from './pagination.module.scss'
import {usePagination} from './usePagination.ts'
import {ArrowBack} from "../../assets/icons/components";
import {ArrowForward} from "../../assets/icons/components";
import {useAppSelector} from "../../common/hooks";

import {useSearchParams} from "react-router-dom";

export const Pagination: FC<PaginationProps> = ({siblings = 1, params}) => {
    const totalCount = useAppSelector((state) => state.users.totalCount);
    const {page, pageSize} = useAppSelector((state) => state.users.searchParams);
    const count = Math.ceil(totalCount / Number(pageSize)); //общее число страниц

    const [searchParams, setSearchParams] =
        useSearchParams(params.get('pageSize') ? params : {...params, pageSize: pageSize.toString()})

    const onPageChange = (page: number) => {
        searchParams.set('page', page.toString())
        setSearchParams(searchParams)
    }
    const onChangePageSize = (pageSize: string) => {
        searchParams.set('pageSize', pageSize)
        setSearchParams(searchParams)
    }
    const {
        paginationRange,
        handlePreviousPageClicked,
        handleNextPageClicked,
        handleMainPageClicked,
    } = usePagination({
        page,
        count,
        onChange: onPageChange,
        siblings,
    })

    const selectOptions = ['10', '20', '30', '50', '100']

    return (
        <div className={s.root}>
            <div className={s.container}>
                <PrevButton onClick={handlePreviousPageClicked} disabled={page === 1}/>
                <MainPaginationButtons
                    currentPage={page}
                    onClick={handleMainPageClicked}
                    paginationRange={paginationRange}
                />
                <NextButton onClick={handleNextPageClicked} disabled={page === count}/>
            </div>
            <div>
                <ShowOnPageSelect
                    selectOptions={selectOptions}
                    selectCurrent={pageSize.toString()}
                    onSelectChange={onChangePageSize}
                />
            </div>
        </div>
    )
}
const MainPaginationButtons: FC<MainPaginationButtonsProps> = (
    {
        paginationRange,
        currentPage,
        onClick,
    }) => {
    return (
        <>
            {paginationRange.map((page: number | string, index) => {
                const isSelected = page === currentPage

                if (typeof page !== 'number') {
                    return <Dots key={index}/>
                }

                return <PageButton key={index} page={page} selected={isSelected} onClick={onClick}/>
            })}
        </>
    )
}

const PageButton: FC<PageButtonProps> = memo(({onClick, selected, page}) => {
    return (
        <button
            onClick={() => onClick(page)}
            className={clsx(s.pageBtn, selected && s.selected)}
            disabled={selected}
        >
            {page}
        </button>
    )
})

const PrevButton: FC<NavigationButtonProps> = memo(({onClick, disabled}) => {
    return (
        <button className={s.navigationBtn} onClick={onClick} disabled={disabled}>
            <ArrowBack size={16} color={disabled ? 'var(--color-dark-100)' : 'var(--color-dark-500)'}/>
        </button>
    )
})

const NextButton: FC<NavigationButtonProps> = memo(({onClick, disabled}) => {
    return (
        <button className={s.navigationBtn} onClick={onClick} disabled={disabled}>
            <ArrowForward size={16} color={disabled ? 'var(--color-dark-100)' : 'var(--color-dark-500)'}/>
        </button>
    )
})

const Dots: FC = () => {
    return <span className={s.dots}>&#8230;</span>
}

export const ShowOnPageSelect: FC<ShowOnPageSelectProps> = (
    {
        selectCurrent,
        selectOptions,
        onSelectChange,
    }) => {
    return (
        <div className={s.selectBox}>
            <span>Показать</span>
            <Select
                selectCurrent={selectCurrent}
                onSelectChange={onSelectChange}
                selectOptions={selectOptions}
                className={'pagination'}
            />
            <span>на странице</span>
        </div>
    )
}

//types
export type ShowOnPageSelectProps = {
    selectCurrent: string
    selectOptions: string[]
    onSelectChange?: (item: string) => void
}
export type PaginationProps = {
    params: URLSearchParams
    siblings?: number //кол-во сосендих отображаемых стр от текущей
}

type MainPaginationButtonsProps = {
    paginationRange: (number | string)[]
    currentPage: number
    onClick: (pageNumber: number) => void
}

type NavigationButtonProps = {
    onClick: () => void
    disabled?: boolean
}
type PageButtonProps = {
    onClick: (pageNumber: number) => void
    page: number
    selected: boolean
}
