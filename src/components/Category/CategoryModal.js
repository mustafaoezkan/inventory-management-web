import { TextField, Typography, Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import useCategory from '../../hooks/useCategory';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CategoryModal({ mod, openModal, setOpenModal, id, name }) {
    const { postCategory, putCategory, deleteCategory } = useCategory();

    const [category_id, setCategory_id] = useState();
    const [category_name, setCategory_name] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        postCategory(category_name).then(res => {
            if (res.status === 201) {
                setCategory_name('');
                setOpenModal(false);
                toast("Kategori eklendi", {
                    type: "info",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            } else {
                toast("Kategori eklenemedi!", {
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
        putCategory(category_id, category_name).then(res => {
            if (res.status === 200) {
                setCategory_name('');
                setOpenModal(false);
                toast("Kategori güncellendi", {
                    type: "info",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            } else {
                toast("Kategori güncellenemedi!", {
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

    const handleDelete = (e) => {
        e.preventDefault();
        deleteCategory(category_id).then(res => {
            if (res.status === 200) {
                setCategory_id('');
                setOpenModal(false);
                toast("Kategori silindi", {
                    type: "info",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            } else {
                toast("Kategori silinemedi!", {
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

    useEffect(() => {
        if (mod === "edit") {
            setCategory_id(id);
            setCategory_name(name);
        } else if (mod === "add") {
            setCategory_id("");
            setCategory_name("");
        } else if (mod === "delete") {
            setCategory_id(id);
        }
    }, [id, name]);

    return (
        mod === "add" ? (
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
                                id="isim"
                                label="Kategori ismi"
                                name="isim"
                                autoComplete="isim"
                                type={"text"}
                                autoFocus
                                value={category_name}
                                onChange={(e) => setCategory_name(e.target.value)}
                                sx={{
                                    mr: 1,
                                }}
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
                                id="isim"
                                label="Kategori ismi"
                                name="isim"
                                autoComplete="isim"
                                type={"text"}
                                autoFocus
                                value={category_name}
                                onChange={(e) => setCategory_name(e.target.value)}
                                sx={{
                                    mr: 1,
                                }}
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
                        Kategoriyi silmek istediğinize emin misiniz? (Bu işlem geri alınamaz)
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

export default CategoryModal