import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,
  Title,Tooltip,Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,LinearScale,PointElement,LineElement,
  Title,Tooltip,Legend
);


function MyChart() {
  const [apiData,setApiData] = useState([])
  const [renderFinish , setRenderFinish] = useState(false)
  const [data,setData] = useState({
    labels : [''],
    datasets: [
      {
        label: '',
        data: [],
        borderColor: 'rgb(255, 255, 255, 0)',
        backgroundColor: 'rgba(255, 255, 255, 0)',
      },
    ],
  })

  // Get data after Render
  useEffect(()=>{
    (async function () {
      const token = 'CWB-E35F3BF1-1E69-42DE-A4B0-2F7F8DCF98D3'
      const timeFrom = '2022-02-01'
      const timeTo = '2022-03-01'
      const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/C-B0025-001?Authorization=${token}&format=JSON&stationId=466920,466940&sort=dataTime&timeFrom=${timeFrom}&timeTo=${timeTo}`
      const request = new Request(url,{method:'GET'})
      const response = await fetch(request)
      const data = await response.json()
      // 簡易除錯
      if(!data.success)console.log('Request error')
      setApiData(data.records.location)
      // console.log('data :',data.records.location)
    })()
    setRenderFinish(true)
  },[])

  // 基本選項參數
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: '每日雨量',
      },
    },
  };
  
  // apiData 更新後，處理最新的數據
  useEffect(()=>{
    if(!renderFinish) return
    setData({
      // 取得程式名稱
      labels : apiData[0].stationObsTimes.stationObsTime.map((v)=>(v.dataDate.slice(v.dataDate.indexOf('-')+ 1))),
      
      datasets: apiData.map((v,i)=>{
        const color = `rgb(${Math.floor(Math.random()*200)}, ${Math.floor(Math.random()*200)}, ${Math.floor(Math.random()*200)})`
        return {
          label: v.station.stationName,
          data: v.stationObsTimes.stationObsTime.map((vv)=>{
            // 回傳T的畫，代表有降雨。但雨量太少機器測不到
            const returnData = vv.weatherElements.precipitation === 'T' ? 0 :vv.weatherElements.precipitation
            return returnData}),
          borderColor: color,
          backgroundColor: color,
        }
      }),
    })
  },[apiData])


  return <Line options={options} data={data} />;
}

export default MyChart;