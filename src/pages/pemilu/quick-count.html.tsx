import Height from "@/Componen/Height";
import baseUrl from "@/config";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

const Quick_count: React.FC = () => {
    const [total, setTotal] = useState(0);
    const [reload, setReload] = useState(0);
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
                setTotal(respon.data.data.total);
            })
    }
    useEffect(() => {
        _getPartai();
    }, [reload]);

    const interval = setInterval(() => {
        setReload(reload + 1);
    }, 30000);
    return (<>
        <div style={{ height: "99vh", }}>
            <div style={{ padding: "30px" }}>
                <Height height={20} />
                <div style={{ textAlign: "center" }}>
                    <div>Perhitungan Suara</div>
                    <div style={{ fontWeight: "bold", fontSize: "30px" }}>CALON DPRD KOTA BAUBAU</div>
                    <div style={{ fontWeight: "bold" }}>PARTAI PERSATUAN PEMBANGUNAN</div>
                    <div>TAHUN 2024</div>
                </div>
                <div>
                    <div style={{ fontWeight: "bold" }}>Grafik Pengolahan Suara</div>
                    <Height height={20} />
                    {

                        data.map((list, index) => {

                            return (
                                <div key={`${index}`} className="row">
                                    {

                                        list.caleg.map((a, b) => {

                                            return (
                                                <div key={`${index}-${b}`} className="col-lg-4">
                                                    <div style={{ border: "1px solid #DFDFDF", textAlign: "center" }}>

                                                        <div style={{ fontWeight: "bold", fontSize: "50px" }}>{a.total_suara}</div>
                                                        <Height height={20} />
                                                        <div style={{ fontWeight: "bold" }}>{a.nama}</div>

                                                        <div style={{ fontSize: "25px", fontWeight: "bold", opacity: ".4" }}> {((a.total_suara / total) * 100).toFixed(1)}%</div>
                                                        <Height height={10} />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            )
                        })}

                </div>

            </div>

        </div>

        <div style={{
            width: "100%", padding: "10px",
            fontSize: "30px",
            zIndex: "9999", position: "fixed", bottom: "0px",
            left: "0px", background: "#26A24F",
            textAlign: "center", fontWeight: "bold",
            color: "white"
        }}>Total Suara Masuk :{total}</div>

    </>);
}

export default Quick_count;