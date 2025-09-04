import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';
import { GraphicCard } from '../../../index';


export function DonutsGraph({ data }) {

  const pieData = data[0].reduce((acc,sale)=>{
    sale.products.forEach(p =>{
    const catg = p.product?.categories;
    if (!acc[catg]){
      acc[catg] = 0;    
    }
    acc[catg] += p.quantity;
  });
  return acc;
},{});

  return (
    <GraphicCard title = "Categorias más vendidas" subtitle = "semana">
    <Box sx={{ width: '100%' }}>
      <PieChart
        height={200}
        width={200}
        series={[
          {
            data: Object.entries(pieData).map(([label, value], idx) => ({
                  id: idx,
                  value,
                  label,
                  })).slice(0,5),
            innerRadius: 45,
            arcLabel: (params) => params.label ?? '',
            arcLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
              fill: '#333',    
              fontFamily: 'Arial',
            },
            arcLabelMinAngle: 20,
            
          },
        ]}
      />
        
    </Box>
    </GraphicCard >
  );
}