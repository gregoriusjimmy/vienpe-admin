import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import AddButton from '../../components/add-button/add-button.component'
import MemberForm from '../../components/member-form/member-form.component'
import Modal from '../../components/modal/modal.component'
import EnchancedTable from '../../components/table/enhanced-table/enhanced-table.component'
import CircularLoading from '../../components/circular-loading/circular-loading.component'
import { connect } from 'react-redux'
import { RootState } from '../../redux/root-reducer'
import { selectAllMember, selectIsAllMemberLoaded } from '../../redux/member/member.selectors'
import { MemberType } from '../../redux/member/member.types'
import { loadAllMemberStartAsync } from '../../redux/member/member.actions'

type Props = {
  allMember: Array<MemberType> | null
  isAllMemberLoaded: boolean
  loadAllMemberStartAsync: () => void
}

const Member: React.FC<Props> = ({ allMember, isAllMemberLoaded, loadAllMemberStartAsync }) => {
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [searchField, setSearchField] = useState('')
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null)

  useEffect(() => {
    loadAllMemberStartAsync()
  }, [loadAllMemberStartAsync])

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value)
  }
  const handleAction = (member: MemberType) => {
    setSelectedMember(member)
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
    { id: 'status_membership', label: 'Membership?' },
  ]

  return isAllMemberLoaded ? (
    <Grid container spacing={3}>
      <Grid item xs={6}></Grid>
      <Grid container item justify='flex-end' xs={6}>
        <Box m={2}>
          <AddButton text='Tambah Member' handleClick={() => setOpenAdd(true)} />
          <Modal open={openAdd} handleClose={() => setOpenAdd(false)} ariaLabel='modal-add'>
            <MemberForm handleModalClose={handleModalAddClose} />
          </Modal>
          <Modal open={openEdit} handleClose={() => setOpenEdit(false)} ariaLabel='modal-edit'>
            <MemberForm
              edit
              selectedMember={selectedMember}
              handleModalClose={handleModalEditClose}
            />
          </Modal>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {allMember && (
          <EnchancedTable
            searchBasedOnId='nama'
            inputSearch={searchField}
            onSearchFieldChange={handleSearchFieldChange}
            title='Member'
            data={allMember}
            arrayDataColumn={headData}
            placeholder='Search nama...'
            handleAction={handleAction}
          />
        )}
      </Grid>
    </Grid>
  ) : (
    <CircularLoading />
  )
}
const mapStateToProps = (state: RootState) => ({
  allMember: selectAllMember(state),
  isAllMemberLoaded: selectIsAllMemberLoaded(state),
})
const mapDispatchToProps = (dispatch) => ({
  loadAllMemberStartAsync: () => dispatch(loadAllMemberStartAsync()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Member)
