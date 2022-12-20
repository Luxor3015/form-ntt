import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, IconButton } from '@mui/material';
import { useState, useEffect } from 'react'
import { Modal } from '@mui/material';
import { Fab } from '@mui/material';
import { Box } from '@mui/material'
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';


export default function Orders() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const getProductos = async () => {
        const response = await fetch('http://localhost:3001/productos')
        const json = await response.json();
        const resultados = json
        setProductos(resultados);
    }

    let [productos, setProductos] = useState([]);


    useEffect(() => {
        getProductos();
    }, []);


    const [isOpen, setIsOpen] = useState(false);
    function handleOpen() { setIsOpen(true) };
    function handleClose() { setIsOpen(false) };

    let [productoEdit, setProductoEdit] = useState([]);

    const [isOpenUpdated, setIsOpenUpdated] = useState(false);
    function handleUpdate() { setIsOpenUpdated(true) };
    function handleCloseUpdated() { setIsOpenUpdated(false) };

    function openEdit(codigo) {
        productos.map((producto) => {
            if (producto.codigo === codigo) {
                return setProductoEdit(producto)
            }
            return {}
        })
        handleUpdate();
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <React.Fragment>
            <ButtonGroup sx={{ m: 2, alignSelf: 'end' }} aria-label="primary button group">
                <Fab onClick={handleOpen} variant="extended" color='primary' >
                    <AddIcon />
                    Nuevo Producto
                </Fab>
            </ButtonGroup>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">C&oacute;digo</TableCell>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Stock</TableCell>
                        <TableCell align="center">Precio Unitario</TableCell>
                        <TableCell align="center">Categor&iacute;a</TableCell>
                        <TableCell align="center">Unidad</TableCell>
                        <TableCell align='center'>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productos.map((row) => (
                        <TableRow key={productos.id_Productos}>
                            <TableCell align="center">{row.id_Productos}</TableCell>
                            <TableCell align="center">{row.nombre}</TableCell>
                            <TableCell align="center">{row.stock}</TableCell>
                            <TableCell align="center">{row.precio_U}</TableCell>
                            <TableCell align="center">{row.category_id}</TableCell>
                            <TableCell align="center">{row.unity_id}</TableCell>
                            <TableCell align="center">
                                <ButtonGroup aria-label=" primary button group">
                                    <IconButton color="success" variant="contained" onClick={() => openEdit(row.id_Productos)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="warning" variant="contained">
                                        <DeleteIcon />
                                    </IconButton>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Modal
                open={isOpen}
                onClose={handleClose}
                variant="solid"
            >
                <FormControl component="form" noValidate onSubmit={handleSubmit} sx={style}>
                    <Typography component="h1" variant="h5" my={2}>
                        Crear Nuevo Producto
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="id_Producto"
                                required
                                fullWidth
                                id="id_Producto"
                                label="ID"

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="nombre_Producto"
                                required
                                fullWidth
                                id="name_Producto"
                                label="Nombre Producto"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="stock"
                                label="Stock"
                                name="stock"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="precio_U"
                                label="Precio Unitario"
                                id="precio_U"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                required
                                fullWidth
                                name="category"
                                id="category"
                                label="Categoría"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                required
                                fullWidth
                                name="unidad"
                                id="unidad"
                                label="Unidad"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Stack direction='row'>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ m: 3 }}
                                color="success"
                                onClick={() => {
                                }}
                            >
                                Crear Nuevo Producto
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                sx={{ m: 3 }}
                                color="error"
                                onClick={() => {
                                    handleClose();
                                }}
                            >
                                Cancelar
                            </Button>
                        </Stack>
                    </Grid>
                </FormControl>
            </Modal>

            <Modal
                open={isOpenUpdated}
                onClose={handleCloseUpdated}
                variant="solid"
            >
                <FormControl component="form" noValidate onSubmit={handleUpdate} sx={style}>
                    <Typography component="h1" variant="h5" my={2}>
                        Editar Producto
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="id_Producto"
                                required
                                fullWidth
                                id="id_Producto"
                                label="ID"
                                defaultValue={productoEdit.id_Productos}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="nombre_Producto"
                                required
                                fullWidth
                                id="name_Producto"
                                label="Nombre Producto"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="stock"
                                label="Stock"
                                name="stock"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="precio_U"
                                label="Precio Unitario"
                                id="precio_U"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                required
                                fullWidth
                                name="category"
                                id="category"
                                label="Categoría"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                required
                                fullWidth
                                name="unidad"
                                id="unidad"
                                label="Unidad"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Stack direction='row'>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ m: 3 }}
                                color="success"
                                onClick={() => {
                                    alert('clicked');
                                }}
                            >
                                Crear Nuevo Producto
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                sx={{ m: 3 }}
                                color="error"
                                onClick={() => {
                                    handleCloseUpdated();
                                }}
                            >
                                Cancelar
                            </Button>
                        </Stack>
                    </Grid>
                </FormControl>
            </Modal>

        </React.Fragment>
    );
}