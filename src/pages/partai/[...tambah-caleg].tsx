import baseUrl from "@/config";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import queryString from "query-string";
import React, { useEffect, useState } from "react";

const TambaCaleg: React.FC = () => {
    const route = useRouter();
    const [caleg, setCaleg] = useState<string>('');
    const id: string = typeof window !== "undefined" ? window.location.pathname.split('/')[2] : "";
    useEffect(() => {

    }, [])
    const _simpanCaleg = (e: any) => {
        e.preventDefault();
        axios.post(baseUrl('partai/caleg'),
            queryString.stringify({
                nama: caleg,
                id_partai: id,

            })
        )
            .then((respon: AxiosResponse<any, any>) => {
                if (respon.data.status == "data_saved") {
                    alert('Data caleg berhasil ditambahkan');
                    route.back();
                }
            });
    }
    return (<>
        <div className="container">
            <div className="row">
                <div className="col-lg-5">
                    <div className="card">
                        <div className="card-body">
                            <h4>Tambah Data Partai</h4>
                            <form onSubmit={_simpanCaleg}>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                Nama Caleg
                                            </td>
                                            <td>
                                                <input
                                                    onChange={(e) => {
                                                        setCaleg(e.target.value);
                                                    }}
                                                    required placeholder="Masukkan nama partai..." type="text" className="form-control" />
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                                <button className="btn btn-success">Simpan</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>);
}

export default TambaCaleg;