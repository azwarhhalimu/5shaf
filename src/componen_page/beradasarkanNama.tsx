import Height from "@/Componen/Height";
import baseUrl from "@/config";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css';
import LoadingSpinner from "@/Componen/LoadingSpinner";

interface itPendukung {
    id_pendukung: string;
    nama: string;
    nik: string;
    jenis_kelamin: string;
    usia: string;
    rt_rw: string;
    kelurahan: string;
    relawan: {
        no: number;
        id_relawan: string;
        nama: string;
        no_handphone: string;
        alamat: string;
    };
    tps: number;
}
const Berdasarkan_nama: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<itPendukung[]>([]);
    const [search, setSearch] = useState("");
    const _cekData = () => {
        setLoading(true);
        axios.get(baseUrl('duplikat-data/semua-data'))
            .then((respon: AxiosResponse<any, any>) => {
                const data = respon.data;
                const sortedArray = data.sort((a: any, b: any) => {
                    const nameA = a.nama.toLowerCase();
                    const nameB = b.nama.toLowerCase();
                    return nameA.localeCompare(nameB);
                });
                setData(sortedArray);
                setLoading(false);
            });

    }
    useEffect(() => {
        // _cekData();
    }, [])
    return (<>
        <div style={{ textAlign: "center" }}>
            <div>Silahkan klik tombol di bawah ini untuk cari kesaman Nama dan Kelurahan</div>
            <Height height={20} />
            {!loading ? <button onClick={() => {
                _cekData();
            }} className=" btn btn-primary">Analisis Kesamaan Nama</button> : <><LoadingSpinner /> Loading data...</>
            }
            <Height height={20} />

            <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ paddingRight: "20px", marginRight: "20px" }}>Cari  :  </span><input style={{ width: "300px" }} type="search" onChange={(e) => {
                    setSearch(e.target.value);
                }} placeholder="Cari data..." className="form-control" />
            </div>

            <Height height={20} />
            <table className=" table table-bordered table-strip">
                <tr style={{ fontWeight: "bold" }}>
                    <td>No</td>
                    <td>Nama Lengkap</td>
                    <td>Nik</td>
                    <td>Usia</td>
                    <td>Jenis Kelamin</td>

                    <td>RT/RW</td>
                    <td>Relawan</td>
                    <td>Kelurahan</td>
                    <td>TPS</td>
                </tr>
                {data.map((list, index) => (
                    list.nama.toLowerCase().includes((search.toLocaleLowerCase())) ? <tr key={`df${index}`} {...(index % 2 == 0) ? { style: { background: "#F2FFE9" } } : { style: { background: "#F5EEC8" } }}>
                        <td>{index + 1}</td>
                        <td>{list['nama']}</td>
                        <td>{list['nik']}</td>
                        <td>{list['usia']}</td>
                        <td>{list['jenis_kelamin']}</td>

                        <td>{list['rt_rw']}</td>
                        <td>
                            <div style={{ fontWeight: "bold" }}>{list?.['relawan']?.["nama"]}</div>
                            <div style={{ fontSize: "12px" }}>{list?.['relawan']?.["alamat"]}</div>
                            <div style={{ fontSize: "12px" }}>{list?.['relawan']?.["no_handphone"]}</div>
                        </td>
                        <td>{list['kelurahan']}</td>
                        <td>{list['tps']}</td>
                    </tr> : <></>
                ))}
            </table>
        </div>
    </>);
}

export default Berdasarkan_nama;