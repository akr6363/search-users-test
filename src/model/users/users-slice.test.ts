// import {
//   InitialStateType,
//   postsActions,
//   postsReducer,
//   postsThunks,
//   RequestStatusType,
//   SortDirectionType,
//   SortKeyType,
// } from "../posts-reducer";
// import { PostType } from "components/Posts/posts-api";
// import { beforeEach } from 'jest';
// let initialState: InitialStateType;
//
// beforeEach(() => {
//   initialState = {
//     posts: [],
//     currentPage: 1,
//     pageSize: 10,
//     pageTotalCount: 0,
//     searchValue: "",
//     sortParams: {
//       sortDirection: "asc" as SortDirectionType,
//       sortKey: "id" as SortKeyType,
//     },
//     status: "idle" as RequestStatusType,
//     error: null,
//   };
// });
//
// test("posts should be set", () => {
//   const posts: PostType[] = [
//     { userId: 1, id: 1, title: "Post 1", body: "Body of post 1" },
//     { userId: 2, id: 2, title: "Post 2", body: "Body of post 2" },
//     { userId: 3, id: 3, title: "Post 3", body: "Body of post 3" },
//   ];
//   const action = postsThunks.fetchPosts.fulfilled({ posts }, "requestId");
//   const newState = postsReducer(initialState, action);
//   expect(newState.posts).toEqual(posts);
// });
//
// test("page total count should be set", () => {
//   const newState = postsReducer(initialState, postsActions.setPageTotalCount({ pageTotalCount: 10 }));
//   expect(newState.pageTotalCount).toEqual(10);
// });
// test("current page should be set", () => {
//   const newState = postsReducer(initialState, postsActions.setCurrentPage({ currentPage: 2 }));
//   expect(newState.currentPage).toEqual(2);
// });
//
// test("search value should be set", () => {
//   const newState = postsReducer(initialState, postsActions.setSearchValue({ value: "abc" }));
//   expect(newState.searchValue).toEqual("abc");
// });
//
// test("sort params should be set", () => {
//   const newParams = {
//     sortDirection: "desc" as SortDirectionType,
//     sortKey: "title" as SortKeyType,
//   };
//   const newState = postsReducer(initialState, postsActions.setSortParams({ params: newParams }));
//   expect(newState.sortParams).toEqual(newParams);
// });
//
// test("status should be set", () => {
//   const newState = postsReducer(initialState, postsActions.setStatus({ status: "loading" }));
//   expect(newState.status).toEqual("loading");
// });
//
// test("error should be set", () => {
//   const newState = postsReducer(initialState, postsActions.setError({ error: "some error" }));
//   expect(newState.error).toEqual("some error");
// });
// export {};
