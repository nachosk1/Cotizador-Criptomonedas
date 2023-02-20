import { useEffect, useState } from 'react'
import Error from './Error'
import styled from '@emotion/styled'
import { money } from '../data/money'
import useSelectMoney from '../hooks/useSelectMoney'


const Form = ({setMoney}) => {
    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [stateMoney, SelectMoney] = useSelectMoney('Elige tu Moneda', money)

    const [criptomoney, SelectCriptomoney] = useSelectMoney('Elige tu Criptomoneda', criptos)

    
    useEffect(() => {
        const consultAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const response = await fetch(url)
            const result = await response.json()

            const arrayCriptos = result.Data.map(cripto => {
                const object = {
                    id: cripto.CoinInfo.Name,
                    name: cripto.CoinInfo.FullName
                }
                return object
            })
            setCriptos(arrayCriptos)
        }
        consultAPI()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        if([stateMoney, criptomoney].includes('')){
            setError(true)
            return
        }
        setError(false)
        setMoney({
            stateMoney,
            criptomoney
        })
    }

    return (
        <>
        {
            error && <Error>Todos los campos son obligatorios</Error>
        }
            <form onSubmit={handleSubmit}>
                <SelectMoney />
                <SelectCriptomoney />
                <InputSubmit
                    type="submit"
                    value="Cotizar" />
            </form>
        </>
        
    )
}

const InputSubmit = styled.input`
    background-color: #9497FF;
    width: 100%;
    border: none;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

export default Form
