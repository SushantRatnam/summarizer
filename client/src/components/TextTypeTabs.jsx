import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


export default function TextTypeTabs({selectedTab, handleSelectedChange}) {
  

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={selectedTab} onChange={handleSelectedChange} centered>
        <Tab label="Full Text" />
        <Tab label="Summarized Text" />
        <Tab label="Keywords" />
      </Tabs>
    </Box>
  );
}