import {ErrorNotification, Pagination} from "./components";
import {Table} from "./components/table";
import {useSearchParams} from "react-router-dom";

import {useEffect, useState} from "react";
import {usersActions} from "./model/users/users-slice.ts";
import {useAppDispatch} from "./common/hooks";
import {Header} from "./components/header/header.tsx";
import {TableBody} from "./components/table/table-body/table-body.tsx";
import {Modal} from "./components/modal/modal.tsx";

export const App = () => {
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams({q: '', pageSize: '', page: ''})
    const q = searchParams.get('q');
    const pageSize = searchParams.get('pageSize');
    const page = searchParams.get('page');

    useEffect(() => {
            if (q && pageSize && page) {
                const params = {
                    searchValue: q, page: Number(page), pageSize: Number(pageSize)
                }
                dispatch(usersActions.setSearchParams({params}))
            } else {
                dispatch(usersActions.clean());
            }
        }, [q, pageSize, page, dispatch]
    )

    const [ModalIsOpen, setModalIsOpen] = useState(false)

    const onModalOpen = () => {
        setModalIsOpen(true)
    }
    const onModalClose = () => {
        setModalIsOpen(false)
    }

    return (
        <div className="app">
            {ModalIsOpen && <Modal onClose={onModalClose}/>}
            <ErrorNotification/>
            <div className="container">
                <Header params={searchParams}/>
                    <Table>
                        <TableBody onModalOpen={onModalOpen}/>
                    </Table>
                <Pagination params={searchParams}/>
            </div>
        </div>
    );
}
