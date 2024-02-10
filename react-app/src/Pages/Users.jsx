import React, { useEffect } from "react";
import { GetAllProducts } from "../Redux/data/action";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,Box } from "@mui/material";
import Sidebar from '../Partials/Sidebar';
import Header from '../Partials/Header';
import { useState } from "react";
import placeholderImage from '../assets/placeholder.png'

import Modal from "../Partials/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faAdd,faUser,faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { GetAllUsers } from "../Redux/auth/action";
import Navbar from "../Partials/Navbar";

const Users = ()  => {

  const dispatch = useDispatch();

    const {users} = useSelector((store)=>store.auth);

    const [openDeleteModals, setOpenDeleteModals] = useState({});
    const [openChangeModals, setOpenChangeModals] = useState({});
    const columns = [
        {id:'id',name:'id'},
        {id:'firstName',name:"First Name"},
        {id:'lastName',name:'Last Name'},
        {id:"email",name:"Email"},
{id:'userName',name:"UserName"},
{id:'country',name:"Country"},
{id:'role',name:"Role"}
    
    ]

    


    const handlechangepage = (event, newpage) => {
        pagechange(newpage)
    }
    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value)
        pagechange(0);
    }

   
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    
    useEffect(()=> {dispatch(GetAllUsers())},[dispatch]);

    return (
        <>
     <Navbar/>
     <Sidebar/>
        <main style={{marginTop: "58px"}}>
  <div id="dashboardContainer" class="container pt-4">
 
            <h1>Users table</h1>

           
                <TableContainer id="tableContainer" sx={{width:1000,}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column,index) => (
                                    <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                                ))}
                                <TableCell  style={{ backgroundColor: 'black', color: 'white' }}>Delete/SetRole/Info</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users
                                .slice(page * rowperpage, page * rowperpage + rowperpage)
                                .map((row, i) => {
                                    const modalKey = row[columns[0].id];
                                    const deleteModalKey = `delete_${modalKey}`;
                                    const changeModalKey = `change_${modalKey}`;
                                    return (
                                        <TableRow key={i}>
                                           
                                            {columns && columns.map((column, i) => {
                                                let value = row[column.id];
                                                let idValue = columns[0]['id'];
                                              
                                                return (
                                                    <>
                                                    <TableCell key={i}>
                                                        {value}
                                                    </TableCell>
                                                
                                                    </>

                                                )
                                                
                                                
                                            })}
                                               <TableCell>
                                                    <a
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => {
                                                        setOpenDeleteModals((prev) => ({
                                                        ...prev,
                                                        [deleteModalKey]: true,
                                                        }));
                                                    }}
                                                    >
                                                    <FontAwesomeIcon icon={faTrash} size="xl" />
                                                    </a>
                                                    {openDeleteModals[deleteModalKey] && (
                                                    <Modal
                                                        setOpenModal={(value) =>
                                                        setOpenDeleteModals((prev) => ({
                                                            ...prev,
                                                            [deleteModalKey]: value,
                                                        }))
                                                        }
                                                        modalCase={"deleteUser"}
                                                        id={row[columns[3].id]}
                                                    />
                                                    )}

                                                    <a
                                                    style={{
                                                        marginLeft: "10px",
                                                        marginTop: "15px",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                        setOpenChangeModals((prev) => ({
                                                        ...prev,
                                                        [changeModalKey]: true,
                                                        }));
                                                    }}
                                                    >
                                                    <FontAwesomeIcon icon={faUser} size="xl" />
                                                    </a>
                                                    {openChangeModals[changeModalKey] && (
                                                    <Modal
                                                        setOpenModal={(value) =>
                                                        setOpenChangeModals((prev) => ({
                                                            ...prev,
                                                            [changeModalKey]: value,
                                                        }))
                                                        }
                                                        modalCase={"changeRole"}
                                                        id={row[columns[3].id]}
                                                    />
                                                    )}
                                                      <a  style={{
                                                        marginLeft: "10px",
                                                        marginTop: "15px",
                                                        cursor: "pointer",
                                                    }} href={`userInfo/${row[columns[0].id]}`}>
                                                      <FontAwesomeIcon icon={faCircleInfo} size="xl" />
                                                        </a>
                                                </TableCell>
                                            
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    rowsPerPage={rowperpage}
                    page={page}
                    count={users && users.length}
                    component="div"
                    onPageChange={handlechangepage}
                    onRowsPerPageChange={handleRowsPerPage}

                >

                </TablePagination>
           
        </div>
        </main>
       
        </>
    )
}
export default Users;