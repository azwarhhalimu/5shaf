import DataKosong from "@/Componen/DataKosong";
import LoadingSpinner from "@/Componen/LoadingSpinner";
import baseUrl from "@/config";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { query } = context;

    return {
        props: {
            url_data: query,
        },
    };
}

interface inData {
    nama: string, nik: string, jenis_kelamin: string,
    usia: string, rt_rw: string, kelurahan: string,
    tps: string
}


interface inProps {
    url_data: any
}
const Lihat_pendukung_relawan: React.FC<inProps> = (props) => {
    const navigation = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [dataKosong, setDataKosong] = useState<boolean>(false);
    const [data, setData] = useState<inData[]>();
    const [relawan, setRelawan] = useState<inData>();
    const get_data = () => {
        setLoading(true)
        axios.get(baseUrl("lihat-pendukung-relawan/" + props.url_data.id_relawan))
            .then((respon: AxiosResponse<any, any>) => {

                if (respon.data.data.length == 0) {
                    setDataKosong(true);
                }
                setData(respon.data.data);
                setRelawan(respon.data.relawan);
                setLoading(false);
            });
    }
    useEffect(() => {
        // console.log(props.url_data);
        get_data();
    }, []);
    return (

        <>
            <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <button onClick={() => { navigation.back() }} className="btn btn-danger"><i className="fa fa-chevron-left" />Kembali</button>
                    <h1 className="h3 mb-0 text-gray-800">Data Pendukung</h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link href="/data-relawan.html">Data Pendukung</Link></li>

                        <li className="breadcrumb-item active" aria-current="page">Lihat data pendukung</li>
                    </ol>
                </div>
                <div className="card">
                    <div className="card-body">
                        <span className="badge badge-primary" style={{ fontSize: "15px" }}>Jumlah Data :{data?.length} </span>
                        {" "}
                        <span className="badge badge-success" style={{ fontSize: "15px" }}>Relawan :{relawan?.nama} </span>
                        <div style={{ height: "20px" }}></div>
                        <span>
                            <input placeholder="Cari Data..." style={{ width: "300px" }} type="search" className="form-control" />
                        </span>
                        <br />
                        <table className="table">
                            <thead>
                                <tr style={{ fontWeight: "bold", color: "blue" }}>
                                    <td>No</td>
                                    <td>Nama</td>
                                    <td>NIK</td>
                                    <td>Jenis Kelamin</td>
                                    <td>Kelurahan</td>
                                    <td>RT/RW</td>
                                    <td>TPS</td>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((list, index) => (
                                    <tr key={`adf${index}`}>
                                        <td>{index + 1}</td>
                                        <td>{list.nama}</td>
                                        <td>{list.nik}</td>
                                        <td>{list.jenis_kelamin}</td>
                                        <td>{list.kelurahan}</td>
                                        <td>{list.rt_rw}</td>
                                        <td>{list.tps}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {loading &&
                            <center>
                                <LoadingSpinner />
                                <div>Mengambil data...</div>
                            </center>
                        }
                        {dataKosong && <DataKosong />}
                    </div>
                </div>
            </div >

        </>);
}

export default Lihat_pendukung_relawan;