import { useState } from "react"
import styled from "styled-components"

export default function SeatItens({lugares, ocupado, ids, setIds, id,ingresso,setIngresso}){
    const livre = ocupado;
    const [selecionado,setSelecionado] = useState(false)
    console.log(ingresso)
    console.log(ids)

    function toggleSeat(){
        if(!selecionado && livre){
            setSelecionado(true)
            setIds([...ids, id])
            setIngresso([...ingresso,lugares])
        } else if( selecionado ){
            const novoId = ids.filter((elemento) => elemento!== id)
            const novoIngresso = ingresso.filter((elemento) => elemento!== lugares)

            setIds(novoId)
            setIngresso(novoIngresso)
            
            setSelecionado(false)
        }else if (!livre){
            alert("Esse assento não está disponível")
        }
    }

    return(
        <SeatItem data-test="seat" onClick={toggleSeat} livre={livre} selecionado={selecionado}>{lugares}</SeatItem>
    )
}

const SeatItem = styled.div`
    border: ${ prop=> SelecionarBorda(prop.livre,prop.selecionado) };         // Essa cor deve mudar
    background-color: ${ prop=> SelecionarCor(prop.livre,prop.selecionado) };    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`

function SelecionarCor(livre,selecionado){
    if(selecionado){
        return '#1AAE9E'
    }
    if(livre){
        return '#C3CFD9'
    }
    else{
        return '#FBE192'
    }
}

function SelecionarBorda(livre,selecionado){
    if(selecionado){
        return '1px solid #0E7D71'
    }
    if(livre){
        return '1px solid #7B8B99'
    }
    else{
        return '1px solid #F7C52B'
    }
}


