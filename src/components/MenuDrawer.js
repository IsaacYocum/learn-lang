import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function MenuDrawer() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerOpen(open);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <nav>
                    <ListItem key={'homeNav'} >
                        <Link to="/">Home</Link>
                    </ListItem>
                    <ListItem key={'textsNav'} >
                        <Link to="/texts">View Texts</Link>
                    </ListItem>
                    <ListItem key={'addtextsNav'} >
                        <Link to="/texts/addtext">Add Text</Link>
                    </ListItem>
                    <ListItem key={'languagesNav'} >
                        <Link to="/languages">View Languages</Link>
                    </ListItem>
                    <ListItem key={'settingsNav'} >
                        <Link to="/settings">Settings</Link>
                    </ListItem>
                    <ListItem key={'aboutNav'} >
                        <Link to="/about">About</Link>
                    </ListItem>
                </nav>
            </List>
        </Box>
    );

    return (
        <div>
            <Fragment key={'left'}>
                <IconButton onClick={toggleDrawer(true)}>
                    <MenuIcon color='primary' fontSize='large'/>   
                </IconButton>
                <Drawer
                    anchor={'left'}
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    {list()}
                </Drawer>
            </Fragment>
        </div>
    );
}
