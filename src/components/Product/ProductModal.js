import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Container } from '@mui/system';
import { TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import useProduct from '../../hooks/useProduct';
import useCategory from "../../hooks/useCategory";

function ProductModal({ mod, id, seri_no, marka, modeli, boyut, renk, durum, aciklama, kategori_ismi, setOpenModal }) {
    const { postProduct, putProduct, deleteProduct } = useProduct();
    const { getCategories } = useCategory();

    const [data, setData] = useState();
    const [product_id, setProduct_id] = useState();
    const [serial_number, setSerial_number] = useState();
    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [size, setSize] = useState();
    const [color, setColor] = useState();
    const [status, setStatus] = useState();
    const [description, setDescription] = useState();
    const [category_name, setCategory_name] = useState();
    const [category_id, setCategory_id] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        postProduct(serial_number, brand, model, size, color, status, description, category_name).then(res => {
            if (res.status === 201) {
                setSerial_number('');
                setBrand('');
                setModel('');
                setSize('');
                setColor('');
                setStatus('');
                setDescription('');
                setCategory_name('');
                setOpenModal(false);
                toast("Ürün eklendi", {
                    type: "info",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            } else {
                toast("Ürün eklenemedi!", {
                    type: "error",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        })
    }

    const handleUpdate = (e) => {

    }

    const handleDelete = (e) => {

    }

    const handleChange = (e) => {
        setCategory_id(e.target.value)
        console.log(category_id);
    };

    useEffect(() => {
        getCategories().then(res => {
            setData(res.data);
        })
    }, []);

    useEffect(() => {

    }, [data, category_id]);

    useEffect(() => {
        if (mod === "edit") {
            setProduct_id(id);
            setSerial_number(seri_no);
            setBrand(marka);
            setModel(modeli);
            setSize(boyut);
            setColor(renk);
            setStatus(durum);
            setDescription(aciklama);
            setCategory_name(kategori_ismi);
        } else if (mod === "add") {
            setProduct_id('');
            setSerial_number('');
            setBrand('');
            setModel('');
            setSize('');
            setColor('');
            setStatus('');
            setDescription('');
            setCategory_name('');
        } else if (mod === "delete") {
            setProduct_id(id);
        }
    }, [id, seri_no, marka, modeli, boyut, renk, durum, aciklama, kategori_ismi])

    return (
        mod === "add" ? (
            <>
                <>
                    <Container>
                        <Box component={"form"} onSubmit={handleSubmit} noValidate sx={{
                            mt: 1,
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="seri_no"
                                    label="Seri No"
                                    name="seri_no"
                                    autoComplete="seri_no"
                                    type={"text"}
                                    autoFocus
                                    value={serial_number}
                                    onChange={(e) => setSerial_number(e.target.value)}
                                    sx={{
                                        mr: 1,
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="marka"
                                    label="Marka"
                                    name="marka"
                                    autoComplete="marka"
                                    type={"text"}
                                    autoFocus
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="model"
                                    label="Model"
                                    name="model"
                                    autoComplete="model"
                                    type={"text"}
                                    autoFocus
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                    sx={{
                                        mr: 1,
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="boyut"
                                    label="Boyut"
                                    name="boyut"
                                    autoComplete="boyut"
                                    type={"text"}
                                    autoFocus
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="renk"
                                    label="Renk"
                                    name="renk"
                                    autoComplete="renk"
                                    type={"text"}
                                    autoFocus
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    sx={{
                                        mr: 1,
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="durum"
                                    label="Durum"
                                    name="durum"
                                    autoComplete="durum"
                                    type={"text"}
                                    autoFocus
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="aciklama"
                                    label="Açıklama"
                                    name="aciklama"
                                    autoComplete="aciklama"
                                    type={"text"}
                                    autoFocus
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    sx={{
                                        mr: 1,
                                    }}
                                />
                                <FormControl sx={{
                                    mt: 2,
                                }} fullWidth>
                                    <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                                    <Select
                                        defaultValue={category_id}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category_id}
                                        label="Kategori"
                                        onChange={handleChange}
                                    >
                                        {data && data.map((item, index) => {
                                            return (
                                                <MenuItem value={item.id}>{item.isim}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Kaydet
                            </Button>
                        </Box>
                    </Container>
                </>
            </>
        ) : mod === "edit" ? (
            <>
                <Container>
                    <Box component={"form"} onSubmit={handleUpdate} noValidate sx={{
                        mt: 1,
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="seri_no"
                                label="Seri No"
                                name="seri_no"
                                autoComplete="seri_no"
                                type={"text"}
                                autoFocus
                                value={serial_number}
                                onChange={(e) => setSerial_number(e.target.value)}
                                sx={{
                                    mr: 1,
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="marka"
                                label="Marka"
                                name="marka"
                                autoComplete="marka"
                                type={"text"}
                                autoFocus
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="model"
                                label="Model"
                                name="model"
                                autoComplete="model"
                                type={"text"}
                                autoFocus
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                sx={{
                                    mr: 1,
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="boyut"
                                label="Boyut"
                                name="boyut"
                                autoComplete="boyut"
                                type={"text"}
                                autoFocus
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="renk"
                                label="Renk"
                                name="renk"
                                autoComplete="renk"
                                type={"text"}
                                autoFocus
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                sx={{
                                    mr: 1,
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="durum"
                                label="Durum"
                                name="durum"
                                autoComplete="durum"
                                type={"text"}
                                autoFocus
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="aciklama"
                                label="Açıklama"
                                name="aciklama"
                                autoComplete="aciklama"
                                type={"text"}
                                autoFocus
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                sx={{
                                    mr: 1,
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="kategori_ismi"
                                label="Kategori İsmi"
                                name="kategori_ismi"
                                autoComplete="kategori_ismi"
                                type={"text"}
                                autoFocus
                                value={category_name}
                                onChange={(e) => setCategory_name(e.target.value)}
                            />
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Kaydet
                        </Button>
                    </Box>
                </Container>
            </>
        ) : (
            <>
                <Container>
                    <Typography variant="h6" gutterBottom>
                        Ürünü silmek istediğinize emin misiniz? (Bu işlem geri alınamaz)
                    </Typography>
                    <Box style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Button
                            style={{
                                marginRight: '1rem',
                            }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleDelete}
                        >
                            Evet
                        </Button>
                        <Button type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => {
                                setOpenModal(false);
                            }}>
                            Hayır
                        </Button>
                    </Box>
                </Container>
            </>
        )
    )
}

export default ProductModal