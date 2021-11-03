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
  const [inOperationAssets, setInOperationAssets] = useState([])

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
      let assets = {
        inAlert: [],
        inOperation: []
      }
      switch (value.status) {
        case 'inOperation':
          countStatus.inOperation += 1
          assets.inOperation = inOperationAssets ? inOperationAssets : []
          assets.inOperation.push(value)
          setInOperationAssets(assets.inOperation)
          break;
        case 'inAlert': 
          countStatus.inAlert ++
          assets.inAlert = inAlertAssets ? inAlertAssets : []  
          assets.inAlert.push(value)
          setInAlertAssets(assets.inAlert)
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
        header={<div><h3>Ativos em alerta</h3></div>}
        className="warningArea"
        bordered
        dataSource={inAlertAssets}
        renderItem={item => (
          <List.Item>
            <Typography.Text mark>[{item.model === 'fan' ? 'Ventilador' : 'Motor'}]</Typography.Text> {item.name}
          </List.Item>
        )}
      >
      </List>
      <List
        header={<div><h3>Ativos em operação</h3></div>}
        className="operationArea"
        bordered
        dataSource={inOperationAssets}
        renderItem={item => (
          <List.Item>
            <Typography.Text mark className="highlightedText">[{item.model === 'fan' ? 'Ventilador' : 'Motor'}]</Typography.Text> {item.name}
          </List.Item>
        )}
      >
      </List>
    </Container>
  )
}

export default Home;