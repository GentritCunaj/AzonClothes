import React, { useEffect } from "react";
import { GetAllOrders, GetAllProducts } from "../Redux/data/action";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,Box } from "@mui/material";
import Sidebar from '../Partials/Sidebar';
import Header from '../Partials/Header';
import { useState } from "react";
import placeholderImage from '../assets/placeholder.png'

import Modal from "../Partials/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faAdd,faInfo,faEdit } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Partials/Navbar";

const AllOrders = ()  => {

  const dispatch = useDispatch();
 
    const {allOrders} = useSelector((store)=>store.data);

    const [openModals, setOpenModals] = useState({});

    const columns = [
        {id:'orderId',name:"Id"},
        {id:'customer.email',name:"Customer Email"},
        {id:'createdDate',name:"Date Ordered"},
        {id:'shippedDAte',name:'Shipped Date'},
        {id:"deliveredDate",name:"Delivered Date"},
        {id:"orderStatusName",name:"Order Status"}
    
    ]

    const getStatusClass = (status) => {
        switch (status) {
          case 'Pending':
            return 'secondary';
          case 'Processing':
            return 'primary';
          case 'Cancelled':
            return 'danger';
          case 'Delivered':
            return 'success';
          case 'Shipped':
            return 'info';
          default:
            return ''; // Return an empty string for unknown status
        }
    }



    const handlechangepage = (event, newpage) => {
        pagechange(newpage)
    }
    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value)
        pagechange(0);
    }

   
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    
    useEffect(()=> {dispatch(GetAllOrders()).then(res => console.log(res,"okay"))},[dispatch]);
    useEffect(() => {
        console.log("Updated allProducts:", allOrders);
      }, [allOrders]);
    return (
        <>
     <Navbar/>
     <Sidebar/>
        <main style={{marginTop: "58px"}}>
  <div class="container pt-4">
 
   
            <h1>Orders table</h1>

           
                <TableContainer sx={{width:1000,}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                                ))}
                                <TableCell  style={{ backgroundColor: 'black', color: 'white' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allOrders && allOrders
                                .slice(page * rowperpage, page * rowperpage + rowperpage)
                                .map((row, i) => {
                                    const modalKey = row[columns[0].id];
                                    return (
                                        <TableRow key={i}>
                                           
                                            {columns && columns.map((column, i) => {
                                                let value = row[column.id];
                                                if (column.id === 'customer.email') {
                                                    // Access the nested property
                                                    value = row.customer ? row.customer.email : '';
                                                } else {
                                                    // Access other properties directly
                                                    value = row[column.id];
                                                }
                                                if (column.id === 'shippedDAte' && !value) {
                                                    return (
                                                        <TableCell key={i}>
                                                            Not shipped yet
                                                        </TableCell>
                                                    );
                                                }
                                            
                                                if (column.id === 'deliveredDate' && !value) {
                                                    return (
                                                        <TableCell key={i}>
                                                            Not delivered yet
                                                        </TableCell>
                                                    );
                                                }
                                            

                                                if (column.id == 'orderStatusName'){
                                                    return (

                                                <label style={{marginTop:"10px"}} className={`badge bg-${getStatusClass(row[columns[5]['id']])}`}>{row[columns[5]['id']]}</label>)}


                                                return (
                                                    <>
                                                    <TableCell key={i}>
                                                        {value}
                                                    </TableCell>
                                                
                                                    </>

                                                )
                                                
                                                
                                            })}
                                             <TableCell>
                                             <a href={`/orderDetails/${row[columns[0].id]}`}>
                                             <FontAwesomeIcon icon={faInfo} size='xl' />
                                                </a>
                                                <a
                                                     style={{ marginLeft: "10px", marginTop: "15px", cursor: "pointer" }}
                                                    onClick={() => {
                                                        setOpenModals((prev) => ({ ...prev, [modalKey]: true }));
                                                    }}
                                                >
                                                   <FontAwesomeIcon icon={faTrash} size='xl' />

                                                </a>
                                                {openModals[modalKey] && <Modal setOpenModal={(value) => setOpenModals((prev) => ({ ...prev, [modalKey]: value }))} modalCase={"cancelOrder"} id={row[columns[0].id]} />} 

                                               <a style={{cursor:"pointer"}} href={`/updateOrder/${row[columns[0].id]}`}> <FontAwesomeIcon icon={faEdit} size="xl" /></a>
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
                    count={allOrders && allOrders.length}
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
export default AllOrders;