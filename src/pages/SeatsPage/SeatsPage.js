import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import SeatItens from "../../components/SeatItens"

export default function SeatsPage({filme,setFilme,data,setData,horario,setHorario,cpf,setCpf,name,setName,ingresso,setIngresso}) {
    const Indisponível = '#FBE192'
    const Disponível = '#C3CFD9'
    const Selecionado = '#1AAE9E'
    const BordaIndisponível = '1px solid #F7C52B'
    const BordaDisponível = '1px solid #7B8B99'
    const BordaSelecionado = '1px solid #0E7D71'
    const [assento, setAssento] = useState([])
    const [ids, setIds] = useState([])

    console.log(data)
    
    const navigate = useNavigate()

    const { idSessao } = useParams()

    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`

        const promise = axios.get(URL)

        promise.then((response) => {
            setAssento(response.data.seats)
            setFilme(response.data.movie)
            setData(response.data.day)
            setHorario(response.data.name)
        })
        promise.catch((err) => alert(err.response.data))
    }, [])

    function SolicitarReserva(event) {
        event.preventDefault()
        const URL = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many'
        const requisicao = { ids , name , cpf }
        
        const promise = axios.post(URL,requisicao)

        promise.then((res)=> navigate("/sucesso"))
        promise.catch((err)=> console.log(err.response.data))
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assento.map((lugares) => (
                    <SeatItens key={lugares.id}
                        id={lugares.id}
                        lugares={lugares.name}
                        ocupado={lugares.isAvailable}
                        ids={ids}
                        setIds={setIds}
                        ingresso={ingresso}
                        setIngresso={setIngresso}
                    >

                    </SeatItens>
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle cor={Selecionado} borda={BordaSelecionado} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor={Disponível} borda={BordaDisponível} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor={Indisponível} borda={BordaIndisponível} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={SolicitarReserva}>
                <label htmlFor="name">Nome do Comprador:</label>
                <input id="name"
                    name="name"
                    placeholder="Digite seu nome..."
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input id="cpf" 
                name="cpf" 
                placeholder="Digite seu CPF..." 
                required 
                value={cpf}
                onChange={e => setCpf(e.target.value)}
                />

                <button type="submit">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={filme.posterURL} alt={filme.title} />
                </div>
                <div>
                    <p>{filme.title}</p>
                    <p>{data.weekday} - {horario}</p>
                </div>
            </FooterContainer>

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
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: ${prop => prop.borda}; 
    background-color: ${prop => prop.cor};    
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`