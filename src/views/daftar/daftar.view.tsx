import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import FormDaftarMember from '../../components/form-daftar-member/formDaftarMember.component'
import FormDaftarInstruktur from '../../components/form-daftar-instruktur/formDaftarInstruktur.component'
import FormDaftarTipeMembership from '../../components/form-daftar-tipe-membership/formDaftarTipeMembership.component'
import CircularLoading from '../../components/circular-loading/circular-loading.component'
import { loadAllTipeMembershipStartAsync } from '../../redux/tipe-membership/tipe-membership.actions'
import { selectIsAllTipeMembershipLoaded } from '../../redux/tipe-membership/tipe-membership.selectors'
import { connect } from 'react-redux'

type Props = {
  loadAllTipeMembershipStartAsync: () => void
  isLoading: Boolean
}

const Daftar: React.FC<Props> = ({ loadAllTipeMembershipStartAsync, isLoading }) => {
  useEffect(() => {
    loadAllTipeMembershipStartAsync()
  }, [loadAllTipeMembershipStartAsync])

  return isLoading ? (
    <CircularLoading />
  ) : (
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
const mapStateToProps = (state) => ({
  isLoading: !selectIsAllTipeMembershipLoaded(state),
})
const mapDispatchToProps = (dispatch) => ({
  loadAllTipeMembershipStartAsync: () => dispatch(loadAllTipeMembershipStartAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Daftar)
