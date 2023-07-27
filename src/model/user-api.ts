import axios from "axios";
import {SortParamsType} from "./user-slice.ts";

type getUsersResponseType = {
    total_count: number
    incomplete_results: boolean
    items: UserType[]
};

export type UserType = {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
    score: number
}

const token = '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'


export const usersApi = {
    getUsers(login: string, page: number, pageSize: number, sortParam: SortParamsType) {
        return axios
            .get<getUsersResponseType>(`https://api.github.com/search/users?q=${login}+in:login&page=${page}&per_page=${pageSize}&sort=${sortParam.sortKey}&order=${sortParam.sortDirection}`, {
                headers: {
                    Authorization: `token ${token}`
                }
            })
            .then((response) => {
                return response.data;
            });
    },
};
