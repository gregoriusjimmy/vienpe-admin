import { InstrukturType } from '../redux/instruktur/instruktur.types'
import { KelasType, KelasWithInstrukturType } from '../redux/kelas/kelas.types'
import { MemberType } from '../redux/member/member.types'
import {
  MembershipType,
  MembershipWithMemberType,
  MembershipWithTipeMembershipType,
} from '../redux/membership/membership.types'
import { TipeMembershipType } from '../redux/tipe-membership/tipe-membership.types'

export const combineAllKelasWithInstruktur = (
  allKelas: Array<KelasType>,
  allInstruktur: Array<InstrukturType>
) => {
  return allKelas!.map(
    (kelas): KelasWithInstrukturType => {
      const { id_instruktur } = kelas
      const findMatch = allInstruktur.find((instruktur) => id_instruktur === instruktur.id)

      const { id, nama } = findMatch!
      return { ...kelas, id_instruktur: id, nama_instruktur: nama }
    }
  )
}

export const combineAllMembershipWithTipeMembership = (
  allMembership: Array<MembershipType>,
  allTipeMembership: Array<TipeMembershipType>
) => {
  return allMembership!.map(
    (membership): MembershipWithTipeMembershipType => {
      const { tipe_membership } = membership
      const findMatch = allTipeMembership.find(
        (tipeMembership) => tipe_membership === tipeMembership.tipe
      )
      const { keterangan } = findMatch!
      return { ...membership, keterangan: keterangan }
    }
  )
}

export const combineAllMembershipWithMember = (
  allMembership: Array<MembershipType>,
  allMember: Array<MemberType>
) => {
  return allMembership!.map(
    (membership): MembershipWithMemberType => {
      const { id_member } = membership
      const findMatch = allMember.find((member) => id_member === member.id)
      const { nama, id } = findMatch!
      return { ...membership, nama_member: nama, id_member: id }
    }
  )
}
