import {useAppDispatch, useAppSelector} from "../../../common/hooks";
import {FC, ReactNode, useEffect} from "react";
import {usersThunks} from "../../../model/users/users-slice.ts";
import {Preloader} from "../../preloader";
import s from "../tables.module.scss";
import {UserType} from "../../../model/users/users-api.ts";

type TableBodyProps = {
    onModalOpen: () => void
}
export const TableBody: FC<TableBodyProps> = ({onModalOpen}) => {
    const dispatch = useAppDispatch()
    const status = useAppSelector((state) => state.app.status);
    const {searchValue, pageSize, page} =
        useAppSelector((state) => state.users.searchParams);
    const users = useAppSelector((state) => state.users.users);
    const sortParams = useAppSelector((state) => state.users.sortParams);

    useEffect(() => {
        if (searchValue.trim()) {
            dispatch(usersThunks.fetchUsers());
        }
    }, [searchValue, page, pageSize, dispatch, sortParams]);

    if (status === "loading") return <EmptyTable><Preloader/></EmptyTable>

    return users.length ? (
        <>
            {users.map(u => <Row key={u.id} user={u} onModalOpen={onModalOpen}/>)}
        </>
    ) : (
        <EmptyTable>Users not found...</EmptyTable>
    );
}

const Row: FC<RowProps> = ({user, onModalOpen}) => {
    const dispatch = useAppDispatch()
    const onShowInfo = () => {
        dispatch(usersThunks.fetchUserInfo({
            id: Number(user.id)
        }))
        onModalOpen()
    }

    return (
        <tr>
            <td>
                <div className={s.imgContainer}>
                    <img src={user.avatar_url} alt=""/>
                </div>
            </td>
            <td>{user.login}</td>
            <td>
                <a href={user.html_url} target={'_blank'} className={s.link}>{user.html_url}</a>
            </td>
            <td>
                <button onClick={onShowInfo} className={s.showBTn}>Show info</button>
            </td>
        </tr>
    )
}

const EmptyTable: FC<EmptyTableProps> = ({children}) => {
    return (
        <tr>
            <td style={{border: 'none'}}>
                <div className={s.empty}>{children}</div>
            </td>
        </tr>
    )
}
type EmptyTableProps = {
    children: ReactNode
}
type RowProps = {
    onModalOpen: () => void
    user: UserType
}