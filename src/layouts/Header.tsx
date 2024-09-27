import { useMyContext } from "@/interface/myContext";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const Header: React.FC = () => {
    const route: NextRouter = useRouter();
    const { menu } = useMyContext();
    return (<>
        <ul className="navbar-nav sidebar sidebar-light accordion" id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div className="sidebar-brand-icon">
                    <img src="/aa.jpeg" />
                </div>
                <div className="sidebar-brand-text mx-3">5SHAF</div>
            </Link>

            <li className="nav-item">
                <Link {...menu == "beranda" && { style: { color: "red", } }} className="nav-link" href="/">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Dashboard <span style={{ fontSize: "8px" }} className="badge badge-danger">Dev</span></span>
                </Link>
            </li>
            <li className="nav-item">
                <Link {...menu == "statistik" && { style: { color: "red", } }} className="nav-link" href="/data-statistik.html">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Data Statistik</span>
                </Link>

            </li>
            <li className="nav-item">
                <Link {...menu == "report" && { style: { color: "red", } }} className="nav-link" href="/data-report.html">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Data Report <span style={{ fontSize: "8px" }} className="badge badge-danger">Dev</span></span>
                </Link>
            </li>


            <hr className="sidebar-divider" />
            <div className="sidebar-heading">
                Menu
            </div>
            <li className="nav-item">
                <Link {...menu == "pendukung" && { style: { color: "red", } }} className="nav-link" href="/data-calon-pendukung.html">
                    <i className="fas fa-fw fa-palette" />
                    <span>Data Calon Pendukung</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link {...menu == "tps" && { style: { color: "red", } }} className="nav-link" href="/data-tps.html">
                    <i className="fas fa-fw fa-palette" />
                    <span>Master Data TPS</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link  {...menu == "relawan" && { style: { color: "red", } }} className="nav-link" href="/data-relawan.html">
                    <i className="fas fa-fw fa-palette" />
                    <span>Master Relawan</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link {...menu == "saksi" && { style: { color: "red", } }} className="nav-link" href="/saksi-tps.html">
                    <i className="fas fa-fw fa-palette" />
                    <span>Saksi TPS</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link {...menu == "saksi" && { style: { color: "red", } }} className="nav-link" href="/partai.html">
                    <i className="fas fa-fw fa-palette" />
                    <span>Partai</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link {...menu == "saksi" && { style: { color: "red", } }} className="nav-link" href="/rekapitulasi-perhitungan.html">
                    <i className="fas fa-fw fa-palette" />
                    <span>Rekapitulasi Perhitungan</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" href="/pemilu/quick-count.html">
                    <i className="fas fa-fw fa-palette" />
                    <span>Layar Menitor</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link {...menu == "duplikat-data" && { style: { color: "red", } }} className="nav-link" href="/duplikat-data.html">
                    <i className="fas fa-fw fa-palette" />
                    <span>Analisi Duplikat Data</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" onClick={() => {

                    const x = window.confirm("Apakah anda ingin ingin logout dari applikasi ini?");
                    if (x) {
                        window.localStorage.removeItem("data_login");
                        route.push("/login.html");
                    }
                }} href="#">
                    <i className="fas fa-fw fa-palette" />
                    <span>Logout</span>
                </Link>
            </li>
            <hr className="sidebar-divider" />
            <div className="version" id="version-ruangadmin" />
        </ul >

    </>);
}

export default Header;