import Height from "@/Componen/Height";
import baseUrl from "@/config";
import axios, { Axios, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
interface cData {
    id_kelurahan: string;
    kelurahan: string;
    tps: {
        id_tps: string;
        tps: string;
        total_saksi: number;
        isData: string;
        checklist: string;
    }[];
}
const Saksi: React.FC = () => {
    const [totalTps, setTotalTps] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const route = useRouter();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState<cData[]>([]);
    const _getData = () => {
        setIsLoading(true);
        axios.get(baseUrl('saksi/kelurahan-tps'))
            .then((respon: AxiosResponse<any, any>) => {
                setData(respon.data.data);
                setIsLoading(false);
            })
    }
    useEffect(() => {
        _getData();
    }, [])
    return (<>


        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Blank Page</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                    <li className="breadcrumb-item">Pages</li>
                    <li className="breadcrumb-item active" aria-current="page">Blank Page</li>
                </ol>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            {totalTps}
                            <table className="table">
                                <thead>
                                    <tr style={{ fontWeight: "bold" }}>
                                        <td width={"20px"}>No</td><td>Kelurahan</td>
                                        <td>TPS</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        data.map((list, index) => {
                                            return (
                                                <tr key={`${index}`}>
                                                    <td>{index + 1}</td><td>{list.kelurahan}</td>
                                                    <td>
                                                        {list.tps.map((data, index) => {

                                                            return (
                                                                <button key={`${index}`} className={`btn ${data.isData != "ADA" ? "btn-danger" : "btn-success"}`}
                                                                    onClick={() => {
                                                                        route.push(`/saksi/${list.id_kelurahan}/${data.id_tps}/tps.html`)
                                                                    }}
                                                                    style={{ margin: "5px" }}>
                                                                    TPS {data.tps} {data.checklist == "Y" && (<i style={{ color: "#FF0008" }} className="fa fa-check" />)}
                                                                </button>
                                                            )
                                                        })}
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                </tbody>
                            </table>
                            {isLoading && (<center>
                                <Height height={40} />
                                Mengambil data....
                            </center>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
}

export default Saksi;