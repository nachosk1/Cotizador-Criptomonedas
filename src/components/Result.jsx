import styled from '@emotion/styled'

const Result = ({ result }) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGE24HOUR, IMAGEURL, LASTUPDATE } = result
    return (
        <Container>
            <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="image crypto" />
            <div>
                <Price>El precio es de: <span>{PRICE}</span></Price>
                <Text>Precio más alto del día: <span>{HIGHDAY}</span></Text>
                <Text>Precio más bajo del día: <span>{LOWDAY}</span></Text>
                <p>Variación últimas 24 horas: <span>{CHANGE24HOUR}</span></p>
                <Text>Últimas Actualizaciones: <span>{LASTUPDATE}</span></Text>
            </div>
        </Container>
    )
}

const Container = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;

    @media (max-width: 623px) {
        flex-direction: column;
    }
`

const Text = styled.p`
    font-size: 18px;
    align-items: center;
    span{
        font-weight: 700;
    }
`

const Price = styled.p`
    font-size: 24px;
    align-items: center;
    span{
        font-weight: 700;
    }
`
const Image = styled.img`
    display: block;
    width: 120px;
`



export default Result
