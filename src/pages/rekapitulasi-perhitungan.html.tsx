import Height from "@/Componen/Height";
import baseUrl from "@/config";
import axios, { Axios, AxiosResponse } from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const Rekapitulas_perhitungan: React.FC = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [reload, setReload] = useState<number>(0);
    const [edata, setEdata] = useState<{
        id_partai: string;
        partai: string;
        caleg: {
            id_caleg: string,
            nama: string,
            suara: number,
        }[]
    }[]>([]);

    const [data, setData] = useState<{
        id_partai: string;
        partai: string;
        caleg: {
            id_caleg: string,
            nama: string,
            suara: number,
            total_suara: number
        }[]
    }[]>([]);

    const _getPartai = () => {
        axios.get(baseUrl('partai'))
            .then((respon: AxiosResponse<any, any>) => {
                setData(respon.data.data.list);
                setEdata(respon.data.data.list);

            })
    }

    const _updateSuara = (e: any) => {
        e.preventDefault();
        axios.post(baseUrl('partai/update-suara'),
            queryString.stringify({
                data: JSON.stringify(edata),
            })
        )
            .then((respon) => {
                if (respon.data.status == "ok") {
                    setReload(reload + 1);
                    handleClose();
                }
            });
        ;
    }

    const getKelurahan = () => {

    }

    useEffect(() => {
        _getPartai();
    }, [reload])
    return (<>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <h3>Perhitungan Suara </h3>
                    <div className="row">
                        {
                            data?.map((list, index) => (
                                <div style={{}} key={`${index}`} className="col-lg-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div style={{ fontWeight: "bold" }}>Partai {list.partai}</div>

                                            <table className="table">
                                                <tbody>
                                                    {list.caleg.map((x, i) => (
                                                        <tr key={`${i}`}>
                                                            <td width={"50px"}>{i + 1}</td>
                                                            <td>{x.nama}</td>
                                                            <td>{x.total_suara}</td>
                                                            <td>

                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>

                                            </table>

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>


                    <div className="row">


                    </div>
                </div>
            </div>
        </div>


    </>);
}

export default Rekapitulas_perhitungan;