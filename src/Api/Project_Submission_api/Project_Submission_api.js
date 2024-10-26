import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const project_submission_api = createApi({
    reducerPath:"project_submission_api",
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
    tagTypes:["project_submission"],
    endpoints:(builder)=>({
        uploadproject_submission:builder.mutation({
            query:(data)=>({
                url:"/upload/project-submission",
                method:"POST",
                body:data,
            }),
            invalidatesTags:["project_submission"]
        }),
        getAllproject_submission:builder.query({
            query:({page,limit})=>({
                url:`/project-submission?page=${page}&limit=${limit}`,
                method:"GET",
            }),
            providesTags:["project_submission"],
        }),
        getproject_submissionById:builder.query({
            query:(id)=>({
                url:`/project-submission/${id}`,
                method:"GET",
            }),
            providesTags:["project_submission"],
        }),
        updateproject_submission:builder.mutation({
            query:(data)=>({
                url:`/project-submission/${data.id}`,
                method:"PATCH",
                body:data,
            }),
            invalidatesTags:["project_submission"]
        }),
        deleteproject_submission:builder.mutation({
            query:(id)=>({
                url:`/project-submission/${id}`,
                method:"DELETE",
            }),
            invalidatesTags:["project_submission"]
        })
    })
})


export const {
    useUploadproject_submissionMutation,
    useGetAllproject_submissionQuery,
    useLazyGetproject_submissionByIdQuery,
    useUpdateproject_submissionMutation,
    useDeleteproject_submissionMutation,
} = project_submission_api