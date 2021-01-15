import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import AbsensiForm from '../../components/absensi-form/absensi-form.component'
import { loadAllInstrukturStartAsync } from '../../redux/instruktur/instruktur.actions'
import { loadAllKelasStartAsync } from '../../redux/kelas/kelas.actions'
import { loadAllMembershipStartAsync } from '../../redux/membership/membership.actions'
import { connect } from 'react-redux'
import { selectIsAllMemberLoaded } from '../../redux/member/member.selectors'
import { selectIsAllMembershipLoaded } from '../../redux/membership/membership.selectors'
import { selectIsAllKelasLoaded } from '../../redux/kelas/kelas.selectors'
import { RootState } from '../../redux/root-reducer'
import CircularLoading from '../../components/circular-loading/circular-loading.component'
import { loadAllMemberStartAsync } from '../../redux/member/member.actions'
import { selectIsAllInstrukturLoaded } from '../../redux/instruktur/instruktur.selectors'
import { selectIsAllTipeMembershipLoaded } from '../../redux/tipe-membership/tipe-membership.selectors'
import { loadAllTipeMembershipStartAsync } from '../../redux/tipe-membership/tipe-membership.actions'
import TableCard from '../../components/table-card/table-card.component'
import CustomDataGrid from '../../components/custom-data-grid/custom-data-grid.component'
import { ColDef, ValueFormatterParams } from '@material-ui/data-grid'
import { loadAllAbsensiMemberStartAsync } from '../../redux/absensi-member/absensi-member.actions'
import { loadAllAbsensiInstrukturStartAsync } from '../../redux/absensi-instruktur/absensi-instruktur.actions'
import {
  selectAllAbsensiMember,
  selectIsAllAbsensiMemberLoaded,
} from '../../redux/absensi-member/absensi-member.selectors'
import { AbsensiMemberViewType } from '../../redux/absensi-member/absensi-member.types'
import {
  selectAllAbsensiInstruktur,
  selectIsAllAbsensiInstrukturLoaded,
} from '../../redux/absensi-instruktur/absensi-instruktur.selectors'
import { AbsensiInstrukturViewType } from '../../redux/absensi-instruktur/absensi-instruktur.types'
import CustomNowRowsOverlay from '../../components/custom-no-rows-overlay/custom-no-rows-overlay.component'

type Props = {
  allAbsensiMember: Array<AbsensiMemberViewType> | null
  allAbsensiInstruktur: Array<AbsensiInstrukturViewType> | null
  isAllMemberLoaded: boolean
  isAllMembershipLoaded: boolean
  isAllKelasLoaded: boolean
  isAllInstrukturLoaded: boolean
  isAllTipeMembershipLoaded: boolean
  isAllAbsensiMemberLoaded: boolean
  isAllAbsensiInstrukturLoaded: boolean
  loadAllMemberStartAsync: () => void
  loadAllMembershipStartAsync: () => void
  loadAllInstrukturStartAsync: () => void
  loadAllKelasStartAsync: () => void
  loadAllTipeMembershipStartAsync: () => void
  loadAllAbsensiInstrukturStartAsync: () => void
  loadAllAbsensiMemberStartAsync: () => void
}

const Absensi: React.FC<Props> = ({
  allAbsensiMember,
  allAbsensiInstruktur,
  isAllMemberLoaded,
  isAllMembershipLoaded,
  isAllKelasLoaded,
  isAllInstrukturLoaded,
  isAllTipeMembershipLoaded,
  isAllAbsensiMemberLoaded,
  isAllAbsensiInstrukturLoaded,
  loadAllMemberStartAsync,
  loadAllInstrukturStartAsync,
  loadAllKelasStartAsync,
  loadAllMembershipStartAsync,
  loadAllTipeMembershipStartAsync,
  loadAllAbsensiInstrukturStartAsync,
  loadAllAbsensiMemberStartAsync,
}) => {
  useEffect(() => {
    loadAllMemberStartAsync()
    loadAllInstrukturStartAsync()
    loadAllKelasStartAsync()
    loadAllMembershipStartAsync()
    loadAllTipeMembershipStartAsync()
    loadAllAbsensiInstrukturStartAsync()
    loadAllAbsensiMemberStartAsync()
  }, [
    loadAllMemberStartAsync,
    loadAllInstrukturStartAsync,
    loadAllKelasStartAsync,
    loadAllMembershipStartAsync,
    loadAllTipeMembershipStartAsync,
    loadAllAbsensiInstrukturStartAsync,
    loadAllAbsensiMemberStartAsync,
  ])
  const isAllLoaded = (): boolean => {
    return (
      isAllMemberLoaded &&
      isAllKelasLoaded &&
      isAllMembershipLoaded &&
      isAllInstrukturLoaded &&
      isAllTipeMembershipLoaded &&
      isAllAbsensiMemberLoaded &&
      isAllAbsensiInstrukturLoaded
    )
  }
  const columnsAbsensiMember: ColDef[] = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'nama', headerName: 'Nama', flex: 1 },
    { field: 'tgl_absensi', headerName: 'Tgl Absen', type: 'date', flex: 0.6 },
    { field: 'hari', headerName: 'Hari', flex: 0.5 },
    { field: 'jam', headerName: 'Jam', flex: 0.5 },
    { field: 'kategori_senam', headerName: 'Senam', flex: 1 },
    { field: 'instruktur', headerName: 'Instruktur', flex: 1 },
    {
      field: 'id_membership',
      headerName: 'Pakai Membership',
      flex: 0.5,
      renderCell: (params: ValueFormatterParams) => <span>{params.value != null ? '✔' : ''}</span>,
    },
  ]
  const columnsAbsensiInstruktur: ColDef[] = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'nama', headerName: 'Nama', flex: 1 },
    { field: 'tgl_absensi', headerName: 'Tgl Absen', type: 'date', flex: 0.6 },
    { field: 'hari', headerName: 'Hari', flex: 0.5 },
    { field: 'jam', headerName: 'Jam', flex: 0.5 },
    { field: 'kategori_senam', headerName: 'Senam', flex: 1 },
  ]

  return isAllLoaded() ? (
    <Grid container spacing={3}>
      <Grid container>
        <Grid item xs={12}>
          <AbsensiForm />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableCard title='Absensi Member'>
          {allAbsensiMember && (
            <CustomDataGrid
              components={{
                noRowsOverlay: CustomNowRowsOverlay,
              }}
              rows={allAbsensiMember}
              columns={columnsAbsensiMember}
              showToolbar={false}
            />
          )}
        </TableCard>
      </Grid>
      <Grid item xs={12}>
        <TableCard title='Absensi Instruktur'>
          {allAbsensiInstruktur && (
            <CustomDataGrid
              components={{ noRowsOverlay: CustomNowRowsOverlay }}
              rows={allAbsensiInstruktur}
              columns={columnsAbsensiInstruktur}
              showToolbar={false}
            />
          )}
        </TableCard>
      </Grid>
    </Grid>
  ) : (
    <CircularLoading />
  )
}

const mapStateToProps = (state: RootState) => ({
  allAbsensiMember: selectAllAbsensiMember(state),
  allAbsensiInstruktur: selectAllAbsensiInstruktur(state),
  isAllMemberLoaded: selectIsAllMemberLoaded(state),
  isAllMembershipLoaded: selectIsAllMembershipLoaded(state),
  isAllKelasLoaded: selectIsAllKelasLoaded(state),
  isAllInstrukturLoaded: selectIsAllInstrukturLoaded(state),
  isAllTipeMembershipLoaded: selectIsAllTipeMembershipLoaded(state),
  isAllAbsensiMemberLoaded: selectIsAllAbsensiMemberLoaded(state),
  isAllAbsensiInstrukturLoaded: selectIsAllAbsensiInstrukturLoaded(state),
})

const mapDispatchToProps = (dispatch) => ({
  loadAllMemberStartAsync: () => dispatch(loadAllMemberStartAsync()),
  loadAllInstrukturStartAsync: () => dispatch(loadAllInstrukturStartAsync()),
  loadAllMembershipStartAsync: () => dispatch(loadAllMembershipStartAsync()),
  loadAllKelasStartAsync: () => dispatch(loadAllKelasStartAsync()),
  loadAllTipeMembershipStartAsync: () => dispatch(loadAllTipeMembershipStartAsync()),
  loadAllAbsensiMemberStartAsync: () => dispatch(loadAllAbsensiMemberStartAsync()),
  loadAllAbsensiInstrukturStartAsync: () => dispatch(loadAllAbsensiInstrukturStartAsync()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Absensi)
