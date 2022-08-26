import { Box, Button, Card, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import useRegistration from '../../hooks/useRegistration'

function Register() {
    const { registration } = useRegistration()

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [surname, setSurname] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [number, setNumber] = React.useState('')
    const [registrationNumber, setRegistrationNumber] = React.useState('')
    const [degree, setDegree] = React.useState('')
    const [authentication, setAuthentication] = React.useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        registration(username, password, name, surname, email, number, registrationNumber, degree, authentication).then(res => {
            console.log(res)
            setUsername('')
            setPassword('')
            setName('')
            setSurname('')
            setEmail('')
            setNumber('')
            setRegistrationNumber('')
            setDegree('')
            setAuthentication('')
        }).catch(err => {
            console.log(err)
        })
    };

    const handleChange = (e) => {
        setAuthentication(e.target.value)
    };

    return (
        <Container>
            <Card sx={{
                p: 3,
                mx: 'auto',
                maxWidth: '600px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant="h5">Kullanıcı Kaydı</Typography>
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
                            <MenuItem value={"Kullanici"}>Kullanıcı</MenuItem>
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
            </Card>
        </Container>
    )
}

export default Register