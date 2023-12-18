import baseUrl from "@/config";
import axios, { AxiosResponse } from "axios";
import { MDBDataTable, MDBDataTableV5 } from "mdbreact";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import queryString from "query-string";

interface irData {
    nama: string,
    no_handphone: string,
    alamat: string,
    jumlah_pendukung: number,
}
interface columns {
    label: string,
    field: string,
    sort: string,
}
interface rows {
    no: number,
    nama: string,
    alamat: string,
    no_handphone: string,
    jumlah_pendukung: number
}
interface dataTable {
    rows: rows[],
    columns: columns[],
}
const Semua_relawan: React.FC = () => {
    const [download, setDownload] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<dataTable>();
    const _getData = () => {
        setLoading(true);
        axios.get(baseUrl("report/get-relawan"))
            .then((respon: AxiosResponse<any, any>) => {
                const datax: rows[] = [];
                respon.data.map((list: any, index: number) => {
                    datax.push({
                        no: index + 1,
                        nama: list.nama,
                        no_handphone: list.no_handphone,
                        alamat: list.alamat,
                        jumlah_pendukung: list.jumlah_pendukung,
                    })

                })
                const format_data: dataTable = {
                    columns: [
                        {
                            label: "No",
                            field: "no",
                            sort: "asc",
                        },
                        {
                            label: "Nama",
                            field: "nama",
                            sort: "asc",
                        },
                        {
                            label: "No Handphone",
                            field: "no_handphone",
                            sort: "asc",
                        },
                        {
                            label: "Alamat",
                            field: "alamat",
                            sort: "asc",
                        },
                        {
                            label: "Jumlah Pendukung",
                            field: "jumlah_pendukung",
                            sort: "asc",
                        },
                    ],
                    rows: datax
                }

                setData(format_data);
                setLoading(false);

            })
    }
    const _handleDonwload = () => {
        setDownload(true);
        axios.post(baseUrl("export-table.php"),

            queryString.stringify({
                "data": JSON.stringify(data)
            }),

            {
                responseType: "arraybuffer",
            }

        )
            .then((respon: AxiosResponse<any, any>) => {
                const type = respon.headers['content-type']
                const blob = new Blob([respon.data], { type: type })
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = 'file.xls'
                link.click()
                setDownload(false);
            })
    }
    useEffect(() => {
        _getData();
    }, [])
    return (<>
        <div>
            {download ? "Memproses..." : <button onClick={() => {
                _handleDonwload();
            }}>Download</button>}
        </div>
        <h4>Data Semua Relawan</h4>


        <MDBDataTableV5 paging={true}
            data={data}
            btn={true}
            striped={true}
            searching={true} searchingLabel="Cari" />
        {loading ??
            <div>
                <center>
                    <LoadingSpinner /><br />
                    Mengambil data...
                </center>
            </div>}
    </>);
}

export default Semua_relawan;