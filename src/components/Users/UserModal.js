import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, IconButton, InputLabel, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useRegistration from '../../hooks/useRegistration'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUsers from '../../hooks/useUsers';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Tooltip } from 'antd';

function UserModal({ mod, openModal, setOpenModal, userId, ad, soyad, eposta, telefon, sicil_no, unvan, yetki, yetki0, yetki1, yetki2 }) {
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
    const [categoryAuth, setCategoryAuth] = React.useState(false)
    const [productAuth, setProductAuth] = React.useState(false)
    const [userAuth, setUserAuth] = React.useState(false)
    const [submitBtn, setSubmitBtn] = React.useState(false)

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
                setSubmitBtn(false)
                setUserAuth(false)
                setCategoryAuth(false)
                setProductAuth(false)
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
                toast("Kullan??c?? eklendi", {
                    type: "info",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast("Kullan??c?? eklenemedi!", {
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
                setSubmitBtn(false)
                setUserAuth(false)
                setCategoryAuth(false)
                setProductAuth(false)
                setName('')
                setSurname('')
                setEmail('')
                setNumber('')
                setRegistrationNumber('')
                setDegree('')
                setAuthentication('')
                setOpenModal(false)
                toast("Kullan??c?? g??ncellendi", {
                    type: "info",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast("Kullan??c?? g??ncellenemedi!", {
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
                toast("Kullan??c?? silindi", {
                    type: "info",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast("Kullan??c?? silinemedi!", {
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
        e.preventDefault();
        if (categoryAuth === true && productAuth === true && userAuth === true) {
            setAuthentication("111")
        } else if (categoryAuth === true && productAuth === true && userAuth === false) {
            setAuthentication("110")
        } else if (categoryAuth === true && productAuth === false && userAuth === true) {
            setAuthentication("101")
        } else if (categoryAuth === true && productAuth === false && userAuth === false) {
            setAuthentication("100")
        } else if (categoryAuth === false && productAuth === true && userAuth === true) {
            setAuthentication("011")
        } else if (categoryAuth === false && productAuth === true && userAuth === false) {
            setAuthentication("010")
        } else if (categoryAuth === false && productAuth === false && userAuth === true) {
            setAuthentication("001")
        } else if (categoryAuth === false && productAuth === false && userAuth === false) {
            setAuthentication("000")
        }
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
            setCategoryAuth(yetki0);
            setProductAuth(yetki1);
            setUserAuth(yetki2);
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

    useEffect(() => { }, [authentication, categoryAuth, productAuth, userAuth, submitBtn, yetki])

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
                                label="Kullan??c?? Ad??"
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
                                    label="??ifre"
                                    name="sifre"
                                    autoComplete="sifre"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Tooltip title="Otomatik ??ifre ??ret" >
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
                                label="??nvan"
                                name="unvan"
                                autoComplete="unvan"
                                type="text"
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                            />
                        </Box>
                        <InputLabel id="demo-simple-select-label">Yetki</InputLabel>
                        <FormControl sx={{
                            mt: 2,
                            display: 'flex',
                            flexDirection: 'row',
                        }} fullWidth onChange={(e) => {
                            handleChange(e)
                        }}>

                            <FormControlLabel sx={{
                                ml: 1,
                            }} value={categoryAuth} control={<Checkbox defaultChecked={yetki0 ? yetki0 : false} />} label="Kategori" onChange={(e) => {
                                setCategoryAuth(e.target.checked)
                            }} />
                            <FormControlLabel sx={{
                                ml: 1,
                            }} value={productAuth} control={<Checkbox defaultChecked={yetki1 ? yetki1 : false} />} label="??r??n" onChange={(e) => {
                                setProductAuth(e.target.checked)
                            }} />
                            <FormControlLabel sx={{
                                ml: 1,
                            }} value={userAuth} control={<Checkbox defaultChecked={yetki2 ? yetki2 : false} />} label="Kullan??c??" onChange={(e) => {
                                setUserAuth(e.target.checked)
                            }} />
                            <Button sx={{
                                ml: 1,
                            }} variant="contained" disabled={submitBtn} onClick={(e) => {
                                setSubmitBtn(true)
                                handleChange(e)
                            }}>Ekle</Button>
                        </FormControl>
                        <Button
                            disabled={!submitBtn}
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
                                label="??nvan"
                                name="unvan"
                                autoComplete="unvan"
                                type="text"
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                            />
                        </Box>
                        <InputLabel id="demo-simple-select-label">Yetki</InputLabel>
                        <FormControl sx={{
                            mt: 2,
                            display: 'flex',
                            flexDirection: 'row',
                        }} fullWidth onChange={(e) => {
                            handleChange(e)
                        }}>

                            <FormControlLabel sx={{
                                ml: 1,
                            }} value={categoryAuth} control={<Checkbox defaultChecked={yetki0} />} label="Kategori" onChange={(e) => {
                                setCategoryAuth(e.target.checked)
                            }} />
                            <FormControlLabel sx={{
                                ml: 1,
                            }} value={productAuth} control={<Checkbox defaultChecked={yetki1} />} label="??r??n" onChange={(e) => {
                                setProductAuth(e.target.checked)
                            }} />
                            <FormControlLabel sx={{
                                ml: 1,
                            }} value={userAuth} control={<Checkbox defaultChecked={yetki2} />} label="Kullan??c??" onChange={(e) => {
                                setUserAuth(e.target.checked)
                            }} />
                            <Button sx={{
                                ml: 1,
                            }} variant="contained" disabled={submitBtn} onClick={(e) => {
                                setSubmitBtn(true)
                                handleChange(e)
                            }}>Ekle</Button>
                        </FormControl>
                        <Button
                            disabled={!submitBtn}
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
                        Kullan??c??y?? silmek istedi??inize emin misiniz? (Bu i??lem geri al??namaz)
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
                            Hay??r
                        </Button>
                    </Box>

                </Container>
            </>
        )
    )
}

export default UserModal