import baseUrl from "@/config";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";


const Partai: React.FC = () => {
    const route = useRouter();
    const [show, setShow] = useState(false);
    const [data, setData] = useState<{
        id_partai: string;
        partai: string;
        caleg: {
            id_caleg: string,
            nama: string,
        }[]
    }[]>([]);
    const [reload, setReload] = useState(0);
    const [partai, setPartai] = useState<string>('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const _getPartai = () => {
        axios.get(baseUrl('partai'))
            .then((respon: AxiosResponse<any, any>) => {
                setData(respon.data.data);
            })
    }
    const _simpanPartai = (e: any) => {
        e.preventDefault();
        axios.post(baseUrl('partai'),
            queryString.stringify({
                partai: partai,
            })
        )
            .then((respon: AxiosResponse<any, any>) => {
                if (respon.data.status == "data_saved") {
                    alert('Data tersimpan');
                    setReload(reload + 1);
                    handleClose();
                }
            })
    }
    useEffect(() => {
        _getPartai();
    }, [reload])
    return (<>
        <div className="row">
            <div className="container">
                <div className="col-lg-12">
                    <h3>Data Partai</h3>
                    <button className="btn btn-primary" onClick={() => {
                        handleShow();
                    }}>Tambah Partai</button>
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr style={{ fontWeight: "bold" }}>
                                        <td>No</td>
                                        <td>Partai</td>
                                        <td>Caleg</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((list, index) => (
                                        <tr key={`${index}`}>
                                            <td>{index + 1}</td>
                                            <td>{list.partai}</td>
                                            <td>{
                                                list.caleg.map((clist, i) => (
                                                    <div key={`${clist.id_caleg}`}>{i + 1} {clist.nama}</div>
                                                ))
                                            }</td>
                                            <td><button onClick={() => {
                                                route.push('/partai/' + list.id_partai + "/tambah-partai.html");
                                            }}>Tambah Caleg</button></td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Partai</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={_simpanPartai}>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Nama Partai</td><td>
                                    <input type='text'
                                        required
                                        onChange={(e) => {
                                            setPartai(e.target.value);
                                        }}
                                        className="form-control" placeholder="Masukkan nama partai" />
                                </td>
                            </tr>
                        </tbody>

                    </table>
                    <button className="btn btn-primary">Simpan</button>
                </form>
            </Modal.Body>

        </Modal>
    </>);
}

export default Partai;

