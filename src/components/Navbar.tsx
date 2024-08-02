import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
    const router = useRouter();

    const handleHomeClick = () => {
        router.push('/');
    };

    return (
        <AppBar position="static" sx={{ bgcolor: '#2196f3' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    AdBanner
                </Typography>
                <Button color="inherit" onClick={handleHomeClick}>
                    Home
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
