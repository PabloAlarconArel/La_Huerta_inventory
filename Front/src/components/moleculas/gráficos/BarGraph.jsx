import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useThemeStore,GraphicCard } from '../../../index';


export function BarGraph({data}){

    const { theme } = useThemeStore();
    const barData =  Object.values(
        data.reduce((acc,item)=>{
            const name= item.product?.productName;
            if(!acc[name]){
                acc[name] = {name:name,available:0,consumed:0}
            }
            acc[name].available +=item.quantityAvailable;
            acc[name].consumed += item.quantityInitial - item.quantityAvailable
            return acc;
        },{})
    );

    const top10LowStock = barData
    .sort((a, b) => a.available - b.available)
    .slice(0, 10);

    return(
        <GraphicCard title = "Inventario con menor stock" subtitle = "Top 10">
        <ComposedChart
         layout="vertical"
          width={400}
          height={425}
          data={top10LowStock}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" vertical={false} horizontal={false}/>
          <XAxis type="number" />
          <YAxis 
                dataKey="name" 
                type="category" 
                scale="band" 
                width={120}
                interval={0}
                tickFormatter={(value) => {
                    const upper = String(value).toUpperCase();
                return upper.length > 10? upper.substring(0, 10): upper; 
                }
                }
                tick={({ x, y, payload }) => {
                return (
                <text
                    x={x - 50} 
                    y={y + 22} 
                    fill={theme === "light" ? "#333" : "#e5fcfb"}
                    textAnchor="middle"
                    fontSize={15}
                    fontWeight="bold"
                    fontStyle="Roboto"
                    
                >
                    {payload.value.length > 10 ? payload.value.substring(0, 10) : payload.value}
                </text>
                );
            }}    
            />
         <Tooltip /> 
          <Legend />
          <Bar dataKey="available" stackId="a" fill="#3bb86bff" name="Disponible" />
          <Bar dataKey="consumed" stackId="a" fill="#8884d8" name="Consumido"/>
          
        </ComposedChart>
        </GraphicCard>

    )

};
