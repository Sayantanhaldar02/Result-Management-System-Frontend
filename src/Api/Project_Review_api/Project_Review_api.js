import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const project_review_api = createApi({
    reducerPath:"project_review_api",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000",
        prepareHeaders: (headers, {getState}) => {
            const token = getState().user.token || null;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes:["project_review"],
    endpoints:(builder)=>({
        uploadproject_review:builder.mutation({
            query:(data)=>({
                url:"/upload/project-review",
                method:"POST",
                body:data,
            }),
            invalidatesTags:["project_review"]
        }),
        getAllproject_review:builder.query({
            query:({page,limit})=>({
                url:`/project-review?page=${page}&limit=${limit}`,
                method:"GET",
            }),
            providesTags:["project_review"],
        }),
        getproject_reviewById:builder.query({
            query:(id)=>({
                url:`/project-review/${id}`,
                method:"GET",
            }),
            providesTags:["project_review"],
        }),
        updateproject_review:builder.mutation({
            query:(data)=>({
                url:`/project-review/${data.id}`,
                method:"PATCH",
                body:data,
            }),
            invalidatesTags:["project_review"]
        }),
        deleteproject_review:builder.mutation({
            query:(id)=>({
                url:`/project-review/${id}`,
                method:"DELETE",
            }),
            invalidatesTags:["project_review"]
        })
    })
})


export const {
    useUploadproject_reviewMutation,
    useGetAllproject_reviewQuery,
    useLazyGetproject_reviewByIdQuery,
    useUpdateproject_reviewMutation,
    useDeleteproject_reviewMutation,
} = project_review_api