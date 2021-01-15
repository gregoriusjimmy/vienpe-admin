import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import AddButton from '../../components/add-button/add-button.component'
import KelasForm from '../../components/kelas-form/kelas-form.component'
import Modal from '../../components/modal/modal.component'
import EnchancedTable from '../../components/table/enhanced-table/enhanced-table.component'
import CircularLoading from '../../components/circular-loading/circular-loading.component'
import { connect } from 'react-redux'
import { RootState } from '../../redux/root-reducer'
import { KelasType, KelasWithInstrukturType } from '../../redux/kelas/kelas.types'
import { selectAllKelas, selectIsAllKelasLoaded } from '../../redux/kelas/kelas.selectors'
import { loadAllKelasStartAsync, updateKelasAktifStartAsync } from '../../redux/kelas/kelas.actions'
import { loadAllInstrukturStartAsync } from '../../redux/instruktur/instruktur.actions'
import {
  selectAllInstruktur,
  selectIsAllInstrukturLoaded,
} from '../../redux/instruktur/instruktur.selectors'
import { combineAllKelasWithInstruktur } from '../../utils/utils'
import { InstrukturType } from '../../redux/instruktur/instruktur.types'

type Props = {
  allKelas: Array<KelasType> | null
  allInstruktur: Array<InstrukturType> | null
  isAllKelasLoaded: boolean
  isAllInstrukturLoaded: boolean
  loadAllKelasStartAsync: () => void
  loadAllInstrukturStartAsync: () => void
  updateKelasAktifStartAsync: (kelas: { id: string; aktif: boolean }) => void
}

const Kelas: React.FC<Props> = ({
  allKelas,
  isAllKelasLoaded,
  isAllInstrukturLoaded,
  allInstruktur,
  loadAllKelasStartAsync,
  loadAllInstrukturStartAsync,
  updateKelasAktifStartAsync,
}) => {
  const [openAdd, setOpenAdd] = useState(false)
  const [searchField, setSearchField] = useState('')
  const [data, setData] = useState<KelasWithInstrukturType[] | null>(null)
  useEffect(() => {
    loadAllKelasStartAsync()
    loadAllInstrukturStartAsync()
  }, [loadAllKelasStartAsync, loadAllInstrukturStartAsync])

  useEffect(() => {
    setData(combineAllKelasWithInstruktur(allKelas, allInstruktur))
  }, [allKelas, allInstruktur])

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value)
  }

  const handleModalAddClose = () => {
    setOpenAdd(false)
  }
  const isAllLoaded = (): boolean => {
    return isAllKelasLoaded && isAllInstrukturLoaded
  }
  const handleActionSwitch = ({ id, aktif }) => {
    updateKelasAktifStartAsync({ id, aktif })
  }

  const headData: Array<{ id: string; label: string }> = [
    { id: 'id', label: 'ID' },
    { id: 'hari', label: 'Hari' },
    { id: 'jam', label: 'Jam' },
    { id: 'kategori_senam', label: 'Kategori' },
    { id: 'nama_instruktur', label: 'Instruktur' },
    { id: 'aktif', label: 'Aktif?' },
    { id: 'created_at', label: 'Tgl Dibuat' },
  ]

  return isAllLoaded() ? (
    <Grid container spacing={3}>
      <Grid item xs={6}></Grid>
      <Grid container item justify='flex-end' xs={6}>
        <Box m={2}>
          <AddButton text='Tambah Kelas' handleClick={() => setOpenAdd(true)} />
          <Modal open={openAdd} handleClose={() => setOpenAdd(false)} ariaLabel='modal-add'>
            <KelasForm handleModalClose={handleModalAddClose} />
          </Modal>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {data && (
          <EnchancedTable
            searchBasedOnId='hari'
            inputSearch={searchField}
            onSearchFieldChange={handleSearchFieldChange}
            title='Kelas'
            data={data}
            arrayDataColumn={headData}
            placeholder='Search hari...'
            handleActionSwitch={handleActionSwitch}
          />
        )}
      </Grid>
    </Grid>
  ) : (
    <CircularLoading />
  )
}
const mapStateToProps = (state: RootState) => ({
  allKelas: selectAllKelas(state),
  isAllKelasLoaded: selectIsAllKelasLoaded(state),
  isAllInstrukturLoaded: selectIsAllInstrukturLoaded(state),
  allInstruktur: selectAllInstruktur(state),
})
const mapDispatchToProps = (dispatch) => ({
  loadAllKelasStartAsync: () => dispatch(loadAllKelasStartAsync()),
  loadAllInstrukturStartAsync: () => dispatch(loadAllInstrukturStartAsync()),
  updateKelasAktifStartAsync: (kelas: { id: string; aktif: boolean }) =>
    dispatch(updateKelasAktifStartAsync(kelas)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Kelas)
