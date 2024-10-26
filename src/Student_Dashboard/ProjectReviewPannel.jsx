import React, { useEffect, useState } from 'react'
import { CustomTabPanel } from './Student_Dashboard'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLazyGetproject_reviewByIdQuery } from '../Api/Project_Review_api/Project_Review_api';
import HashLoader from "react-spinners/HashLoader";



const ProjectReviewPannel = ({ value, index }) => {

    const [trigger, { data, isSuccess, isError, error }] = useLazyGetproject_reviewByIdQuery()

    const [isLoading, setIsLoading] = useState(false);

    const [searchValue, setsearchValue] = useState("")
    const handelSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await trigger(searchValue)
    }

    useEffect(() => {
        if (isSuccess) {
            setIsLoading(false);
        }
        if (isError) {
            setIsLoading(false);
            console.log(error.data)
        }

    }, [data, isSuccess, isError])


    return (
        <CustomTabPanel value={value} index={index}>
            <div className='py-10'>
                <p className='text-[40px] font-semibold text-center'>Project Review Score</p>
                <div>
                    <form onSubmit={handelSubmit} className='bg-gray-400 rounded-lg bg-opacity-30 backdrop-blur-[3px] py-5 px-5  mx-auto flex justify-center items-center gap-2 w-[70%] mq900:w-[100%] mq900:flex-col mq900:px-1'>
                        <input
                            type="text"
                            name="searchValue"
                            id="searchValue"
                            className='border-2 w-[100%] h-[50px] px-3 text-lg rounded-[50px] text-center focus:outline-none'
                            onChange={(e) => setsearchValue(e.target.value)}
                            value={searchValue}
                            placeholder='Enter student Id'
                        />
                        <input
                            type="submit"
                            value="Find"
                            className='border-2 h-[50px] w-[140px] rounded-[25px] cursor-pointer border-gray-600 font-semibold hover:bg-gray-600 hover:text-white transition-all'
                        />
                    </form>

                    <div className=' mt-20 w-[90%] mq900:w-[100%] mx-auto' >
                        {
                            isLoading ? <div className='text-[30px] flex justify-center items-center font-semibold text-center'><HashLoader /></div> :
                                isSuccess && data && data.data.length > 0 ?
                                    <TableContainer component={Paper} className='border-2 border-gray-500' >
                                        <Table aria-label="simple table" className='rounded-lg'>
                                            <TableHead>
                                                <TableRow className='border-b-2 border-gray-500'>
                                                    <TableCell>Student ID</TableCell>
                                                    <TableCell align="center">Student Name</TableCell>
                                                    <TableCell align="center">Project Title</TableCell>
                                                    <TableCell align="center">Review Score</TableCell>
                                                    <TableCell align="center">Feedback</TableCell>
                                                    <TableCell align="center">Date upload</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {isSuccess && data && data.data.map((row) => (
                                                    <TableRow
                                                        key={row._id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.studentId}
                                                        </TableCell>
                                                        <TableCell align="center">{row.studentName}</TableCell>
                                                        <TableCell align="center">{row.projectTitle}</TableCell>
                                                        <TableCell align="center">{row.reviewScore}</TableCell>
                                                        <TableCell align="center">{row.feedback}</TableCell>
                                                        <TableCell align="center">{new Date(row.dateUploaded).toLocaleDateString()}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    :
                                    <p className='text-[30px] font-semibold text-center'>{error && error.data}</p>
                        }
                    </div>
                </div>
            </div>
        </CustomTabPanel>
    )
}

export default ProjectReviewPannel