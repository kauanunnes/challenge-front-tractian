import axios from 'axios';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react';
import { Container } from './style';
import { List, Typography } from 'antd';

function Home(props) {

  const [status, setStatus] = useState({
    inAlert: 0,
    inDowntime: 0,
    inOperation: 0,
  })

  const [assets, setAssets] = useState({
    loading: false,
    data: []
  })

  const [inAlertAssets, setInAlertAssets] = useState([])

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
        text: 'Estado atual dos ativos'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [
      {
        name: "Estado",
        colorByPoint: true,
        data: [
          {
            name: "Em alerta",
            y: status.inAlert,
            sliced: true,
            selected: true
          },
          {
            name: "Inativo",
            y: status.inDowntime,
          },
          {
            name: "Em operação",
            y: status.inOperation,
          }
        ]
      }
    ],

  }

  useEffect(() => {
    setAssets({ loading: true })
    axios.get('https://my-json-server.typicode.com/tractian/fake-api/assets')
      .then(({data}) => {
        setAssets({
          loading: false,
          data,
        })
        countingDataAssets(data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const countingDataAssets = (data) => {
    let countStatus = {
      inOperation: 0,
      inAlert: 0,
      inDowntime: 0
    }
    data.forEach(value => {
      switch (value.status) {
        case 'inOperation':
          countStatus.inOperation += 1
          break;
        case 'inAlert': 
          countStatus.inAlert ++
          let assets = inAlertAssets ? inAlertAssets : []
          assets.push(value)
          setInAlertAssets(assets)
          break;
        case 'inDowntime':
          countStatus.inDowntime ++
          break;
        default:
          break;
      }
    })
    setStatus(countStatus)
  }

  

  return (
    <Container>
      {assets.loading ? (
        <h1>Carregando</h1>
      ) : (
        <div className="graphicArea">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ className: 'graphic' }} 
          />
        </div>
      )}
      <List
        header={<div>Ativos em alerta</div>}
        className="warningArea"
        bordered
        dataSource={inAlertAssets}
        renderItem={item => (
          <List.Item>
            <Typography.Text mark>[{item.mode === 'fan' ? 'Ventilador' : 'Motor'}]</Typography.Text> {item.name}
          </List.Item>
        )}
      >
      </List>
    </Container>
  )
}

export default Home;