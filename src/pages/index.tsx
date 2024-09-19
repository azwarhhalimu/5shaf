import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Data_relawan from './data-relawan.html';
import { useContext, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })
import { useMyContext } from '@/interface/myContext';
import axios, { AxiosResponse } from 'axios';
export default function Home() {
  const { updateMenu } = useMyContext();
  const _getData = () => {
    const xdata = []
    axios.get('https://sirekap-obj-data.kpu.go.id/pemilu/caleg/partai/747203.json')
      .then((respon: AxiosResponse<any, any>) => {
        const data = (Object.values(Object.values(respon.data)));
        data.flatMap((list: any, index) => {
          console.log(list.nama);
        })

      })
  }

  useEffect(() => {
    updateMenu("beranda");
    _getData();
  }, []);
  return <>

  </>

}
