import { FC, memo } from 'react'

import { clsx } from 'clsx'


import { Select } from '../select'


import s from './pagination.module.scss'
import { usePagination } from './usePagination.ts'
import {ArrowBack} from "../../assets/icons/components/ArrowBack.tsx";
import {ArrowForward} from "../../assets/icons/components/ArrowForward.tsx";
import {useAppDispatch, useAppSelector} from "../../common/hooks";
import {usersActions} from "../Posts/posts-reducer.ts";

export const Pagination: FC<PaginationProps> = ({
  siblings = 1,
}) => {
  const totalCount = useAppSelector((state) => state.users.totalCount);
  const pageSize = useAppSelector((state) => state.users.pageSize);
  const page = useAppSelector((state) => state.users.currentPage);
  const count = Math.ceil(totalCount / pageSize); //общее число страниц

  const dispatch = useAppDispatch()
  const onPageChange = (page: number) => {
    dispatch(usersActions.setCurrentPage({currentPage: page}))
  }
  const onChangePageSize = (pageSize: string) => {
    dispatch(usersActions.setPageSize({pageSize: Number(pageSize)}))
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

const selectOptions=['10', '20', '30', '50', '100']

  return (
    <div className={s.root}>
      <PrevButton onClick={handlePreviousPageClicked} disabled={page === 1} />
      <MainPaginationButtons
        currentPage={page}
        onClick={handleMainPageClicked}
        paginationRange={paginationRange}
      />
      <NextButton onClick={handleNextPageClicked} disabled={page === count} />
      <ShowOnPageSelect
        selectOptions={selectOptions}
        selectCurrent={pageSize.toString()}
        onSelectChange={onChangePageSize}
      />
    </div>
  )
}
const MainPaginationButtons: FC<MainPaginationButtonsProps> = ({
  paginationRange,
  currentPage,
  onClick,
}) => {
  return (
    <>
      {paginationRange.map((page: number | string, index) => {
        const isSelected = page === currentPage

        if (typeof page !== 'number') {
          return <Dots key={index} />
        }

        return <PageButton key={index} page={page} selected={isSelected} onClick={onClick} />
      })}
    </>
  )
}

const PageButton: FC<PageButtonProps> = memo(({ onClick, selected, page }) => {
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

const PrevButton: FC<NavigationButtonProps> = memo(({ onClick, disabled }) => {
  return (
    <button className={s.navigationBtn} onClick={onClick} disabled={disabled}>
      <ArrowBack size={16} color={disabled ? 'var(--color-dark-100)' : 'var(--color-dark-500)'} />
    </button>
  )
})

const NextButton: FC<NavigationButtonProps> = memo(({ onClick, disabled }) => {
  return (
    <button className={s.navigationBtn} onClick={onClick} disabled={disabled}>
      <ArrowForward size={16} color={disabled ? 'var(--color-dark-100)' : 'var(--color-dark-500)'} />
    </button>
  )
})

const Dots: FC = () => {
  return <span className={s.dots}>&#8230;</span>
}

export const ShowOnPageSelect: FC<ShowOnPageSelectProps> = ({
  selectCurrent,
  selectOptions,
  onSelectChange,
}) => {
  return (
    <div className={s.selectBox}>
      <p>Показать</p>
      <Select
        selectCurrent={selectCurrent}
        onSelectChange={onSelectChange}
        selectOptions={selectOptions}
        className={'pagination'}
      />
      <p>на странице</p>
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
