import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const assessment_api = createApi({
    reducerPath:"assessment_api",
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
    tagTypes:["Assessment"],
    endpoints:(builder)=>({
        uploadAssessment:builder.mutation({
            query:(data)=>({
                url:"/upload/assessment",
                method:"POST",
                body:data,
            }),
            invalidatesTags:["Assessment"]
        }),
        getAllAssessment:builder.query({
            query:({page,limit})=>({
                url:`/assessment?page=${page}&limit=${limit}`,
                method:"GET",
            }),
            providesTags:["Assessment"],
        }),
        getAssessmentById:builder.query({
            query:(id)=>({
                url:`/assessment/${id}`,
                method:"GET",
            }),
            providesTags:["Assessment"],
        }),
        updateAssessment:builder.mutation({
            query:(data)=>({
                url:`/assessment/${data.id}`,
                method:"PATCH",
                body:data,
            }),
            invalidatesTags:["Assessment"]
        }),
        deleteAssessment:builder.mutation({
            query:(id)=>({
                url:`/assessment/${id}`,
                method:"DELETE",
            }),
            invalidatesTags:["Assessment"]
        })
    })
})


export const {
    useUploadAssessmentMutation,
    useGetAllAssessmentQuery,
    useLazyGetAssessmentByIdQuery,
    useUpdateAssessmentMutation,
    useDeleteAssessmentMutation,
} = assessment_api