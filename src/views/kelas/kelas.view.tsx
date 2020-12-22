import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import AddButton from '../../components/add-button/add-button.component'
import KelasForm from '../../components/kelas-form/kelas-form.component'
import Modal from '../../components/modal/modal.component'
import EnchancedTable from '../../components/table/enhanced-table/enhanced-table.component'
import CircularLoading from '../../components/circular-loading/circular-loading.component'
import { connect } from 'react-redux'
import { RootState } from '../../redux/root-reducer'
import { KelasType } from '../../redux/kelas/kelas.types'
import { selectAllKelas, selectIsAllKelasLoaded } from '../../redux/kelas/kelas.selectors'
import { loadAllKelasStartAsync } from '../../redux/kelas/kelas.actions'
import { loadAllInstrukturStartAsync } from '../../redux/instruktur/instruktur.actions'
import {
  selectAllInstrukturNameWithId,
  selectIsAllInstrukturLoaded,
} from '../../redux/instruktur/instruktur.selectors'

type Props = {
  allKelas: Array<KelasType> | null
  allInstrukturNameWithId: Array<{ id: string; nama: string }> | null
  isAllKelasLoaded: boolean
  isAllInstrukturLoaded: boolean
  loadAllKelasStartAsync: () => void
  loadAllInstrukturStartAsync: () => void
}

const Kelas: React.FC<Props> = ({
  allKelas,
  isAllKelasLoaded,
  isAllInstrukturLoaded,
  allInstrukturNameWithId,
  loadAllKelasStartAsync,
  loadAllInstrukturStartAsync,
}) => {
  const [openAdd, setOpenAdd] = useState(false)
  const [searchField, setSearchField] = useState('')

  useEffect(() => {
    loadAllKelasStartAsync()
    loadAllInstrukturStartAsync()
  }, [loadAllKelasStartAsync, loadAllInstrukturStartAsync])

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value)
  }

  const handleModalAddClose = () => {
    setOpenAdd(false)
  }
  const isAllLoaded = (): boolean => {
    return isAllKelasLoaded && isAllInstrukturLoaded
  }

  const allKelasWithInstrukturName = () => {
    return allKelas!.map((kelas) => {
      const { id, hari, jam, kategori_senam, id_instruktur, keterangan, created_at } = kelas
      const findMatch = allInstrukturNameWithId?.find(
        (instruktur) => id_instruktur === instruktur.id
      )
      console.log(findMatch)
      const orderedData = {
        id,
        hari,
        jam,
        kategori_senam,
        nama_instruktur: findMatch!.nama,
        keterangan,
        created_at,
      }
      return orderedData
    })
  }
  const headData: Array<{ id: string; label: string }> = [
    { id: 'id', label: 'ID' },
    { id: 'hari', label: 'Hari' },
    { id: 'jam', label: 'Jam' },
    { id: 'kategori_senam', label: 'Kategori' },
    { id: 'nama_instruktur', label: 'Instruktur' },
    { id: 'keterangan', label: 'Keterangan' },
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
        {allKelas ? (
          <EnchancedTable
            searchBasedOnId='hari'
            inputSearch={searchField}
            onSearchFieldChange={handleSearchFieldChange}
            title='Kelas'
            data={allKelasWithInstrukturName()}
            arrayDataColumn={headData}
            placeholder='Search hari...'
          />
        ) : null}
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
  allInstrukturNameWithId: selectAllInstrukturNameWithId(state),
})
const mapDispatchToProps = (dispatch) => ({
  loadAllKelasStartAsync: () => dispatch(loadAllKelasStartAsync()),
  loadAllInstrukturStartAsync: () => dispatch(loadAllInstrukturStartAsync()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Kelas)
