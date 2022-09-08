import { Box, Button, Container, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useRegistration from '../../hooks/useRegistration'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUsers from '../../hooks/useUsers';
import emailjs from "@emailjs/browser";
import LockResetIcon from '@mui/icons-material/LockReset';
import { Tooltip } from 'antd';

function UserModal({ mod, openModal, setOpenModal, userId, ad, soyad, eposta, telefon, sicil_no, unvan, yetki }) {
    const { registration } = useRegistration()
    const { putUser, deleteUser } = useUsers();

    const [id, setId] = React.useState();
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [surname, setSurname] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [number, setNumber] = React.useState('')
    const [registrationNumber, setRegistrationNumber] = React.useState('')
    const [degree, setDegree] = React.useState('')
    const [authentication, setAuthentication] = React.useState('')

    const generatePassword = () => {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        registration(username, password, name, surname, email, number, registrationNumber, degree, authentication).then(res => {
            if (res.status === 201) {
                emailjs.sendForm("service_bcw6jsn", "template_wfjzbh3", e.target, "Uu3D_NsCtJuSlIPmW")
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    })
                setUsername('')
                setPassword('')
                setName('')
                setSurname('')
                setEmail('')
                setNumber('')
                setRegistrationNumber('')
                setDegree('')
                setAuthentication('')
                setOpenModal(false)
                toast("Kullanıcı eklendi", {
                    type: "info",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast("Kullanıcı eklenemedi!", {
                    type: "error",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        putUser(id, name, surname, email, number, registrationNumber, degree, authentication).then(res => {
            if (res.status === 200) {
                setName('')
                setSurname('')
                setEmail('')
                setNumber('')
                setRegistrationNumber('')
                setDegree('')
                setAuthentication('')
                setOpenModal(false)
                toast("Kullanıcı güncellendi", {
                    type: "info",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast("Kullanıcı güncellenemedi!", {
                    type: "error",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleteUser(id).then(res => {
            if (res.status === 200) {
                setName('')
                setSurname('')
                setEmail('')
                setNumber('')
                setRegistrationNumber('')
                setDegree('')
                setAuthentication('')
                setOpenModal(false)
                toast("Kullanıcı silindi", {
                    type: "info",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast("Kullanıcı silinemedi!", {
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

    const handleChange = (e) => {
        setAuthentication(e.target.value)
    };

    useEffect(() => {
        if (mod === "edit") {
            setId(userId)
            setName(ad)
            setSurname(soyad)
            setEmail(eposta)
            setNumber(telefon)
            setRegistrationNumber(sicil_no)
            setDegree(unvan)
            setAuthentication(yetki)
        } else if (mod === "add") {
            setName('')
            setSurname('')
            setEmail('')
            setNumber('')
            setRegistrationNumber('')
            setDegree('')
            setAuthentication('')
        } else if (mod === "delete") {
            setId(userId);
        }
    }, [userId, ad, soyad, eposta, telefon, sicil_no, unvan, yetki]);

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
                                id="kullaniciAdi"
                                label="Kullanıcı Adı"
                                name="kullaniciAdi"
                                autoComplete="kullaniciAdi"
                                type={"text"}
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{
                                    mr: 1,
                                }}
                            />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%'
                            }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="sifre"
                                    label="Şifre"
                                    name="sifre"
                                    autoComplete="sifre"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Tooltip title="Otomatik şifre üret" >
                                    <IconButton sx={{
                                        mt: 1.5,
                                    }} onClick={() => {
                                        setPassword(generatePassword());
                                    }}>
                                        <LockResetIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>

                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="isim"
                                label="Ad"
                                name="ad"
                                autoComplete="ad"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={{
                                    mr: 1,
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="soyad"
                                label="Soyad"
                                name="soyad"
                                autoComplete="soyad"
                                type="text"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
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
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    mr: 1,
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="telefon"
                                label="Telefon"
                                name="telefon"
                                autoComplete="telefon"
                                type="tel"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
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
                                id="sicil_no"
                                label="Sicil No"
                                name="sicil_no"
                                autoComplete="sicil_no"
                                type="number"
                                value={registrationNumber}
                                onChange={(e) => setRegistrationNumber(e.target.value)}
                                sx={{
                                    mr: 1,
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="unvan"
                                label="Ünvan"
                                name="unvan"
                                autoComplete="unvan"
                                type="text"
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                            />
                        </Box>

                        <FormControl sx={{
                            mt: 2,
                        }} fullWidth>
                            <InputLabel id="demo-simple-select-label">Yetki</InputLabel>
                            <Select
                                value={authentication}
                                label="Yetki"
                                onChange={handleChange}
                            >
                                <MenuItem value={"Admin"}>Admin</MenuItem>
                                <MenuItem value={"Kullanıcı"}>Kullanıcı</MenuItem>
                            </Select>
                        </FormControl>
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
                            flexDirection: 'row'
                        }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="isim"
                                label="Ad"
                                name="ad"
                                autoComplete="ad"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={{
                                    mr: 1,
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="soyad"
                                label="Soyad"
                                name="soyad"
                                autoComplete="soyad"
                                type="text"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
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
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    mr: 1,
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="telefon"
                                label="Telefon"
                                name="telefon"
                                autoComplete="telefon"
                                type="tel"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
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
                                id="sicil_no"
                                label="Sicil No"
                                name="sicil_no"
                                autoComplete="sicil_no"
                                type="number"
                                value={registrationNumber}
                                onChange={(e) => setRegistrationNumber(e.target.value)}
                                sx={{
                                    mr: 1,
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="unvan"
                                label="Ünvan"
                                name="unvan"
                                autoComplete="unvan"
                                type="text"
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                            />
                        </Box>

                        <FormControl sx={{
                            mt: 2,
                        }} fullWidth>
                            <InputLabel id="demo-simple-select-label">Yetki</InputLabel>
                            <Select
                                value={authentication}
                                label="Yetki"
                                onChange={handleChange}
                            >
                                <MenuItem value={"Admin"}>Admin</MenuItem>
                                <MenuItem value={"Kullanıcı"}>Kullanıcı</MenuItem>
                            </Select>
                        </FormControl>
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
                        Kullanıcıyı silmek istediğinize emin misiniz? (Bu işlem geri alınamaz)
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

export default UserModal