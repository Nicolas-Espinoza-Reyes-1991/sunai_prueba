import React from 'react'
// import Chart from 'chart.js/auto';
// import {Bar} from 'react-chartjs-2'
import 'bootstrap/dist/css/bootstrap.css';
import * as XLSX from 'xlsx'
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const labels = ["2017", "2018"];

const options = {
    plugins: {
        legend: {
            position: "bottom",
        },
    },
};

export const data = {
    labels,
    datasets: [
        {
            label: "Planta 1",
            data: [32, 42, 51, 60, 51, 95],
            backgroundColor: "#2196F3",
            borderColor: "#2196F3",
        },
        {
            label: "Planta 2",
            data: [37, 42, 41, 37, 31, 44],
            backgroundColor: "#F44236",
            borderColor: "#F44236",
        },
    ],
};



// const data = {


//     // labels: ['Planta N°1', 'Planta N°2'],
//     // datasets: [{
//     //     label: 'Planta 1 y 2',
//     //     BackgroundColor:'rgba(0,255,0,1)',
//     //     borderColor: 'black',
//     //     borderWidth: 1,
//     //     hoverBackgroundColor: 'rgba(0,255,0,0.2)',
//     //     hoverBorderColor: '#ffff00',
//     //     data: [412.2, 215.5, 321.5]
//     // }]
// };
const opciones = {
    maintainAspectRatio: false,
    responsive: true
}



class GaraficoExcel extends React.Component {
    state = {
        active_power_im_total_planta1:0,
        active_power_im_total_planta2: 0,
        active_power_im_total_max:0
    };

    onImportExcel = file => {
        // Obtener el objeto del archivo cargado
        const { files } = file.target;
        // Leer el archivo a través del objeto FileReader
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const { result } = event.target;
                // Leer en secuencia binaria para obtener todo el objeto de tabla de Excel
                const workbook = XLSX.read(result, { type: 'binary' });
                let data = []; // almacena los datos obtenidos
                // recorre cada hoja de trabajo para leer (aquí solo se lee la primera tabla por defecto)
                for (const sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // usa el método sheet_to_json para convertir Excel a datos json
                        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                         break; // Si solo se toma la primera tabla, descomenta esta línea
                    }
                    
                }
               
                const valuesArray = JSON.parse(data);
                console.log(valuesArray);
                // var arr = JSON.parse(data);
                var active_power_im_total_planta1 = data.reduce((sum, value) => (typeof value.active_power_im == "number" ? sum + value.active_power_im : sum), 0);
                // console.log(active_power_im_total_planta1);
            
                console.log(data[0]);
                this.setState({ active_power_im_total_planta1: active_power_im_total_planta1 });
                
            } catch (e) {
                // Aquí puede lanzar una solicitud relacionada para un error de tipo de archivo incorrecto
                console.log('Tipo de archivo incorrecto');
                return;
            }
        };
        // Abre el archivo en modo binario
        fileReader.readAsBinaryString(files[0]);
    }

    onImportExcel2 = file => {
        // Obtener el objeto del archivo cargado
        const { files } = file.target;
        // Leer el archivo a través del objeto FileReader
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const { result } = event.target;
                // Leer en secuencia binaria para obtener todo el objeto de tabla de Excel
                const workbook = XLSX.read(result, { type: 'binary' });
                let data = []; // almacena los datos obtenidos
                // recorre cada hoja de trabajo para leer (aquí solo se lee la primera tabla por defecto)
                for (const sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // usa el método sheet_to_json para convertir Excel a datos json
                        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        // break; // Si solo se toma la primera tabla, descomenta esta línea
                    }
                }
                // var arr = JSON.parse(data);
                var active_power_im_total_planta2 = data.reduce((sum, value) => (typeof value.active_power_im == "number" ? sum + value.active_power_im : sum), 0);
                console.log(active_power_im_total_planta2);
                this.setState({ active_power_im_total_planta2: active_power_im_total_planta2 });

            } catch (e) {
                // Aquí puede lanzar una solicitud relacionada para un error de tipo de archivo incorrecto
                console.log('Tipo de archivo incorrecto');
                return;
            }
        };
        // Abre el archivo en modo binario
        fileReader.readAsBinaryString(files[0]);
    }

    render(){
        return (

            <Container>
                <div class="row">
                    <div class="col-4">
                        <input type='file' accept='.xlsx, .xls' onChange={this.onImportExcel} />
                    </div>
                    <div class="col-4">
                        <input type='file' accept='.xlsx, .xls' onChange={this.onImportExcel2} />
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <p>Suma planta 1: {this.state.active_power_im_total_planta1}</p>
                    </div>
                    <div class="col-4">
                        <p>Suma planta 2: {this.state.active_power_im_total_planta2}</p>
                    </div>

                    <div class="col-4">
                        <p><b>Suma total:{this.state.active_power_im_total_planta1+this.state.active_power_im_total_planta2}</b></p>
                    </div>
                </div>

                

                <hr></hr>
            {/* <div className='GaraficoExcel' style={{width:'100%', height:'500px'}} >
                <h2>Grafico de datos</h2>
                <Bar data={data} options={opciones}/>
            </div> */}


                <div style={{ width: '100%', height: 500 }}>
                    <Line options={options} data={data} />
                </div>
           

            </Container>
         
        );
    }
}


export default GaraficoExcel
