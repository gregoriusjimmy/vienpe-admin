import React, { useEffect, useState } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { TableHead, TableRow, TableCell, TableSortLabel } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
)

type HeadCell = {
  id: string
  label: string
}

type Props = {
  arrayDataColumn: Array<HeadCell>
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  order: 'asc' | 'desc'
  orderBy: string | number
  rowCount: number
  action?: boolean
}

export const EnhancedTableHead: React.FC<Props> = ({
  order,
  orderBy,
  action,
  onRequestSort,
  arrayDataColumn,
}) => {
  const classes = useStyles()
  const [headCells, setHeadCells] = useState<HeadCell[]>([])

  useEffect(() => {
    if (action) setHeadCells([...arrayDataColumn, { id: 'action', label: 'Action' }])
    else setHeadCells(arrayDataColumn)
  }, [action, arrayDataColumn])

  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
