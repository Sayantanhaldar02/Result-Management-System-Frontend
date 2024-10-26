
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import logo from "../assets/logo.gif";
import { useState } from 'react';
import AttendencePannel from './AttendencePannel';
import AssessmentPannel from './AssessmentPannel';
import LinkedinPostPannel from './LinkedinPostPannel';
import ProjectReviewPannel from './ProjectReviewPannel';
import ProjectSubmissionPannel from './ProjectSubmissionPannel';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { userLogout } from '../Reducers/userReducer/userReducer';


export function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function Student_Dashboard(props) {

    const drawerWidth = 250;
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const [value, setValue] = useState(Number(localStorage.getItem("studentTabIndex")) || 0);

    const handleChange = (event, newValue) => {
        localStorage.setItem("studentTabIndex", newValue)
        setValue(newValue);
        setIsClosing(true);
        setMobileOpen(false);
    }


    const dispatch = useDispatch()


    const drawer = (
        <div>
            <div className='flex flex-col items-center justify-center py-5'>
                <img src={logo} alt="" className='h-10 mt-2' />
                <p className='text-center text-[25px] font-semibold'>Student</p>
            </div>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" orientation="vertical" sx={{
                '.MuiTabs-flexContainer': {
                    alignItems: 'flex-start', // Align the tabs to the left
                    padding: ""
                },
            }}
            >
                <Tab label="Attendence" sx={{ borderBottom: "2px solid #d1d5db  ", borderTop: "2px solid #d1d5db ", width: "100%", alignItems: "start" }} />
                <Tab label="Assessment" sx={{ borderBottom: "2px solid #d1d5db ", width: "100%", alignItems: "start" }} />
                <Tab label="Linkedin Post" sx={{ borderBottom: "2px solid #d1d5db ", width: "100%", alignItems: "start" }} />
                <Tab label="Project Review" sx={{ borderBottom: "2px solid #d1d5db ", width: "100%", alignItems: "start" }} />
                <Tab label="Project Submission" sx={{ borderBottom: "2px solid #d1d5db ", width: "100%", alignItems: "start" }} />
            </Tabs>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        // <div className='bg-background-image h-[100vh] w-[100%] bg-cover bg-center'>
        //     <div className='border-b-2 flex justify-between items-center px-4 bg-white'>
        //         <div>
        //             <img src={logo} alt="" className='h-10' />
        //         </div>
        //         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable"
        //             scrollButtons="auto">
        //             <Tab label="Attendence" {...a11yProps(0)} />
        //             <Tab label="Assessment" {...a11yProps(1)} />
        //             <Tab label="Linkedin Post" {...a11yProps(2)} />
        //             <Tab label="Project Review" {...a11yProps(3)} />
        //             <Tab label="Project Submission" {...a11yProps(4)} />
        //         </Tabs>
        //         <div>
        //             <button>Logout</button>
        //         </div>
        //     </div>
        //     <div className='w-full bg-white bg-opacity-30 backdrop-blur-[3px] h-full'>
        //         <AttendencePannel value={value} index={0} />
        //         <AssessmentPannel value={value} index={1} />
        //         <LinkedinPostPannel value={value} index={2} />
        //         <ProjectReviewPannel value={value} index={3} />
        //         <ProjectSubmissionPannel value={value} index={4} />
        //     </div>
        // </div>

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: "#000"
                }}
            >
                <Toolbar className='w-[100%] flex justify-between items-center'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Student Dashboard
                    </Typography>
                    <button className='px-[20px] py-2 rounded-[5px] hover:bg-gray-600' onClick={() => dispatch(userLogout())}>Logout</button>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <div className='flex-1 w-[100%]'>
                <Toolbar />
                <AttendencePannel value={value} index={0} />
                <AssessmentPannel value={value} index={1} />
                <LinkedinPostPannel value={value} index={2} />
                <ProjectReviewPannel value={value} index={3} />
                <ProjectSubmissionPannel value={value} index={4} />
            </div>
        </Box>
    );
}
