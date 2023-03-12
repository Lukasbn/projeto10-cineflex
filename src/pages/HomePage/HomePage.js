import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function HomePage({setFilme,setData,setHorario,setCpf,setName,setIngresso}) {

    const [listaFilmes, setListaFilmes] = useState([])

    useEffect(() => {
        limpar()

        const URL = "https://mock-api.driven.com.br/api/v8/cineflex/movies"
        const promise = axios.get(URL)

        promise.then((response) => setListaFilmes(response.data))
        promise.catch((err) => alert(err.response.data))
    }, [])

    function limpar(){
        setFilme([])
        setData([])
        setHorario("")
        setCpf("")
        setName("")
        setIngresso([])
    }

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {listaFilmes.map((filme) => (
                    <Link key={filme.id} to={`/sessoes/${filme.id}`}>
                        <MovieContainer data-test="movie">
                            <img src={filme.posterURL} alt="poster" />
                        </MovieContainer>
                    </Link>
                ))}
            </ListContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`