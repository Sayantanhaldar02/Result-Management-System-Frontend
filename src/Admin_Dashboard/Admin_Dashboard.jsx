import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from "../assets/logo.gif";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Admin_Attendence_Upload, Admin_Assessment_Upload, Admin_Linkedin_Post_Score_Upload, Admin_Project_Review_Score_Upload, Admin_Project_Submission_Score_Upload } from './Admin_Component';
import { useDispatch } from 'react-redux';
import { userLogout } from '../Reducers/userReducer/userReducer';



const drawerWidth = 250;


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



function Admin_Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

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

  const [value, setValue] = React.useState(Number(localStorage.getItem("adminTabIndex")) || 0);

  const handleChange = (event, newValue) => {
    localStorage.setItem("adminTabIndex", newValue)
    setValue(newValue);
    setIsClosing(true);
    setMobileOpen(false);
  }

  const dispatch = useDispatch();

  const drawer = (
    <div>
      <div className='flex flex-col items-center justify-center py-5'>
        <img src={logo} alt="" className='h-10 mt-2' />
        <p className='text-center text-[25px] font-semibold'>Admin</p>
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
            Admin Dashboard
          </Typography>
          <button className='px-[20px] py-2 rounded-[5px] hover:bg-gray-600' onClick={()=>dispatch(userLogout())}>Logout</button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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

        <Admin_Attendence_Upload value={value} index={0} />
        <Admin_Assessment_Upload value={value} index={1} />
        <Admin_Linkedin_Post_Score_Upload value={value} index={2} />
        <Admin_Project_Review_Score_Upload value={value} index={3} />
        <Admin_Project_Submission_Score_Upload value={value} index={4} />
      </div>
    </Box>
  )
}

Admin_Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default Admin_Dashboard;
