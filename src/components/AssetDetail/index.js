import axios from "axios"
import { useEffect, useState } from "react"
import { DetailsContainer } from "./style"


function AssetDetail({assetId}) {

  const [units, setUnits] = useState({
    loading: false,
    data: [],
  })

  const [companies, setCompanies] = useState({
    loading: false,
    data: [],
  })

  const [sensors, setSensors] = useState([])

  const [assetData, setAssetData] = useState({
    loading: false,
    data: []
  })

  useEffect(() => {
    setAssetData({
      loading: true
    })
    axios.get(`https://my-json-server.typicode.com/tractian/fake-api/assets/${assetId}`)
      .then(({data}) => {
        setAssetData({
          data,
          loading: false
        })
        setSensors(data.sensors)
        
      })
      .catch(err => {
        console.log(err);
      })

  }, [assetId])

  useEffect(() => {
    setCompanies({ loading: true })
    setUnits({ loading: true })
    axios.get(`https://my-json-server.typicode.com/tractian/fake-api/companies/`)
      .then(({data}) => {
        setCompanies({
          loading: false,
          data,
        })
      })
      .catch(err => {
        console.log(err);
      })
    axios.get(`https://my-json-server.typicode.com/tractian/fake-api/units/`)
      .then(({data}) => {
        setUnits({
          loading: false,
          data,
        })
      })
      .catch(err => {
        console.log(err);
      })

  }, [])


  const treatingAssetStatus = (status) => {
    switch (status) {
      case 'inAlert':
        return 'em alerta'
      case 'inOperation':
        return 'em operação'
      case 'inDowntime':
        return 'inativo'
      default:
        break;
    }
  }

  const treatingSpecifications = (specName) => {
    switch (specName) {
      case 'maxTemp':
        return 'Temperatura máxima(Cº)'
      case 'power':
        return 'Potência'
      case 'rpm':
        return 'RPM'
      default:
        break;
    }
  }

  const treatingMetricsName = (metricsName) => {
    switch (metricsName) {
      case 'totalCollectsUptime':
        return 'Total de Coletas Uptime(Ligada)'
      case 'totalUptime':
        return 'Total de Horas de Coletas Uptime(Ligada)'
      case 'lastUptimeAt':
        return 'Data da Ultima Coleta Uptime(Ligada)'
      default:
        break;
    }
  }


  let resultSpecs = []
  const handleShowSpecs = () => {
    let specifications = assetData.data.specifications
    for(let key in specifications) {
      resultSpecs.push(`${treatingSpecifications(key)}: ${!specifications[key] ? 'não informado' : specifications[key]}`)
    }
  }

  let resultMetrics = []
  const treatingMetricsValue = () => {
    let metrics = assetData.data.metrics
    for(let key in metrics) {
      if(key !== 'lastUptimeAt') {
        resultMetrics.push(`${treatingMetricsName(key)}: ${!metrics[key] ? 'não informado' : Math.round(metrics[key])}`)
        
      } else {
        let date = metrics[key].split('-')
        let day = date[2].split('T')
        
        resultMetrics.push(`${treatingMetricsName(key)}: ${!metrics[key] ? 'não informado' : `${day[0]}/${date[1]}/${date[0]}` }`)
      }
    }
  }

  const treatingCompanyId = (id) => {
    const result = companies.data.find(element => {
      return element.id === id 
    })

    return result ? result.name : 'carregando'
  }

  const treatingUnitId = (id) => {
    const result = units.data.find(element => {
      return element.id === id 
    })
   
    return result ? result.name : 'carregando'
  }

  return (
    <DetailsContainer>
      {assetData.loading || companies.loading || units.loading ? <h1>Carregando...</h1> :
      (
        <>
          <img src={assetData.data.image} alt=""/>
          <table>
            <tbody>
              <tr>
                <td>
                  Modelo
                </td>
                <td>
                  {assetData.data.model  === 'fan' ? 'Ventilador' : 'Motor'}
                </td>
              </tr>
              <tr>
                <td>
                  Nome
                </td>
                <td>
                  {assetData.data.name}
                </td>
              </tr>
              <tr>
                <td>
                  Sensores
                </td>
                <td>
                  <ul>
                    {
                      sensors.map((sensor, index) => {
                        return (
                          <li key={index}>{sensor}</li>
                        )
                      })
                    } 
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  Nível de saúde
                </td>
                <td>
                  {assetData.data.healthscore}%
                </td>
              </tr>
              <tr>
                <td>
                  Estado
                </td>
                <td>
                  {treatingAssetStatus(assetData.data.status)}
                </td>
              </tr>
              <tr>
                <td>
                  Especificações
                </td>
                <td>
                  <ul>
                    {
                      handleShowSpecs(assetData.data.specfications)
                    }
                    {
                      resultSpecs.map((spec, index) => {
                        return (
                          <li key={index}>{spec}</li>
                        )
                      })
                    }
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  Métricas
                </td>
                <td>
                  <ul>
                    {
                      treatingMetricsValue(assetData.data.metrics)
                    }
                    {
                      resultMetrics.map((spec, index) => {
                        return (
                          <li key={index}>{spec}</li>
                        )
                      })
                    }
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  Unidade
                </td>
                <td>
                  {treatingUnitId(assetData.data.unitId)}
                </td>
              </tr>
              <tr>
                <td>
                  Empresa
                </td>
                <td>
                  {treatingCompanyId(assetData.data.companyId)}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </DetailsContainer>
  )
}

export default AssetDetail