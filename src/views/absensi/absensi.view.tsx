import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import AbsensiForm from '../../components/absensi-form/absensi-form.component'
import { loadAllInstrukturStartAsync } from '../../redux/instruktur/instruktur.actions'
import { loadAllKelasStartAsync } from '../../redux/kelas/kelas.actions'
import { loadAllMembershipStartAsync } from '../../redux/membership/membership.actions'
import { connect } from 'react-redux'
import { selectAllMember, selectIsAllMemberLoaded } from '../../redux/member/member.selectors'
import { selectIsAllMembershipLoaded } from '../../redux/membership/membership.selectors'
import { selectAllKelas, selectIsAllKelasLoaded } from '../../redux/kelas/kelas.selectors'
import { RootState } from '../../redux/root-reducer'
import CircularLoading from '../../components/circular-loading/circular-loading.component'
import { KelasType } from '../../redux/kelas/kelas.types'
import { loadAllMemberStartAsync } from '../../redux/member/member.actions'

type Props = {
  allMember
  allKelas: Array<KelasType> | null
  isAllMemberLoaded: boolean
  isAllMembershipLoaded: boolean
  isAllKelasLoaded: boolean
  loadAllMemberStartAsync: () => void
  loadAllMembershipStartAsync: () => void
  loadAllInstrukturStartAsync: () => void
  loadAllKelasStartAsync: () => void
}

const Absensi: React.FC<Props> = ({
  allMember,
  allKelas,
  isAllMemberLoaded,
  isAllMembershipLoaded,
  isAllKelasLoaded,
  loadAllMemberStartAsync,
  loadAllInstrukturStartAsync,
  loadAllKelasStartAsync,
  loadAllMembershipStartAsync,
}) => {
  useEffect(() => {
    loadAllMemberStartAsync()
    loadAllInstrukturStartAsync()
    loadAllKelasStartAsync()
    loadAllMembershipStartAsync()
  }, [
    loadAllMemberStartAsync,
    loadAllInstrukturStartAsync,
    loadAllKelasStartAsync,
    loadAllMembershipStartAsync,
  ])
  const isAllLoaded = () => {
    return (
      isAllMemberLoaded && isAllKelasLoaded && isAllMembershipLoaded && loadAllInstrukturStartAsync
    )
  }
  return isAllLoaded() ? (
    <Grid container spacing={3}>
      <Grid container>
        <Grid item xs={12}>
          <AbsensiForm allKelas={allKelas} allMember={allMember} />
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
  isAllMemberLoaded: selectIsAllMemberLoaded(state),
  isAllMembershipLoaded: selectIsAllMembershipLoaded(state),
  isAllKelasLoaded: selectIsAllKelasLoaded(state),
})

const mapDispatchToProps = (dispatch) => ({
  loadAllMemberStartAsync: () => dispatch(loadAllMemberStartAsync()),
  loadAllInstrukturStartAsync: () => dispatch(loadAllInstrukturStartAsync()),
  loadAllMembershipStartAsync: () => dispatch(loadAllMembershipStartAsync()),
  loadAllKelasStartAsync: () => dispatch(loadAllKelasStartAsync()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Absensi)
