import React, { useEffect } from "react";
import { GetAllProducts } from "../Redux/data/action";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,Box } from "@mui/material";
import Sidebar from '../Partials/Sidebar';
import Header from '../Partials/Header';
import { useState } from "react";
import placeholderImage from '../assets/placeholder.png'
import Navbar from "../Partials/Navbar";
import Modal from "../Partials/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faAdd } from "@fortawesome/free-solid-svg-icons";

const Dashboard = ()  => {

  const dispatch = useDispatch();
 
    const {allProducts} = useSelector((store)=>store.data);

    const [openModals, setOpenModals] = useState({});

    const columns = [
        {id:'productId',name:"Id"},
        {id:'name',name:"Product Name"},
        {id:'price',name:'Price'},
        {id:"discount",name:"Discount"},
{id:'oldPrice',name:"Old Price"},
{id:'picturePath',name:"Picture"}
    
    ]

    
    const getProductImage = (productName) => {
        try {
            return require(`../${productName}`);
        } catch (err) {
            return placeholderImage;
        }

    };


    const handlechangepage = (event, newpage) => {
        pagechange(newpage)
    }
    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value)
        pagechange(0);
    }

   
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    
    useEffect(()=> {dispatch(GetAllProducts())},[dispatch]);
 
    return (
        <>
     <Navbar/>
     <Sidebar/>
        <main style={{marginTop: "58px",}}>
  <div id="dashboardContainer" class="container pt-4">
  <a href="/createProduct" style={{ cursor: "pointer",width:"fit-content",fontSize:"1.5rem" }}>
    Create New Product
                <FontAwesomeIcon icon={faAdd} size='xl' style={{marginLeft:"7px"}}/>
                </a>
            <h1>Products table</h1>

           
                <TableContainer id="tableContainer" sx={{width:1000,}}>
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
                            {allProducts && allProducts
                                .slice(page * rowperpage, page * rowperpage + rowperpage)
                                .map((row, i) => {
                                    const modalKey = row[columns[0].id];
                                    return (
                                        <TableRow key={i}>
                                           
                                            {columns && columns.map((column, i) => {
                                                let value = row[column.id];
                                                let idValue = columns[0]['id'];
                                                if (column.id == 'picturePath'){
                                                    return (
                                                        <Box
                                                    component="img"
                                                    sx={{
                                                        height: 70,
                                                        width: 70,
                                                        marginTop:1.5,
                                                        marginLeft:1.5
                                                    
                                                    }}
                                                    alt="The house from the offer."
                                                    src={`https://storage.googleapis.com/azondesigns/hoodies/${value}`}
                                                    />
                                                    )
                                                }
                                                return (
                                                    <>
                                                    <TableCell key={i}>
                                                        {value}
                                                    </TableCell>
                                                
                                                    </>

                                                )
                                                
                                                
                                            })}
                                             <TableCell>
                                             <a href={`editProduct/${row[columns[0].id]}`}>
                                                <i className="fas fa-edit" size="3xl"></i>
                                                </a>
                                                <a
                                                     style={{ marginLeft: "10px", marginTop: "15px", cursor: "pointer" }}
                                                    onClick={() => {
                                                        setOpenModals((prev) => ({ ...prev, [modalKey]: true }));
                                                    }}
                                                >
                                                   <FontAwesomeIcon icon={faTrash} size='xl' />

                                                </a>
                                                {openModals[modalKey] && <Modal setOpenModal={(value) => setOpenModals((prev) => ({ ...prev, [modalKey]: value }))} modalCase={"deleteProduct"} id={row[columns[0].id]} />} 
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
                    count={allProducts.length}
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
export default Dashboard;