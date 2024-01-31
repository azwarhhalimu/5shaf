import Berdasarkan_nama from "@/componen_page/beradasarkanNama";
import { useMyContext } from "@/interface/myContext";
import React, { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";

const Duplikat_data: React.FC = () => {
    const { updateMenu } = useMyContext();
    useEffect(() => {
        updateMenu('duplikat-data');
    }, [])
    return (<>

        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Pencarian Duplikat Data</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Duplikat Data</li>
                </ol>
            </div>

            <div className="card">
                <div className="card-body">
                    <Tabs
                        defaultActiveKey="home"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="Berdasarkan Kesamaan Nama dan Kelurahan">
                            <Berdasarkan_nama />
                        </Tab>


                    </Tabs>
                </div>
            </div>

        </div>
    </>);
}

export default Duplikat_data;