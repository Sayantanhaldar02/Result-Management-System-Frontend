import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const linkedin_post_api = createApi({
    reducerPath:"linkedin_post_api",
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
    tagTypes:["linkedin_post"],
    endpoints:(builder)=>({
        uploadlinkedin_post:builder.mutation({
            query:(data)=>({
                url:"/upload/linkedin-post",
                method:"POST",
                body:data,
            }),
            invalidatesTags:["linkedin_post"]
        }),
        getAlllinkedin_post:builder.query({
            query:({page,limit})=>({
                url:`/linkedin-post?page=${page}&limit=${limit}`,
                method:"GET",
            }),
            providesTags:["linkedin_post"],
        }),
        getlinkedin_postById:builder.query({
            query:(id)=>({
                url:`/linkedin-post/${id}`,
                method:"GET",
            }),
            providesTags:["linkedin_post"],
        }),
        updatelinkedin_post:builder.mutation({
            query:(data)=>({
                url:`/linkedin-post/${data.id}`,
                method:"PATCH",
                body:data,
            }),
            invalidatesTags:["linkedin_post"]
        }),
        deletelinkedin_post:builder.mutation({
            query:(id)=>({
                url:`/linkedin-post/${id}`,
                method:"DELETE",
            }),
            invalidatesTags:["linkedin_post"]
        })
    })
})


export const {
    useUploadlinkedin_postMutation,
    useGetAlllinkedin_postQuery,
    useLazyGetlinkedin_postByIdQuery,
    useUpdatelinkedin_postMutation,
    useDeletelinkedin_postMutation,
} = linkedin_post_api