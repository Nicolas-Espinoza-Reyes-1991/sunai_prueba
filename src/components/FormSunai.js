import React from "react";
// import logo from '././logo.svg';
// import '././App.css';
// import FormSunai from './components/FormSunai';
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import * as XLSX from 'xlsx'
// import FormSunai from "././components/FormSunai";


const data = [
    { id: 1, programacion: "React.js", year: "2022", tipo: "Front", datoEmpresa: "" },
    { id: 2, programacion: "VUE.js", year: "2022", tipo: "Front", datoEmpresa: "" },
    { id: 3, programacion: "Jquery", year: "2022", tipo: "Front", datoEmpresa: "" },
    { id: 4, programacion: "Angular", year: "2022", tipo: "Front", datoEmpresa: "" },
    { id: 5, programacion: "php", year: "2022", tipo: "back", datoEmpresa: "" },
    { id: 6, programacion: "Ruby", year: "2022", tipo: "back", datoEmpresa: "" },
];


class FormSunai extends React.Component {
    state = {
        data: data,
        form: {
            id: '',
            programacion: '',
            tipo: '',
            year: '',
            datoEmpresa: ''
        },
        modalInsertar: false,
        modalEditar: false,
    };

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }


    mostrarModalInsertar = () => {
        this.setState({ modalInsertar: true });
    }

    ocultarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    }


    mostrarModalEditar = (registro) => {
        this.setState({ modalEditar: true, form: registro });
    }

    ocultarModalEditar = () => {
        this.setState({ modalEditar: false });
    }

    insertar = () => {
        var valorNuevo = { ...this.state.form };
        valorNuevo.id = this.state.data.length + 1;
        var lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({ data: lista, modalInsertar: false });
    }

    editar = (dato) => {
        var contador = 0;
        var lista = this.state.data;
        lista.map((registro) => {
            if (dato.id == registro.id) {
                lista[contador].programacion = dato.programacion;
                lista[contador].tipo = dato.tipo;
                lista[contador].year = dato.year;
                lista[contador].datoEmpresa = dato.datoEmpresa;
            }
            contador++;
        });
        this.setState({ data: lista, modalEditar: false });
    }


    eliminar = (dato) => {
        var opcion = window.confirm("Realmente quiere eliminar el registro " + dato.id);
        if (opcion) {
            var contador = 0;
            var lista = this.state.data;
            lista.map((registro) => {
                if (registro.id == dato.id) {
                    lista.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: lista });
        }
    }
    render() {
        return (
            <>
                <Container>
                    <h1 class="text-center">SUNAI registro cursos</h1>
                    <br />
                    <hr></hr>

                    <Button color="success" onClick={() => this.mostrarModalInsertar()}>Insert Nuevo Curso</Button>
                    <br /><br />
                    <Table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>programacion</th>
                                <th>tipo</th>
                                <th>año</th>
                                <th>datos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((elemento, indice) => (
                                <tr key={indice}>
                                    <td>{elemento.id}</td>
                                    <td>{elemento.programacion}</td>
                                    <td>{elemento.tipo}</td>
                                    <th>{elemento.year}</th>
                                    <th>{elemento.datoEmpresa}</th>
                                    <td><Button color="primary" onClick={() => this.mostrarModalEditar(elemento)}>Editar</Button>{"  "}
                                        <Button color="danger" onClick={() => this.eliminar(elemento)}>Eliminar</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <br></br>

                    <br /><br />

                </Container>


                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div>
                            <h3>Insertar Curso</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>Id</label>
                            <input className="form-control" readOnly type="text" value={this.state.data.length + 1} />
                        </FormGroup>
                        <FormGroup>
                            <label>Programación</label>
                            <input className="form-control" name="programacion" type="text" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>tipo</label>
                            <input className="form-control" name="tipo" type="text" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>año</label>
                            <input className="form-control" name="year" type="text" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Dispositivos</label>
                            <select className="form-control" name="datoEmpresa" type="text" onChange={this.handleChange}>
                                <option value="1">Dispositivos1</option>
                                <option value="2">Dispositivos2</option>
                                <option value="3">Dispositivos3</option>
                                <option value="4">Dispositivos4</option>
                            </select>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="danger" onClick={() => this.ocultarModalInsertar()}>Cerrar</Button>
                        <Button variant="primary" onClick={() => this.insertar()} >Guardar</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader>
                        <div>
                            <h3>Editar Curso</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>Id</label>
                            <input className="form-control" readOnly type="text" value={this.state.form.id} />
                        </FormGroup>
                        <FormGroup>
                            <label>Programación</label>
                            <input className="form-control" name="programacion" type="text" onChange={this.handleChange} value={this.state.form.programacion} />
                        </FormGroup>
                        <FormGroup>
                            <label>tipo</label>
                            <input className="form-control" name="tipo" type="text" onChange={this.handleChange} value={this.state.form.tipo} />
                        </FormGroup>
                        <FormGroup>
                            <label>año</label>
                            <input className="form-control" name="year" type="text" onChange={this.handleChange} value={this.state.form.year} />
                        </FormGroup>
                        <FormGroup>
                            <label>Datos</label>
                            <select className="form-control" name="datoEmpresa" type="text" onChange={this.handleChange} value={this.state.form.datoEmpresa}>
                                <option value="1">Dispositivos1</option>
                                <option value="2">Dispositivos2</option>
                                <option value="3">Dispositivos3</option>
                                <option value="4">Dispositivos4</option>
                            </select>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="danger" onClick={() => this.ocultarModalEditar()}>Cerrar</Button>
                        <Button variant="primary" onClick={() => this.editar(this.state.form)} >Editar</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}


export default FormSunai;
