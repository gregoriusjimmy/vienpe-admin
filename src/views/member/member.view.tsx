import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import AddButton from '../../components/add-button/add-button.component'
import FormDaftarMember from '../../components/form-daftar-member/formDaftarMember.component'
import Modal from '../../components/containers/modal/modal.component'
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
  const [open, setOpen] = useState(false)

  useEffect(() => {
    loadAllMemberStartAsync()
  }, [loadAllMemberStartAsync])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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
          <AddButton text='Tambah Member' handleClick={handleOpen} />
          <Modal open={open} handleClose={handleClose} ariaLabel='modal-add'>
            <FormDaftarMember />
          </Modal>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {allMember ? (
          <EnchancedTable title='Member' data={allMember} arrayDataColumn={headData} />
        ) : null}
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
