import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import FormDaftarMember from '../../components/form-daftar-member/formDaftarMember.component'
import FormDaftarInstruktur from '../../components/form-daftar-instruktur/formDaftarInstruktur.component'
import FormDaftarTipeMembership from '../../components/form-daftar-tipe-membership/formDaftarTipeMembership.component'
import FormDaftarMembership from '../../components/form-daftar-membership/formDaftarMembership.component'
import CircularLoading from '../../components/circular-loading/circular-loading.component'
import { loadAllTipeMembershipStartAsync } from '../../redux/tipe-membership/tipe-membership.actions'
import { loadAllMemberStartAsync } from '../../redux/member/member.actions'
import { selectIsAllTipeMembershipLoaded } from '../../redux/tipe-membership/tipe-membership.selectors'
import { isMemberLoaded } from '../../redux/member/member.selectors'
import { connect } from 'react-redux'
import { RootState } from '../../redux/root-reducer'

type Props = {
  loadAllTipeMembershipStartAsync: () => void
  loadAllMemberStartAsync: () => void
  isTipeMembershipLoading: Boolean
  isMemberLoading: Boolean
}

const Daftar: React.FC<Props> = ({
  loadAllTipeMembershipStartAsync,
  loadAllMemberStartAsync,
  isTipeMembershipLoading,
  isMemberLoading,
}) => {
  useEffect(() => {
    loadAllTipeMembershipStartAsync()
    loadAllMemberStartAsync()
  }, [loadAllTipeMembershipStartAsync, loadAllMemberStartAsync])

  const isAllLoading = () => {
    return isTipeMembershipLoading || isMemberLoading
  }

  return isAllLoading() ? (
    <CircularLoading />
  ) : (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <FormDaftarMembership />
      </Grid>
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
const mapStateToProps = (state: RootState) => ({
  isTipeMembershipLoading: !selectIsAllTipeMembershipLoaded(state),
  isMemberLoading: !isMemberLoaded(state),
})

const mapDispatchToProps = (dispatch) => ({
  loadAllTipeMembershipStartAsync: () => dispatch(loadAllTipeMembershipStartAsync()),
  loadAllMemberStartAsync: () => dispatch(loadAllMemberStartAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Daftar)
