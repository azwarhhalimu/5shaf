import Height from "@/Componen/Height";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import axios, { Axios, AxiosResponse } from "axios";
import baseUrl from "@/config";
import queryString from "query-string";
import { useRouter } from "next/router";
interface c {
    alamat: string;
    id_saksi: string;
    jenis_kelamin: string;
    nama: string;
    no_handphone: string;
}
interface cdata {
    id_saksi: string;
    id_saksi_role: string;
    "nama": string,
    "alamat": string,
    "jenis_kelamin": string,
    "no_handphone": string
}
const Saksi: React.FC = () => {

    const route = useRouter()

    const [kelTps, setKelTps] = useState<{ tps: string, kelurahan: string }>();
    const [data, setData] = useState<cdata[]>([]);

    const [dataSaksi, setDataSaksi] = useState<c[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [isNew, setIsNew] = useState<boolean>(false);
    const [reload, setReload] = useState<number>(0);
    const reset: any = useRef(null);

    const [pSaksi, setPSaksi] = useState<{ value: string, label: string }[]>([]);
    const [nama, setNama] = useState<string>('');
    const [alamat, setAlamat] = useState<string>('');
    const [no_handphone, setNo_handphone] = useState<string>('');
    const [jenis_kelamin, setJenis_kelamin] = useState<string>('Laki-laki');

    const animatedComponents = makeAnimated();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const id: string[] = typeof window !== "undefined" ? window.location.pathname.split('/') : [];
    const _roleSaksi = (e: any) => {
        e.preventDefault();
        axios.post(baseUrl('saksi/save_role'), queryString.stringify({
            data: JSON.stringify(pSaksi),
            id_tps: id[3],
            id_kelurahan: id[2],
        })).then((respon: AxiosResponse<any, any>) => {
            if (respon.data.status == "data_saved") {
                alert('Saksi berhasil di tambahkan');
                handleClose();
                setReload(reload + 1);
            }
        })

    }
    const _deleteData = (id: string) => {
        const c = window.confirm("Apakah anda ingin menghapus data ini?");
        if (c) {
            axios.delete(baseUrl('saksi') + "?id=" + id)
                .then((respon: AxiosResponse<any, any>) => {
                    alert('Data terhapus');
                    setReload(reload + 1);
                });
        }
    }
    const _getRoleSaksi = () => {
        axios.get(baseUrl('saksi/saksi-role?id_tps=' + id[3] + "&id_kelurahan=" + id[2]))
            .then((respon: AxiosResponse<any, any>) => {
                setData(respon.data.data.data);
                setKelTps({
                    tps: respon.data.data.tps,
                    kelurahan: respon.data.data.kelurahan,
                });
            })
    }
    const _getSaksi = () => {
        axios.get(baseUrl('saksi'))
            .then((respon: AxiosResponse<any, any>) => {
                setDataSaksi(respon.data.data.list);
            })
    }
    const _simpan_saksi = (e: any) => {
        e.preventDefault();
        axios.post(baseUrl('saksi/'),
            queryString.stringify({
                nama: nama,
                alamat: alamat,
                no_handphone: no_handphone,
                jenis_kelamin: jenis_kelamin,
            })
        )
            .then((respon: AxiosResponse<any, any>) => {
                if (respon.data.status == "ok") {
                    alert('Data berhasil di tambahakan');
                    setIsNew(false);
                    reset?.current?.click();
                    setReload(reload + 1);
                }
            });
    }


    const [showx, setShowx] = useState(false);

    const handleClosex = () => setShowx(false);
    const handleShowx = () => setShowx(true);

    //const [reload, setReload] = useState<number>(0);
    const [edata, setEdata] = useState<{
        id_partai: string;
        partai: string;
        caleg: {
            id_caleg: string,
            nama: string,
            suara: number,
        }[]
    }[]>([]);
    const [datax, setDatax] = useState<{
        id_partai: string;
        partai: string;
        caleg: {
            id_caleg: string,
            nama: string,
            suara: number,
        }[]
    }[]>([]);
    const _getPartai = () => {
        axios.get(baseUrl('partai'))
            .then((respon: AxiosResponse<any, any>) => {
                setData(respon.data.data);
                setEdata(respon.data.data);

            })
    }

    const _updateSuara = (e: any) => {
        e.preventDefault();
        axios.post(baseUrl('partai/update-suara'),
            queryString.stringify({
                data: JSON.stringify(edata),
                id_tps: id[3],
                id_kelurahan: id[2]
            })
        )
            .then((respon) => {
                if (respon.data.status == "ok") {
                    setReload(reload + 1);
                    handleClosex();
                }
            });
        ;
    }
    const [list_suara, setList_suara] = useState<{
        nama: string;
        suara: any;
    }[]>([]);
    const _getSuara = () => {
        axios.post(baseUrl('partai/get-suara'), queryString.stringify({
            id_tps: id[3],
            id_kelurahan: id[2],
        })).then((respon: AxiosResponse<any, any>) => {
            setList_suara(respon.data.data);
        })
    }

    useEffect(() => {
        _getSaksi();
        _getSuara();
        _getRoleSaksi();
        _getPartai();
    }, [reload])
    return (<>
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <button onClick={() => {
                    route.back();
                }} className="btn btn-danger"><i className="fa fa-chevron-left" /> Kembali</button>
                <h1 className="h3 mb-0 text-gray-800">Data Saksi </h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                    <li className="breadcrumb-item">Pages</li>
                    <li className="breadcrumb-item active" aria-current="page">Blank Page</li>
                </ol>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    Kelurahan : {kelTps?.kelurahan}<br />
                    Tps:{kelTps?.tps}
                    <div className="card">
                        <div className="card-body">
                            <button onClick={() => {
                                handleShow();
                            }} className="btn btn-primary">Tambah Data Saksi</button>
                            <Height height={10} />
                            <table className="table">
                                <thead>
                                    <tr style={{ fontWeight: "bold" }}>
                                        <td>No</td>
                                        <td>
                                            Nama Lengkap
                                        </td>
                                        <td>
                                            Alamat
                                        </td>
                                        <td>
                                            Jenis Kelamin
                                        </td>
                                        <td>
                                            Nomor Handphone
                                        </td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((list, index) => (
                                        <tr key={`${index}`}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {list.nama}
                                            </td>
                                            <td>
                                                {list.alamat}
                                            </td>
                                            <td>
                                                {list.jenis_kelamin}
                                            </td>
                                            <td>
                                                {list.no_handphone}
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => {
                                                    _deleteData(list.id_saksi_role)
                                                }}>Hapus</button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Height height={20} />
                    <h3>Data Suara</h3>
                    <button onClick={() => {
                        handleShowx();
                    }} className="btn btn-primary">Update Suara</button>
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>

                                    <tr>
                                        <td>No</td><td>Nama</td><td>Suara</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list_suara.map((list, index) => (
                                        <tr key={`${index}`}>
                                            <td>{index + 1}</td><td>{list.nama}</td><td>{list.suara}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Tambah Data Saksi Baru
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={(isNew ? { display: "none" } : { display: "block" })}>
                    <form onSubmit={_roleSaksi}>
                        <table width={"100%"} className="table">
                            <tbody>
                                <tr>
                                    <td width={"65%"}>
                                        <Select
                                            placeholder={"Pilih Saksi"}
                                            // closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            defaultValue={data.map((list, index) => ({
                                                value: list.id_saksi,
                                                label: list.nama,
                                            }))}
                                            isMulti
                                            onChange={(e: any) => {
                                                setPSaksi(e);
                                            }}
                                            options={dataSaksi.map((list, index) => ({
                                                value: list.id_saksi,
                                                label: list.nama,
                                            }))}
                                        />
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => {
                                            setIsNew(true);
                                        }} className="btn btn-sm">Tambah Saksi</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn btn-primary">Simpam Data</button>
                    </form>

                </div>


                <div style={(!isNew ? { display: "none" } : {})}>
                    <form onSubmit={_simpan_saksi}>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Nama Lengkap</td>
                                    <td>
                                        <input
                                            required
                                            onChange={(e) => {
                                                setNama(e.target.value);
                                            }}
                                            type="text" placeholder="Nama lengkap" className="form-control" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Alamat</td>
                                    <td>
                                        <textarea
                                            required
                                            onChange={(e) => {
                                                setAlamat(e.target.value);
                                            }}
                                            placeholder="Nama lengkap" className="form-control" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Jenis Kelamin</td>
                                    <td>
                                        <select
                                            required
                                            onChange={(e) => {
                                                setJenis_kelamin(e.target.value);
                                            }}
                                            className="form-control">
                                            <option value={"Laki-laki"}>Laki-laki</option>
                                            <option value={"Perempuan"}>Perempuan</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Nomor Handphone</td>
                                    <td>
                                        <input
                                            required
                                            onChange={(e) => {
                                                setNo_handphone(e.target.value);
                                            }}
                                            type="tel" placeholder="Nama lengkap" className="form-control" />
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <div>
                            <button style={{ display: "none" }} ref={reset} type="reset">REset</button>
                            <button type="button" onClick={() => {
                                setIsNew(false);
                            }} className="btn btn-danger">Batal</button>{" "}
                            <button type="submit" className="btn btn-success">Simpan</button>
                        </div>
                    </form>
                </div>
            </Modal.Body>

        </Modal>

        <Modal show={showx} onHide={handleClosex}>
            <Modal.Header closeButton>
                <Modal.Title>Masukkan Suara</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form onSubmit={_updateSuara}>
                    {
                        edata.map((list, index) => (
                            <div style={{}} key={`${index}`}>
                                <div className="card">
                                    <div className="card-body">
                                        <div style={{ fontWeight: "bold" }}>Suara Masuk Partai {list.partai}</div>

                                        <table className="table">
                                            <tbody>
                                                {list.caleg.map((x, i) => (
                                                    <tr key={`${x}`}>
                                                        <td width={"50px"}>{i + 1}</td>
                                                        <td>{x.nama}</td>

                                                        <td>
                                                            <input
                                                                required
                                                                onChange={(e) => {
                                                                    const a = edata;
                                                                    a[index].caleg[i].suara = Number(e.target.value);
                                                                    setEdata(a);
                                                                    console.log(edata);

                                                                }} placeholder="Masukka jumlah suara" type="number" className="form-control" />
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
                    <button className="btn btn-success">
                        Simapn
                    </button>
                </form>
            </Modal.Body>

        </Modal>

    </>);
}

export default Saksi;