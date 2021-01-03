import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import AbsensiForm from '../../components/absensi-form/absensi-form.component'
import { loadAllInstrukturStartAsync } from '../../redux/instruktur/instruktur.actions'
import { loadAllKelasStartAsync } from '../../redux/kelas/kelas.actions'
import { loadAllMembershipStartAsync } from '../../redux/membership/membership.actions'
import { connect } from 'react-redux'
import { selectAllMember, selectIsAllMemberLoaded } from '../../redux/member/member.selectors'
import {
  selectAllMembership,
  selectIsAllMembershipLoaded,
} from '../../redux/membership/membership.selectors'
import { selectAllKelas, selectIsAllKelasLoaded } from '../../redux/kelas/kelas.selectors'
import { RootState } from '../../redux/root-reducer'
import CircularLoading from '../../components/circular-loading/circular-loading.component'
import { KelasType } from '../../redux/kelas/kelas.types'
import { loadAllMemberStartAsync } from '../../redux/member/member.actions'
import {
  combineAllKelasWithInstruktur,
  combineAllMembershipWithTipeMembership,
} from '../../utils/utils'
import {
  selectAllInstruktur,
  selectAllInstrukturNameWithId,
} from '../../redux/instruktur/instruktur.selectors'
import { MemberType } from '../../redux/member/member.types'
import { InstrukturNameWithIdType, InstrukturType } from '../../redux/instruktur/instruktur.types'
import { MembershipType } from '../../redux/membership/membership.types'
import {
  selectAllTipeMembership,
  selectIsAllTipeMembershipLoaded,
} from '../../redux/tipe-membership/tipe-membership.selectors'
import { loadAllTipeMembershipStartAsync } from '../../redux/tipe-membership/tipe-membership.actions'
import { TipeMembershipType } from '../../redux/tipe-membership/tipe-membership.types'

type Props = {
  allMember: Array<MemberType> | null
  allKelas: Array<KelasType> | null
  allInstruktur: Array<InstrukturType> | null
  allMembership: Array<MembershipType> | null
  allTipeMembership: Array<TipeMembershipType> | null
  isAllMemberLoaded: boolean
  isAllMembershipLoaded: boolean
  isAllKelasLoaded: boolean
  isAllInstrukturLoaded: boolean
  isAllTipeMembershipLoaded: boolean
  loadAllMemberStartAsync: () => void
  loadAllMembershipStartAsync: () => void
  loadAllInstrukturStartAsync: () => void
  loadAllKelasStartAsync: () => void
  loadAllTipeMembershipStartAsync: () => void
}

const Absensi: React.FC<Props> = ({
  allMember,
  allKelas,
  allMembership,
  allTipeMembership,
  allInstruktur,
  isAllMemberLoaded,
  isAllMembershipLoaded,
  isAllKelasLoaded,
  isAllInstrukturLoaded,
  isAllTipeMembershipLoaded,
  loadAllMemberStartAsync,
  loadAllInstrukturStartAsync,
  loadAllKelasStartAsync,
  loadAllMembershipStartAsync,
  loadAllTipeMembershipStartAsync,
}) => {
  useEffect(() => {
    loadAllMemberStartAsync()
    loadAllInstrukturStartAsync()
    loadAllKelasStartAsync()
    loadAllMembershipStartAsync()
    loadAllTipeMembershipStartAsync()
  }, [
    loadAllMemberStartAsync,
    loadAllInstrukturStartAsync,
    loadAllKelasStartAsync,
    loadAllMembershipStartAsync,
    loadAllTipeMembershipStartAsync,
  ])
  const isAllLoaded = () => {
    return (
      isAllMemberLoaded &&
      isAllKelasLoaded &&
      isAllMembershipLoaded &&
      isAllInstrukturLoaded &&
      isAllTipeMembershipLoaded
    )
  }
  return isAllLoaded() ? (
    <Grid container spacing={3}>
      <Grid container>
        <Grid item xs={12}>
          <AbsensiForm />
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <CircularLoading />
  )
}

const mapStateToProps = (state: RootState) => ({
  allMember: selectAllMember(state),
  allKelas: selectAllKelas(state),
  allTipeMembership: selectAllTipeMembership(state),
  allMembership: selectAllMembership(state),
  allInstruktur: selectAllInstruktur(state),
  isAllMemberLoaded: selectIsAllMemberLoaded(state),
  isAllMembershipLoaded: selectIsAllMembershipLoaded(state),
  isAllKelasLoaded: selectIsAllKelasLoaded(state),
  isAllInstrukturLoaded: selectIsAllKelasLoaded(state),
  isAllTipeMembershipLoaded: selectIsAllTipeMembershipLoaded(state),
})

const mapDispatchToProps = (dispatch) => ({
  loadAllMemberStartAsync: () => dispatch(loadAllMemberStartAsync()),
  loadAllInstrukturStartAsync: () => dispatch(loadAllInstrukturStartAsync()),
  loadAllMembershipStartAsync: () => dispatch(loadAllMembershipStartAsync()),
  loadAllKelasStartAsync: () => dispatch(loadAllKelasStartAsync()),
  loadAllTipeMembershipStartAsync: () => dispatch(loadAllTipeMembershipStartAsync()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Absensi)
