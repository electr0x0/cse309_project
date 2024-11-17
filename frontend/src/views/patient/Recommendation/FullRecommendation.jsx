import React, { useState } from 'react'

import Grid from '@mui/material/Grid'

import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { CardContent } from '@mui/material'

import DietList from '../Recommendation/Diet/DietList'
import FacilityList from '../Recommendation/Facility/FacilityList'
import DietRecommendation from './Dialogue/DietRecommendationDialogue'
import FacilityRecommendation from './Dialogue/FacilityRecommendationDialogue'

function PrescriptionComplete() {
  const [value, setValue] = useState('ai')

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <TabContext value={value}>
        <TabList variant='scrollable' onChange={handleTabChange} className='border-be'>
          <Tab label='AI Recommendation' value='ai' />
          <Tab label='Suggested Diets' value='diet' />
          <Tab label='Suggested Facilities' value='facility' />
        </TabList>
        <CardContent>
          <TabPanel value='ai'>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <DietRecommendation />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FacilityRecommendation />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value='diet'>
            <DietList />
          </TabPanel>
          <TabPanel value='facility'>
            <FacilityList />
          </TabPanel>
        </CardContent>
      </TabContext>
    </div>
  )
}

export default PrescriptionComplete
