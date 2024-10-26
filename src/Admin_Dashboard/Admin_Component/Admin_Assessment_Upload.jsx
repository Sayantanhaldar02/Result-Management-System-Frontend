import React, { useCallback, useEffect, useState } from 'react';
import { CustomTabPanel } from '../Admin_Dashboard'
import { IconButton, TextField, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import excel_logo from "../../assets/excel.png";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify';
import { useUploadAssessmentMutation, useUpdateAssessmentMutation, useGetAllAssessmentQuery, useDeleteAssessmentMutation } from '../../Api/Assessment_api/Assessment_api';
import CircularProgress from '@mui/material/CircularProgress';
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});





const Admin_Assessment_Upload = ({ value, index }) => {

    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setFile(null)
        setOpen(false);
    };



    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"]
        },
        multiple: false,
        onDrop: (files, err) => {
            if (files && files[0]) {
                setFile(files[0]);
            } else {
                toast.error("Only .xlsx files are supported");
            }
        },
    });

    const files = file && acceptedFiles.map(file => (
        <li key={file.path} className='text-[12px] font-semibold'>
            <div className='flex items-center gap-1'>
                <img src={excel_logo} alt="excel-logo" className='h-[20px] w-[20px]' />
                <p>{file.path} - {(file.size / 1024).toFixed(2)} KB</p>
            </div>
        </li>
    ));


    const [uploadFile, UploadResponse] = useUploadAssessmentMutation()
    const handelUploadFile = async () => {
        if (!file) {
            return toast.error("Please select a file");
        }

        const formData = new FormData();
        formData.append("assessmentFile", file);

        await uploadFile(formData);
        handleClose();
    }

    useEffect(() => {
        if (UploadResponse.isSuccess) {
            toast.success("File uploaded successfully!")
        }
        if (UploadResponse.isError) {
            toast.error("File uploaded failed!")
            // console.log(UploadResponse.error)
        }
    }, [UploadResponse.isSuccess, UploadResponse.isError])

    const [allAssessment, setAllAssessment] = useState([]);
    const [page, setPage] = useState(1); // Track the current page
    const limit = 10;

    const { data: assessmentData, isLoading, isError, error, isSuccess, isFetching, refetch } = useGetAllAssessmentQuery({ page, limit });

    useEffect(() => {
        if (isSuccess && assessmentData && assessmentData.data) {
            setAllAssessment((prevItems) => {
                // Only append new items if they're not already in the list
                const newItems = assessmentData.data.filter((item) => !prevItems.some((prevItem) => prevItem._id === item._id));
                return page === 1 ? assessmentData.data : [...prevItems, ...newItems];
            });
        }
    }, [isSuccess, assessmentData, page]);

    const handleScroll = useCallback(() => {
        const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
        const maxScrollPosition = document.documentElement.offsetHeight - 100;

        // Ensure we don't fetch more data than available pages and avoid fetching while already loading
        if (scrollPosition >= maxScrollPosition && !isFetching && page < assessmentData?.pagination?.totalPages) {
            setPage((prev) => prev + 1); // Load the next page
        }
    }, [isFetching, page, assessmentData]);

    // Attach scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);





    const [studentDetails, setStudentDetails] = useState({
        studentId: "",
        studentName: "",
        subject: "",
        score: "",
        totalMarks: "",
        dateUploaded: "",
    })
    const onChnageHandeler = e => {
        setStudentDetails({ ...studentDetails, [e.target.name]: e.target.value })
    }
    const [updateFormOpen, setupdateFormOpen] = useState(false);

    const handleClickUpdateFormOpen = (updateDetails) => {
        setupdateFormOpen(true);
        setStudentDetails({
            id: updateDetails._id,
            studentId: updateDetails.studentId,
            studentName: updateDetails.studentName,
            subject: updateDetails.subject,
            score: updateDetails.score,
            totalMarks: updateDetails.totalMarks,
            dateUploaded: updateDetails.dateUploaded,
        })
    };

    const handleUpdateFormClose = () => {
        setupdateFormOpen(false);
    };

    const [updateData, UpdateResponse] = useUpdateAssessmentMutation()
    // Update Handeler
    const updateHandeler = async e => {
        e.preventDefault();

        await updateData(studentDetails);
        //    console.log(studentDetails)
    }

    useEffect(() => {
        if (UpdateResponse.isSuccess) {
            toast.success("Assessment Update successfully!");
            handleUpdateFormClose();
        }
        if (UpdateResponse.isError) {
            toast.error("Assessment Update failed!")
            // console.log(UpdateResponse.error)
        }
    }, [UpdateResponse.isSuccess, UpdateResponse.isError])






    const [deleteDialogOpen, setdeleteDialogOpen] = useState(false);
    const [deleteStudentRecord, setDeleteRecord] = useState(null);
    const handleClickdeleteDialogOpenOpen = (data) => {
        setdeleteDialogOpen(true);
        setDeleteRecord(data);
    };

    const handledeleteDialogClose = () => {
        setdeleteDialogOpen(false);
    };

    const [deleteRecord, deleteResponse] = useDeleteAssessmentMutation();
    const handelDeleteAssessmentRecored = async () => {
        if (deleteStudentRecord && deleteStudentRecord.id) {
            await deleteRecord(deleteStudentRecord.id);
            setdeleteDialogOpen(false);
        }
    }

    useEffect(() => {
        if (deleteResponse.isSuccess) {
            toast.success("Record delete successfully!")
        }
        if (deleteResponse.isError) {
            toast.error("Record delete failed!")
            // console.log(deleteResponse.error)
        }
    }, [deleteResponse.isSuccess, deleteResponse.isError])


    return (
        <>
            <CustomTabPanel value={value} index={index}>
                <div className='my-[30px]'>
                    <div className='w-[100%] flex justify-between items-center py-4 px-2'>
                        <p className='text-[20px] font-semibold'>Assessment Upload</p>
                        <button className='flex items-center justify-center gap-1 border-2 border-gray-600 px-4 py-2 rounded-[25px] font-semibold hover:bg-gray-600 hover:text-white transition-all' onClick={handleClickOpen}>
                            <FileUploadRoundedIcon />
                            Upload
                        </button>
                    </div>
                    <div className='w-[100%] mx-auto border-2 border-gray-600 '>
                        <TableContainer component={Paper} sx={{ maxHeight: 440 }} onScroll={handleScroll}>
                            <Table stickyHeader aria-label="simple table" className='rounded-lg'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Serial No</TableCell>
                                        <TableCell>Student ID</TableCell>
                                        <TableCell align="center">Student Name</TableCell>
                                        <TableCell align="center">Subject</TableCell>
                                        <TableCell align="center">Score</TableCell>
                                        <TableCell align="center">Total Marks</TableCell>
                                        <TableCell align="center">Date upload</TableCell>
                                        <TableCell align="center">Update</TableCell>
                                        <TableCell align="center">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allAssessment && allAssessment.length > 0 && allAssessment.map((row, index) => (
                                        <TableRow
                                            key={row._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.studentId}
                                            </TableCell>
                                            <TableCell align="center">{row.studentName}</TableCell>
                                            <TableCell align="center">{row.subject}</TableCell>
                                            <TableCell align="center">{row.score}</TableCell>
                                            <TableCell align="center">{row.totalMarks}</TableCell>
                                            <TableCell align="center">{new Date(row.dateUploaded).toLocaleDateString()}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="update" className='cursor-pointer' onClick={() => handleClickUpdateFormOpen(row)}>
                                                    <DriveFileRenameOutlineRoundedIcon className='text-green-700' />
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="delete" className='cursor-pointer' onClick={() => handleClickdeleteDialogOpenOpen({ id: row._id, studentId: row.studentId })}>
                                                    <DeleteRoundedIcon className='text-pink-700' />
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {isFetching && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}
                        </TableContainer>
                    </div>
                </div>
            </CustomTabPanel>


            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    sx: {
                        width: "600px",  // Set the desired width
                        height: "300px",
                        maxHeight: "auto"
                    },
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Assessment Upload
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <section className="container max-h">
                        <div {...getRootProps({ className: 'dropzone' })} className='border-2 border-gray-400 border-dashed h-[100px] flex items-center justify-center italic text-gray-400'>
                            <input {...getInputProps()} />
                            <div className='flex flex-col items-center'>
                                <p>Drag 'n' drop your file here, or click to select files</p>
                                <span className='text-[12px]'>(Only *.xlsx file will be accepted)</span>
                            </div>
                        </div>
                        <aside className='mt-2'>
                            <ul>{files}</ul>
                        </aside>


                    </section>
                </DialogContent>
                <DialogActions>
                    <button onClick={handelUploadFile} className='border-2 border-gray-600 px-4 py-2 font-semibold text-white bg-gray-600 rounded-[5px] w-full'>Upload</button>
                </DialogActions>
            </Dialog>


            {/* update form start */}
            <Dialog
                open={updateFormOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleUpdateFormClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    sx: {
                        width: "600px",  // Set the desired width
                        height: "auto",
                        maxHeight: "auto"
                    },
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Update Assessment 
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleUpdateFormClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <form className='w-full flex flex-col gap-4' >
                        <TextField name='studentId' value={studentDetails.studentId} onChange={onChnageHandeler} id="outlined-basic" label="Student ID" variant="outlined" className='w-[100%] my-2' />
                        <TextField name='studentName' value={studentDetails.studentName} onChange={onChnageHandeler} id="outlined-basic" label="Student Name" variant="outlined" className='w-[100%] my-2' />
                        <TextField name='subject' value={studentDetails.subject} onChange={onChnageHandeler} id="outlined-basic" label="Subject" variant="outlined" className='w-[100%] my-2' />
                        <TextField name='score' value={studentDetails.score} onChange={onChnageHandeler} id="outlined-basic" label="Score" variant="outlined" className='w-[100%] my-2' />
                        <TextField name='totalMarks' value={studentDetails.totalMarks} onChange={onChnageHandeler} id="outlined-basic" label="Total Marks" variant="outlined" className='w-[100%] my-2' />
                        <TextField name='dateUploaded' value={studentDetails.dateUploaded && new Date(studentDetails.dateUploaded).toISOString().split("T")[0]} onChange={onChnageHandeler} type='date' id="outlined-basic" variant="outlined" className='w-[100%] my-2' />
                    </form>
                </DialogContent>
                <DialogActions>
                    <button onClick={updateHandeler} className='border-2 border-gray-600 px-4 py-2 font-semibold text-white bg-gray-600 rounded-[5px] w-full'>Update</button>
                </DialogActions>
            </Dialog>
            {/* update form end */}


            {/* delete dialog start */}
            <Dialog
                open={deleteDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handledeleteDialogClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    sx: {
                        width: "600px",  // Set the desired width
                        height: "auto",
                        maxHeight: "auto"
                    },
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Delete Assessment Record
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handledeleteDialogClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    Are you want to sure to delete this student ID's <span className='font-semibold'>({deleteStudentRecord && deleteStudentRecord.studentId})</span> record?
                </DialogContent>
                <DialogActions>
                    <button onClick={handelDeleteAssessmentRecored} className='border-2 border-gray-600 px-4 py-2 font-semibold text-white bg-gray-600 rounded-[5px] w-full'>Delete</button>
                </DialogActions>
            </Dialog>
            {/* delete dialog end */}
        </>
    )
}

export default Admin_Assessment_Upload