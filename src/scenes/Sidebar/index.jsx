import React from 'react';
import chartFill from '../images/Chart_fill.png';
import chat from '../images/Chat.png';
import user from '../images/User.png';
import calendar from '../images/Calendar.png';
import search from '../images/Search.png';
import chart from '../images/Chart.png';
import folder from '../images/Folder.png';
import Products from '../images/Products.png';
import setting from '../images/Setting.png';
import HyperPoint from '../images/HyperPoint.png'
import styles from './style.module.scss';

import { Link } from "react-router-dom";

function Sidebar() {
  const imageSources = { 
    Chart_fill: chartFill,
    Chat: chat,
    User: user,
    Calendar: calendar,
    Search: search,
    Chart: chart,
    Folder: folder,
    Setting: setting,
    AddProducts : Products,
    Hyperpoint : HyperPoint,
  };

  const Menus = [
    { title: "Dashboard", src: "Chart_fill", to: "/" },
    { title: "Analytics", src: "Chart", to: "/analytics" },
    { title: "Mes Produits", src: "Folder", gap: true, to: "/Produits" },
    { title: "Gestion Produits", src: "Folder", to: "/AddProduits" },
    { title: "Hyper-Points", src: "Hyperpoint", to: "/AddHyperPointProduits" },
    { title: "Options", src: "Options", to: "/Options" },

    { title: "Inbox", src: "Chat", gap: true, to: "/inbox" },
    { title: "Accounts", src: "User", to: "/accounts" },
    { title: "Schedule", src: "Calendar", to: "/schedule" },
    { title: "Search", src: "Search", to: "/search" },
    { title: "Setting", src: "Setting", gap: true, to: "/setting" },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h1 className={styles.title}>Sidebar</h1>
      </div>
      <ul className={styles.menuList}>
        {Menus.map((Menu, index) => (
          <Link key={index} to={Menu.to}>
            <li className={`${styles.menuItem} ${Menu.gap ? styles.gap : ''} ${index === 0 ? styles.first : ''}`}>
              <img src={imageSources[Menu.src]} className={styles.imgIcon} alt={Menu.title} />
              <span className={styles.menuTitle}>{Menu.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
