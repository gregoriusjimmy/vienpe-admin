import React from 'react'
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

interface HeadCell {
  id: string
  label: string
}

type Props = {
  arrayDataColumn: string[]
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  order: 'asc' | 'desc'
  orderBy: string | number
  rowCount: number
}

export const EnhancedTableHead: React.FC<Props> = ({
  order,
  orderBy,
  onRequestSort,
  arrayDataColumn,
}) => {
  const classes = useStyles()
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }
  const generateHeadCells = () => {
    const headCellsArray: Array<HeadCell> = []

    for (const column of arrayDataColumn) {
      headCellsArray.push({ id: column, label: column })
    }
    return headCellsArray
  }
  return (
    <TableHead>
      <TableRow>
        {generateHeadCells().map((headCell) => (
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
