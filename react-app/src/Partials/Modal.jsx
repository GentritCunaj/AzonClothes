import React from "react";
import { useState,useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import "../Pages/CSS/modal.css";
import { CancelOrdersById,DeleteProduct } from "../Redux/data/action";
import { ChangeRole, DeleteUser } from "../Redux/auth/action";
function Modal({ modalCase,setOpenModal,id}) {

    const dispatch = useDispatch();

  return (
 
      <div className="modalContainer">
      
        <div className="title">
          <h5>Are You Sure You Want to Continue?</h5>
        </div>
       
        <div className="footer">
          <button
          class="button"
            onClick={() => {
              setOpenModal(false);
              
            }}
            id="cancelBtn"
          >
            Close
          </button>
          {modalCase === 'cancelOrder' && (
            <button onClick={() => dispatch(CancelOrdersById({ id: id }))} className="button">
              Delete
            </button>
          )}
            {modalCase === 'deleteProduct' && (
            <button onClick={() => dispatch(DeleteProduct(id))} className="button">
              Delete
            </button>
          )}
            {modalCase === 'deleteUser' && (
            <button onClick={() => dispatch(DeleteUser({email:id}))} className="button">
              Delete
            </button>
          )}
          {modalCase === 'changeRole' && (
            <button onClick={() => dispatch(ChangeRole({email:id}))} className="button">
              Change 
            </button>
          )}

        </div>
      </div>
      
  );
}

export default Modal;