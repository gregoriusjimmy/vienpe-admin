import React from 'react'
import Grid from '@material-ui/core/Grid'
// import { Grid } from '@material-ui/core';
import FormDaftarMember from '../../components/form-daftar-member/formDaftarMember.component'
import FormDaftarInstruktur from '../../components/form-daftar-instruktur/formDaftarInstruktur.component'
import FormDaftarTipeMembership from '../../components/form-daftar-tipe-membership/formDaftarTipeMembership.component'
const Daftar: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <FormDaftarMember />
      </Grid>
      <Grid item xs={6}>
        <FormDaftarInstruktur />
      </Grid>
      <Grid item xs={12}>
        <FormDaftarTipeMembership />
      </Grid>
    </Grid>
  )
}

export default Daftar
