import React, { useState } from 'react'
import Grid, { GridSpacing } from '@material-ui/core/Grid'
// import { Grid } from '@material-ui/core';
import FormDaftarMember from '../../components/form-daftar-member/formDaftarMember.component'
const Daftar: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <FormDaftarMember />
      </Grid>
    </Grid>
  )
}

export default Daftar
