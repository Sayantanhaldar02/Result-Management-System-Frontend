import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const attendence_api = createApi({
    reducerPath:"attendence_api",
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
    tagTypes:["Attendence"],
    endpoints:(builder)=>({
        uploadAttendence:builder.mutation({
            query:(data)=>({
                url:"/upload/attendence",
                method:"POST",
                body:data,
            }),
            invalidatesTags:["Attendence"]
        }),
        getAllAttendence:builder.query({
            query:({page,limit})=>({
                url:`/attendence?page=${page}&limit=${limit}`,
                method:"GET",
            }),
            providesTags: (result) =>
                result
                  ? [
                      ...result.data.map(({ id }) => ({ type: 'Attendance', id })),
                      { type: 'Attendance', id: 'LIST' },
                    ]
                  : [{ type: 'Attendance', id: 'LIST' }],
        }),
        getAttendenceById:builder.query({
            query:(id)=>({
                url:`/attendence/${id}`,
                method:"GET",
            }),
            providesTags:["Attendence"],
        }),
        updateAttendence:builder.mutation({
            query:(data)=>({
                url:`/attendence/${data.id}`,
                method:"PATCH",
                body:data,
            }),
            invalidatesTags: [{ type: 'Attendance', id: 'LIST' }],
        }),
        deleteAttendence:builder.mutation({
            query:(id)=>({
                url:`/attendence/${id}`,
                method:"DELETE",
            }),
            invalidatesTags: [{ type: 'Attendance', id: 'LIST' }],
        })
    })
})


export const {
    useUploadAttendenceMutation,
    useGetAllAttendenceQuery,
    useLazyGetAttendenceByIdQuery,
    useUpdateAttendenceMutation,
    useDeleteAttendenceMutation,
} = attendence_api