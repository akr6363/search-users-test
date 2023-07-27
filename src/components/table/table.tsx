import {FC, ReactNode, useEffect} from 'react'

import {clsx} from 'clsx'

import s from './tables.module.scss'
import {useAppDispatch, useAppSelector} from "../../common/hooks";
import styled from "styled-components";
import {usersThunks} from "../Posts/posts-reducer.ts";
import preloader from '../../assets/img/preloader.svg'


export const Table: FC<TableProps> = ({children, className}) => {
    // const sortParams: SortParamsType = {
    //     sortDirection: "desc",
    //     sortKey: "id",
    // };
    //
    //
    // const onSort = (sortKey: SortKeyType, sortParams: SortParamsType) => {
    //     let params: SortParamsType = {
    //         sortKey: sortKey,
    //         sortDirection: "asc",
    //     };
    //     if (sortKey === sortParams.sortKey && sortParams.sortDirection === "asc") {
    //         params.sortDirection = "desc";
    //     }
    //     // dispatch(postsActions.setSortParams({ params }));
    // };

    return (
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
    )
}

export const TableBody = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector((state) => state.users.status);
    const searchValue = useAppSelector((state) => state.users.searchValue);
    const users = useAppSelector((state) => state.users.users);
    // const currentPage = useAppSelector((state) => state.users.currentPage);
    // // const sortParams = useAppSelector((state) => state.posts.sortParams);
    // const {id} = useParams();
    // const dispatch = useAppDispatch();
    //
    // useEffect(() => {
    //     if (id) {
    //         // dispatch(postsActions.setCurrentPage({ currentPage: Number(id) }));
    //     }
    // }, [id, dispatch]);
    //
    useEffect(() => {
        if (searchValue.trim()) {
            dispatch(usersThunks.fetchUsers({login: searchValue}));
        }
    }, [searchValue]);


    if (status === "loading")
        return (
            <tr>
                <td style={{border: 'none'}}>
                    <EmptyPage>
                        <img src={preloader} alt=""/>
                    </EmptyPage>
                </td>
            </tr>
        );
    return users.length ? (
        <>
            {users.map(u => {
                return (
                    <tr key={u.id}>
                        <td>
                            <div className={s.imgContainer}>
                                <img src={u.avatar_url} alt=""/>
                            </div>
                        </td>
                        <td>{u.login}</td>
                        <td>{u.html_url}</td>
                    </tr>
                )
            })
            }
        </>
    ) : (
        <tr>
            <td style={{border: 'none'}}>
                <EmptyPage>Посты не найдены...</EmptyPage>
            </td>
        </tr>

    );

}


const EmptyPage = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  font-size: 20px;
  color: var(--gray-color);
  display: flex;
  min-height: 100%;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
`;
type Column = {
    title: string
    width?: string
}

export type TableProps = {
    children?: ReactNode
    className?: string
}

const tableHeaders: Column[] = [
    {title: "Photo", width: '20%'},
    {title: "Name", width: '40%'},
    {title: "Link to github", width: '40%'},
];