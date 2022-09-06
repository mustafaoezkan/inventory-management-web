import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Container } from '@mui/system';
import { TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import useProduct from '../../hooks/useProduct';
import useCategory from "../../hooks/useCategory";
import useAssignment from '../../hooks/useAssignment';
import {
    TwitterPicker
} from "react-color";

function ProductModal({ mod, id, seri_no, marka, modeli, boyut, renk, durum, aciklama, kategori_ismi, kategori_id, setOpenModal }) {
    const { postProduct, putProduct, deleteProduct } = useProduct();
    const { getCategories } = useCategory();
    const { postAssignment } = useAssignment();

    const [data, setData] = useState();
    const [product_id, setProduct_id] = useState();
    const [serial_number, setSerial_number] = useState();
    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [size, setSize] = useState();
    const [color, setColor] = useState("#000000");
    const [status, setStatus] = useState("Kullanım Dışı");
    const [description, setDescription] = useState();
    const [descForAssign, setDescForAssign] = useState();
    const [category_id, setCategory_id] = useState(1);
    const [assigned_person, setAssigned_person] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        postProduct(serial_number, brand, model, size, color, description, category_id).then(res => {
            if (res.status === 201) {
                setSerial_number('');
                setBrand('');
                setModel('');
                setSize('');
                setColor('');
                setStatus('');
                setDescription('');
                setCategory_id('');
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
        e.preventDefault();
        putProduct(product_id, serial_number, brand, model, size, color, status, description, category_id).then(res => {
            if (res.status === 200) {
                setSerial_number('');
                setBrand('');
                setModel('');
                setSize('');
                setColor('');
                setStatus('');
                setDescription('');
                setCategory_id('');
                setOpenModal(false);
                toast("Ürün güncellendi", {
                    type: "info",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            } else {
                toast("Ürün güncellenemdi!", {
                    type: "error",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        })
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleteProduct(product_id).then(res => {
            if (res.status === 204) {
                setSerial_number('');
                setBrand('');
                setModel('');
                setSize('');
                setColor('');
                setStatus('');
                setDescription('');
                setCategory_id('');
                setOpenModal(false);
                toast("Ürün silindi", {
                    type: "info",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            } else {
                toast("Ürün silinemedi!", {
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

    const handleAssignment = (e) => {
        e.preventDefault();
        postAssignment(product_id, assigned_person, descForAssign).then(res => {
            if (res.status === 201) {
                putProduct(product_id, serial_number, brand, model, size, color, "Tahsis edilmiş", description, category_id).then(res => {
                    if (res.status === 200) {
                        setSerial_number('');
                        setBrand('');
                        setModel('');
                        setSize('');
                        setColor('');
                        setStatus('');
                        setDescription('');
                        setCategory_id('');
                        setOpenModal(false);
                        toast(`Ürün ${assigned_person} kişisine tahsis edildi.`, {
                            type: "info",
                            position: "top-right",
                            autoClose: 3000,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        })
                        setDescForAssign('');
                        setAssigned_person('');
                    } else {
                        toast("Ürün atanamadı!", {
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
        }
        )
    }

    const handleChange = (e) => {
        setCategory_id(e.target.value)
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
            setCategory_id(kategori_id);
        } else if (mod === "add") {
            setProduct_id('');
            setSerial_number('');
            setBrand('');
            setModel('');
            setSize('');
            setColor('#000000');
            setStatus('');
            setDescription('');
            setCategory_id('');
        } else if (mod === "delete") {
            setProduct_id(id);
        } else if (mod === "assign") {
            setProduct_id(id);
            setSerial_number(seri_no);
            setBrand(marka);
            setModel(modeli);
            setSize(boyut);
            setColor(renk);
            setStatus(durum);
            setDescription(aciklama);
            setCategory_id(kategori_id);
        }
    }, [id, seri_no, marka, modeli, boyut, renk, durum, aciklama, kategori_ismi, kategori_id])

    return (
        mod === "add" ? (
            <>
                <>
                    <Container>
                        <Box component={"form"} onSubmit={handleSubmit} noValidate sx={{
                            mt: 1,
                        }}>
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
                            <TextField
                                margin="normal"
                                required
                                multiline
                                rows={3}
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
                                    mb: 2
                                }}
                            />
                            <TwitterPicker defaultValue={color} onChange={(e) => setColor(e.hex)}
                                colors={["#ff6900", "#fcb900", "#00d084", "#8ed1fc", "#0693e3", "#abb8c3", "#eb144c", "#f78da7", "#9900ef", "#000000", "#ffffff"]} triangle='hide' width='100%' />
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows={3}
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
                                mb: 2
                            }}
                        />
                        <TwitterPicker onChange={(e) => setColor(e.hex)}
                            colors={["#ff6900", "#fcb900", "#00d084", "#8ed1fc", "#0693e3", "#abb8c3", "#eb144c", "#f78da7", "#9900ef", "#000000", "#ffffff"]} triangle='hide' width='100%' />
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
        ) : mod === "delete" ? (
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
        ) : (
            <>
                <Container>
                    <Box component={"form"} onSubmit={handleAssignment} noValidate sx={{
                        mt: 1,
                    }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="tahsis_edilen_kisi"
                            label="Tahsis edilen kişi"
                            name="tahsis_edilen_kisi"
                            autoComplete="tahsis_edilen_kisi"
                            type={"text"}
                            autoFocus
                            value={assigned_person}
                            onChange={(e) => setAssigned_person(e.target.value)}
                            sx={{
                                mr: 1,
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows={3}
                            id="desForAssign"
                            label="Açıklama"
                            name="descForAssign"
                            autoComplete="descForAssign"
                            type={"text"}
                            autoFocus
                            value={descForAssign}
                            onChange={(e) => setDescForAssign(e.target.value)}
                            sx={{
                                mr: 1,
                                mb: 2
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Tahsis et
                        </Button>
                    </Box>
                </Container>
            </>
        )
    )
}

export default ProductModal