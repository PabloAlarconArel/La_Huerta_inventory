import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import{ useSaleStore , DonutsGraph , CardOffer } from "../../index";

dayjs.extend(isoWeek);

export function HomeTemplate(){
    const {dateSale} = useSaleStore()
    const initDay = dayjs().startOf("isoWeek").format("YYYY-MM-DD")
    const endDay = dayjs().format("YYYY-MM-DD")

    const { data , error, isLoading} = useQuery({
        queryKey: ["date", initDay, endDay],
        queryFn:() => dateSale(initDay,endDay),
    });

    if(!data){
        return
    }
    const dataWeek = data;
    const dayData = data.filter(item => 
        dayjs(item.createdAt).format("YYYY-MM-DD") === endDay
        );

    const totalDay = dayData?.reduce((ti,tf)=>ti+tf.total,0).toLocaleString('es-CL', 
        {
                style: 'currency',
                currency: 'CLP',
                minimumFractionDigits: 0
        });
    const totalWeek = dataWeek?.reduce((ti,tf)=>ti+tf.total,0).toLocaleString('es-CL', 
        {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0
        });
   
    if (isLoading) return <div>Cargando...</div>;
    if (error) {return <div>Error al cargar los productos</div>};

    return(
        <Container>
        <div className="card">
        {<CardOffer title={"Ventas del día"} subtitle={totalDay} sale={true}/>}
        {<CardOffer title={"Ventas de la semana"} subtitle={totalWeek} sale={false}/>}
        </div>
        <DonutsGraph data = {[dataWeek]}/>

        </Container>   
    )    
}
const Container = styled.div`
    height:100vh;

    .card{
        display:flex;
        padding:40px;
        flex-direction: row;
        gap:10px

    }
`
