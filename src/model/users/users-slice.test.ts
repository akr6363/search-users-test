import {InitialStateType, SortDirectionType, SortKeyType, usersActions, usersReducer} from "./users-slice.ts";
import {UserInfoType} from "./users-api.ts";

let initialState: InitialStateType;
beforeEach(() => {
    initialState = {
        users: [],
        userInfo: {} as UserInfoType,
        totalCount: 0, //всего найденных пользователей

        searchParams: {
            searchValue: '',
            page: 1, //текущая страница
            pageSize: 30, //кол-во отображаемых пользователей на одной странице
        },
        sortParams: {
            sortKey: null,
            sortDirection: null,
        },
    }
});

test("total count should be set", () => {
    const newState = usersReducer(initialState, usersActions.setTotalCount({totalCount: 10}));
    expect(newState.totalCount).toEqual(10);
});

test("sort params should be set", () => {
    const newParams = {
        sortDirection: "desc" as SortDirectionType,
        sortKey: "repositories" as SortKeyType,
    };
    const newState = usersReducer(initialState, usersActions.setSortParams({params: newParams}));
    expect(newState.sortParams).toEqual(newParams);
});

test("searchParams params should be set", () => {
    const newParams = {
        searchValue: 'value',
        page: 5,
        pageSize: 50,
    };
    const newState = usersReducer(initialState, usersActions.setSearchParams({params: newParams}));
    expect(newState.searchParams).toEqual(newParams);
});
