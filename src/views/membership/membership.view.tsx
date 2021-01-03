import React, { useEffect, useState } from 'react'
import { Grid, Box } from '@material-ui/core'
import AddButton from '../../components/add-button/add-button.component'
import Modal from '../../components/modal/modal.component'
import MembershipFormAdd from '../../components/membership-form-add/membership-form-add.component'
import MembershipFormUpdate from '../../components/membership-form-update/membership-form-update.component'
import CircularLoading from '../../components/circular-loading/circular-loading.component'
import EnhancedTable from '../../components/table/enhanced-table/enhanced-table.component'
import { connect } from 'react-redux'
import { loadAllTipeMembershipStartAsync } from '../../redux/tipe-membership/tipe-membership.actions'
import { loadAllMemberStartAsync } from '../../redux/member/member.actions'
import { selectIsAllTipeMembershipLoaded } from '../../redux/tipe-membership/tipe-membership.selectors'
import {
  selectAllMember,
  selectAllMemberNameWithId,
  selectIsAllMemberLoaded,
} from '../../redux/member/member.selectors'
import { RootState } from '../../redux/root-reducer'
import {
  selectAllMembership,
  selectIsAllMembershipLoaded,
} from '../../redux/membership/membership.selectors'
import { MembershipType } from '../../redux/membership/membership.types'
import { loadAllMembershipStartAsync } from '../../redux/membership/membership.actions'
import UpdateButton from '../../components/update-button/update-button.component'
import { combineAllMembershipWithMember } from '../../utils/utils'
import { MemberType } from '../../redux/member/member.types'

type Props = {
  allMembership: Array<MembershipType> | null
  loadAllMemberStartAsync: () => void
  loadAllTipeMembershipStartAsync: () => void
  loadAllMembershipStartAsync: () => void
  isAllTipeMembershipLoaded: boolean
  isAllMemberLoaded: boolean
  isAllMembershipLoaded: boolean
  allMember: Array<MemberType> | null
}
const Membership: React.FC<Props> = ({
  allMembership,
  allMember,
  loadAllTipeMembershipStartAsync,
  loadAllMembershipStartAsync,
  loadAllMemberStartAsync,
  isAllTipeMembershipLoaded,
  isAllMemberLoaded,
  isAllMembershipLoaded,
}) => {
  const [openAdd, setOpenAdd] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [searchField, setSearchField] = useState('')

  const handleOpenAdd = () => {
    setOpenAdd(true)
  }
  const handleOpenUpdate = () => {
    setOpenUpdate(true)
  }
  useEffect(() => {
    loadAllTipeMembershipStartAsync()
    loadAllMemberStartAsync()
    loadAllMembershipStartAsync()
  }, [loadAllTipeMembershipStartAsync, loadAllMemberStartAsync, loadAllMembershipStartAsync])

  const handleCloseAdd = () => {
    setOpenAdd(false)
  }
  const handleCloseUpdate = () => {
    setOpenUpdate(false)
  }
  const isAllLoaded = () => {
    return isAllMemberLoaded && isAllTipeMembershipLoaded && isAllMembershipLoaded
  }

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value)
  }
  const headData: Array<{ id: string; label: string }> = [
    { id: 'id', label: 'ID' },
    { id: 'id_member', label: 'ID Member' },
    { id: 'nama_member', label: 'Nama' },
    { id: 'tipe_membership', label: 'Tipe Memberhsip' },
    { id: 'tgl_mulai', label: 'Tgl Mulai' },
    { id: 'tgl_selesai', label: 'Tgl Selesai' },
    { id: 'sisa_point', label: 'Sisa Point' },
  ]

  return isAllLoaded() ? (
    <Grid container spacing={3}>
      <Grid item xs={6}></Grid>
      <Grid container item justify='flex-end' xs={6}>
        <Box m={1}>
          <UpdateButton text='Update Membership' handleClick={handleOpenUpdate} />
          <Modal open={openUpdate} handleClose={handleCloseUpdate} ariaLabel='modal-update'>
            <MembershipFormUpdate handleModalClose={handleCloseUpdate} />
          </Modal>
        </Box>
        <Box m={1}>
          <AddButton text='Tambah Membership' handleClick={handleOpenAdd} />
          <Modal open={openAdd} handleClose={handleCloseAdd} ariaLabel='modal-add'>
            <MembershipFormAdd handleModalClose={handleCloseAdd} />
          </Modal>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {allMembership && allMember ? (
          <EnhancedTable
            inputSearch={searchField}
            onSearchFieldChange={handleSearchFieldChange}
            searchBasedOnId='nama_member'
            title='Membership'
            data={combineAllMembershipWithMember(allMembership, allMember)}
            arrayDataColumn={headData}
            placeholder='Search nama...'
          />
        ) : null}
      </Grid>
    </Grid>
  ) : (
    <CircularLoading />
  )
}
const mapStateToProps = (state: RootState) => ({
  isAllTipeMembershipLoaded: selectIsAllTipeMembershipLoaded(state),
  isAllMemberLoaded: selectIsAllMemberLoaded(state),
  isAllMembershipLoaded: selectIsAllMembershipLoaded(state),
  allMembership: selectAllMembership(state),
  allMember: selectAllMember(state),
})

const mapDispatchToProps = (dispatch) => ({
  loadAllTipeMembershipStartAsync: () => dispatch(loadAllTipeMembershipStartAsync()),
  loadAllMemberStartAsync: () => dispatch(loadAllMemberStartAsync()),
  loadAllMembershipStartAsync: () => dispatch(loadAllMembershipStartAsync()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Membership)
