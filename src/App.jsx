import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Result from './components/Result'
import Form from './components/Form'
import Spinner from './components/Spiner'
import ImgCripto from './img/imagen-criptos.png'

function App() {
  const [money, setMoney] = useState({})
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(Object.keys(money).length > 0){
      const quoteCripto = async () => {
        setLoading(true)
        setResult({})

        const {stateMoney: moneys = "", criptomoney = ""} = money
        
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoney}&tsyms=${moneys}`
        const res = await fetch(url).then(result => result.json()).catch(error => console.log(error))
        
        setResult(res.DISPLAY[criptomoney][moneys])
        setLoading(false)
      }
      quoteCripto()
    }
  }, [money])

  return (
    <div>
      <Container>
        <Image
          src={ImgCripto}
          alt="imagenes Criptomonedas"
        />
        <div>
          <Heading>Cotiza Criptomonedas al Instante</Heading>
          <Form setMoney={setMoney}></Form>
          {loading && <ContainSpinner><Spinner/> </ContainSpinner>}
          {result.PRICE && <Result result={result}/>}
        </div>
      </Container>
    </div>
  )
}

const ContainSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

const Container = styled.div`
  max-width: 900px;
  width: 90%;
  margin: 0 auto;

  @media (min-width: 623px) {
    width: 80%;
  }
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

export default App
