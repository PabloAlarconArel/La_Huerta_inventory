import { LineChart } from '@mui/x-charts/LineChart';


export function LineGraph(){



    return(
        <LineChart
      height={300}
      series={[
        { data: pData, label: 'pv' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      yAxis={[{ width: 50 }]}
      margin={margin}
    />

    )
}