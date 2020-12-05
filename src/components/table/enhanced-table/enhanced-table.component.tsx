import React from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'

import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

import Paper from '@material-ui/core/Paper'
import EnhancedTableToolbar from '../enchanced-table-toolbar/enchanced-table-toolbar.component'
import EnhancedTableHead from '../enchanced-table-head/enchanced-table-head.component'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): ((a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const stableSort = <T extends unknown>(array: T[], comparator: (a: T, b: T) => number) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(0, 2),
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
    },
    table: {
      minWidth: 750,
    },
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

type Data = {
  id?: string
  [other: string]: any
}
type Props = {
  data: Array<Data>
  arrayDataColumn: string[]
  title: string
}

const EnhancedTable: React.FC<Props> = ({ data, arrayDataColumn, title }) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

  return data ? (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar title={title} />
        <TableContainer>
          <Table className={classes.table} aria-labelledby='tableTitle' aria-label='enhanced table'>
            <EnhancedTableHead
              arrayDataColumn={arrayDataColumn}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const id = Object.values(row)[0]
                  return (
                    <TableRow key={id}>
                      {Object.entries(row).map(([key, value]) => {
                        return <TableCell key={`${id}-${key}`}>{value}</TableCell>
                      })}
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length }]}
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  ) : null
}

export default EnhancedTable
