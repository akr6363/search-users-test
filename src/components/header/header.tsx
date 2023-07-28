import {Input} from "../index.ts";
import {Search} from "../../assets/icons/components";
import {Select} from "../select";
import {useAppDispatch, useAppSelector} from "../../common/hooks";
import {useNavigate, useSearchParams} from "react-router-dom";
import {FC} from "react";
import {SortDirectionType, SortKeyType, SortParamsType, usersActions} from "../../model/users/users-slice.ts";
import s from './header.module.scss'

export const Header: FC<HeaderProps> = ({params}) => {

    const dispatch = useAppDispatch()
    const {searchValue} = useAppSelector((state) => state.users.searchParams);
    const [_, setSearchParams] =
        useSearchParams(params.get('pageSize') ? params : {q: '', pageSize: '', page: ''})
    const navigate = useNavigate();
    const SearchPosts = (value: string) => {
        if (searchValue === value) return
        if (value) {
            setSearchParams({q: value, pageSize: '30', page: '1'})
        } else {
            navigate(`/`)
        }
    };

    const onSortChange = (value: string) => {
        let params: SortParamsType = {
            sortDirection: null,
            sortKey: null
        }
        if (value === 'asc repositories')
            params = {
                sortDirection: 'asc' as SortDirectionType,
                sortKey: "repositories" as SortKeyType
            };
        if (value === 'desc repositories')
            params = {
                sortDirection: 'desc' as SortDirectionType,
                sortKey: "repositories" as SortKeyType
            };

        dispatch(usersActions.setSortParams({params}));
    }

    return (
        <div className={s.container}>
            <Input onChange={SearchPosts} placeholder="Поиск" initValue={searchValue}>
                <Search color={'var(--color-dark-100)'}/>
            </Input>
            <Select placeholder={"Выберите сортировку"} selectOptions={['asc repositories', 'desc repositories']}
                    onSelectChange={onSortChange}/>
        </div>
    );
};

type HeaderProps = {
    params: URLSearchParams
}