import React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import OpenDialogOnElementClick from '../../../../components/dialogue/OpenDialogOnElementClick'
import FacilityRecommendationForm from './Forms/FacilityRecommendationForm'

const FacilityRecommendationCard = ({ open, setOpen }) => {
  const buttonProps = {
    variant: 'contained',
    children: 'Show'
  }

  return (
    <Card>
      <CardContent className='flex flex-col items-center text-center gap-4'>
        <i className='tabler-hospital text-[34px] text-textPrimary' />
        <Typography variant='h5'>Facility Recommendations</Typography>
        <Typography color='text.primary'>
          Ready to use form to collect facility parameters for recommendations.
        </Typography>
        <OpenDialogOnElementClick element={Button} elementProps={buttonProps} dialog={FacilityRecommendationForm} />
      </CardContent>
    </Card>
  )
}

export default FacilityRecommendationCard
