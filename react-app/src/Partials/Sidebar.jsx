import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {SiShopware} from 'react-icons/si';
import {MdOutlineCancel} from 'react-icons/md'


import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import { FiClipboard, FiShoppingBag, FiUser } from 'react-icons/fi';

const Sidebar = () => {


 


  return (
  
    <header>
     
      <nav
           id="sidebarMenu"
           class="collapse d-lg-block sidebar collapse bg-white"
           >
        <div class="position-sticky">
          <div class="list-group list-group-flush mx-3 mt-4">
            <a
               href="/dashboard"
               class="list-group-item list-group-item-action py-2 ripple"
               aria-current="true"
               >
              <i class="fas fa-tachometer-alt fa-fw me-3"></i
                ><span>Main dashboard</span>
            </a>
           
            <a
               href="/dashboard"
               class="list-group-item list-group-item-action py-2 ripple"
               ><i class="fab fa-product-hunt"></i>
                <span>Products</span></a>
             
            <a
               href="/users"
               class="list-group-item list-group-item-action py-2 ripple"
               ><i class="fas fa-users fa-fw me-3"></i><span>Users</span></a
              >
            <a
               href="/allOrders"
               class="list-group-item list-group-item-action py-2 ripple"
               ><i class="fa fa-clipboard" aria-hidden="true"></i>
               <span>Orders</span></a
              >
          </div>
        </div>
      </nav>
  
    
    </header>
    
  
  )
}

export default Sidebar;