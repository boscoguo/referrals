import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddCircle from '@material-ui/icons/AddCircle'
import React, { useRef, useState } from 'react';
import { ReactComponent as CreateIcon } from '../../../assets/create-24px.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete-24px.svg';
import { Referral } from '../../types/referral';
import { IconButton } from '../IconButton';
import { DeleteAlert } from '../DeleteAlert';
import { UpdateModal } from '../UpdateModal';
import httpMethod from '../../utils/httpUtils';
import style from './ReferralTable.module.css';

const TableHeadCell: React.FC = ({ children }) => (
  <TableCell classes={{ root: style.tableHeadCell }}>{children}</TableCell>
);

const TableBodyCell: React.FC = ({ children }) => (
  <TableCell classes={{ root: style.tableBodyCell }}>{children}</TableCell>
);

interface ActionBodyCellProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const ActionBodyCell: React.FC<ActionBodyCellProps> = ({
  onEditClick,
  onDeleteClick,
}) => (
  <TableCell classes={{ root: style.actionBodyCell }}>
    <span data-testid="edit-btn">
      <IconButton onClick={onEditClick} >
        <CreateIcon />
      </IconButton>
    </span>
    <span data-testid="delete-btn">
      <IconButton onClick={onDeleteClick} >
        <DeleteIcon />
      </IconButton>
    </span>
  </TableCell>
);

interface ReferralTableProps {
  referrals: Referral[];
  setReferrals: Function;
}

const ReferralTable: React.FC<ReferralTableProps> = ({ referrals, setReferrals }) => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(1);
  const [updateId, setUpdateId] = useState(0);
  const [updateResult, setUpdateResult] = useState({});

  const handleCreateClick = () => {
    if (updateId !== 0) {
      setUpdateId(0);
    }
    setModalOpen(true);
    setUpdateResult({});
  }

  const handleEditClick = async (id) => {
    const result = await httpMethod.getById(id);
    setUpdateResult(result);
    setModalOpen(true);
    setUpdateId(id);
  }

  const handleDeleteClick = (id) => {
    setOpen(true);
    setDeleteId(id);
  }
  
  const tableHeadArr = ["Given Name", "Surname", "Email", "Phone", "Address Line", "Suburb", "State", "Post Code", "Country", "Actions"];
  return (
    <>
      <TableContainer classes={{ root: style.container }}>
        <Table>
          <TableHead>
            <TableRow>
              {
                tableHeadArr.map((elem, index) => (
                  <TableHeadCell key={index}>{elem}</TableHeadCell>
                ))
              }
              <TableHeadCell>
                <span data-testid="add-btn">
                  <IconButton onClick={handleCreateClick} >
                    <AddCircle />
                  </IconButton>
                </span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {referrals.map((referral) => {
              const { id, givenName, surName, email, phone, addressLine, suburb, state, postCode, country } = referral;
              const tableBodyArr = [givenName, surName, email, phone, addressLine, suburb, state, postCode, country];
              return (
                <TableRow key={id}>
                  {
                    tableBodyArr.map((elem, index) => <TableBodyCell key={index}>{elem}</TableBodyCell>)
                  }
                  <ActionBodyCell
                    onEditClick={() => handleEditClick(id)}
                    onDeleteClick={() => handleDeleteClick(id)}
                  />
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteAlert
        open={open}
        setOpen={setOpen}
        deleteId={deleteId}
        setReferrals={setReferrals}
      />
      <UpdateModal
        open={modalOpen}
        setOpen={setModalOpen}
        updateId={updateId}
        updateResult={updateResult}
        setReferrals={setReferrals}
      />
    </>
  );
};

export { ReferralTable };
