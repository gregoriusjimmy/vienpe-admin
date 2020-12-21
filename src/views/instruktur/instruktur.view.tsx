import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import AddButton from '../../components/add-button/add-button.component'
import InstrukturForm from '../../components/instruktur-form/instruktur-form.component'
import Modal from '../../components/modal/modal.component'
import EnchancedTable from '../../components/table/enhanced-table/enhanced-table.component'
import CircularLoading from '../../components/circular-loading/circular-loading.component'
import { connect } from 'react-redux'
import { RootState } from '../../redux/root-reducer'
import { InstrukturType } from '../../redux/instruktur/instruktur.types'
import {
  selectAllInstruktur,
  selectIsAllInstrukturLoaded,
} from '../../redux/instruktur/instruktur.selectors'
import { loadAllInstrukturStartAsync } from '../../redux/instruktur/instruktur.actions'

type Props = {
  allInstruktur: Array<InstrukturType> | null
  isAllInstrukturLoaded: boolean
  loadAllInstrukturStartAsync: () => void
}

const Instruktur: React.FC<Props> = ({
  allInstruktur,
  isAllInstrukturLoaded,
  loadAllInstrukturStartAsync,
}) => {
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [searchField, setSearchField] = useState('')
  const [selectedInstruktur, setSelectedInstruktur] = useState<InstrukturType | null>(null)

  useEffect(() => {
    loadAllInstrukturStartAsync()
  }, [loadAllInstrukturStartAsync])

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value)
  }
  const handleAction = (instruktur: InstrukturType) => {
    setSelectedInstruktur(instruktur)
    setOpenEdit(true)
  }
  const handleModalAddClose = () => {
    setOpenAdd(false)
  }

  const handleModalEditClose = () => {
    setOpenEdit(false)
  }
  const headData: Array<{ id: string; label: string }> = [
    { id: 'id', label: 'ID' },
    { id: 'nama', label: 'Nama' },
    { id: 'no_telp', label: 'No. Telp' },
    { id: 'email', label: 'Email' },
    { id: 'tgl_lahir', label: 'Tgl Lahir' },
  ]

  return isAllInstrukturLoaded ? (
    <Grid container spacing={3}>
      <Grid item xs={6}></Grid>
      <Grid container item justify='flex-end' xs={6}>
        <Box m={2}>
          <AddButton text='Tambah Instruktur' handleClick={() => setOpenAdd(true)} />
          <Modal open={openAdd} handleClose={() => setOpenAdd(false)} ariaLabel='modal-add'>
            <InstrukturForm handleModalClose={handleModalAddClose} />
          </Modal>
          <Modal open={openEdit} handleClose={() => setOpenEdit(false)} ariaLabel='modal-edit'>
            <InstrukturForm
              edit
              selectedInstruktur={selectedInstruktur}
              handleModalClose={handleModalEditClose}
            />
          </Modal>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {allInstruktur ? (
          <EnchancedTable
            searchBasedOnId='nama'
            inputSearch={searchField}
            onSearchFieldChange={handleSearchFieldChange}
            title='Instruktur'
            data={allInstruktur}
            arrayDataColumn={headData}
            placeholder='Search nama...'
            handleAction={handleAction}
          />
        ) : null}
      </Grid>
    </Grid>
  ) : (
    <CircularLoading />
  )
}
const mapStateToProps = (state: RootState) => ({
  allInstruktur: selectAllInstruktur(state),
  isAllInstrukturLoaded: selectIsAllInstrukturLoaded(state),
})
const mapDispatchToProps = (dispatch) => ({
  loadAllInstrukturStartAsync: () => dispatch(loadAllInstrukturStartAsync()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Instruktur)
