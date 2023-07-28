import axios from "axios";
import {SearchParamsType, SortParamsType} from "./users-slice.ts";

const token = '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'
const axiosInstance = axios.create({
    baseURL: 'https://api.github.com/',
    headers: {
        Authorization: `token ${token}`
    }
});

export const usersApi = {
    getUsers({searchValue, page, pageSize}: SearchParamsType, {sortDirection, sortKey}: SortParamsType) {
        return axiosInstance
            .get<getUsersResponseType>(`search/users?q=${searchValue}+in:login`, {
                params: {
                    page: page,
                    per_page: pageSize,
                    sort: sortKey,
                    order: sortDirection
                }
            })
            .then((response) => {
                return response.data;
            });
    },
    getUserInfo(id: number) {
            return axiosInstance.get<UserInfoType>(`user/${id}`) .then((response) => {
                return response.data;
            });
    }
};


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

export type UserInfoType = {
    "login": string
    "id": number
    "node_id": string
    "avatar_url": string
    "gravatar_id": string
    "url": string
    "html_url": string
    "followers_url": string
    "following_url": string
    "gists_url": string
    "starred_url": string
    "subscriptions_url": string
    "organizations_url": string
    "repos_url": string
    "events_url": string
    "received_events_url": string
    "type": string
    "site_admin": boolean
    "name": string
    "company": string
    "blog": string
    "location": string
    "email": string | null
    "hireable": string | null
    "bio": string | null
    "twitter_username": string | null
    "public_repos": number
    "public_gists": number
    "followers": number
    "following": number
    "created_at": string
    "updated_at": string
}