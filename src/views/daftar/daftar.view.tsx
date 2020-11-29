import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
// import { Grid } from '@material-ui/core';
import FormDaftarMember from '../../components/form-daftar-member/formDaftarMember.component'
import FormDaftarInstruktur from '../../components/form-daftar-instruktur/formDaftarInstruktur.component'
import FormDaftarTipeMembership from '../../components/form-daftar-tipe-membership/formDaftarTipeMembership.component'
import { connect } from 'react-redux'
import { fetchAllTipeMembershipStartAsync } from '../../redux/tipe-membership/tipe-membership.actions'

type Props = {
  fetchAllTipeMembershipStartAsync: () => void
}

const Daftar: React.FC<Props> = ({ fetchAllTipeMembershipStartAsync }) => {
  useEffect(() => {
    fetchAllTipeMembershipStartAsync()
  }, [])

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
const mapDispatchToProps = (dispatch) => ({
  fetchAllTipeMembershipStartAsync: () => dispatch(fetchAllTipeMembershipStartAsync()),
})

export default connect(null, mapDispatchToProps)(Daftar)
