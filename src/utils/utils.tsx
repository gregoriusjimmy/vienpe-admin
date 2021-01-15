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
  allKelas: Array<KelasType> | null,
  allInstruktur: Array<InstrukturType> | null
) => {
  if (!allKelas || !allInstruktur) return null
  return allKelas!.map(
    (kelas): KelasWithInstrukturType => {
      const { id_instruktur } = kelas
      const findMatch = allInstruktur.find((instruktur) => {
        return id_instruktur === instruktur.id
      })

      const { id, nama } = findMatch!
      return { ...kelas, id_instruktur: id, nama_instruktur: nama }
    }
  )
}

export const combineAllMembershipWithTipeMembership = (
  allMembership: Array<MembershipType> | null,
  allTipeMembership: Array<TipeMembershipType> | null
) => {
  if (!allTipeMembership || !allMembership) return null
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
  allMembership: Array<MembershipType> | null,
  allMember: Array<MemberType> | null
) => {
  if (!allMembership || !allMember) return null

  return allMembership!.map(
    (membership): MembershipWithMemberType => {
      const { id_member } = membership
      const findMatch = allMember.find((member) => id_member === member.id)

      const { nama, id } = findMatch!
      return { ...membership, nama_member: nama, id_member: id }
    }
  )
}
