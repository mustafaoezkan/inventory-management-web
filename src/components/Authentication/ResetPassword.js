import { Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import useResetPassword from '../../hooks/useResetPassword'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const { forgotPassword } = useResetPassword();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const kullanici_adi = e.target.kullanici_adi.value
        forgotPassword(email, kullanici_adi).then((res) => {
            if (res.status === 200) {
                toast("Şifreniz e-posta adresinize gönderildi.", {
                    type: "success",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
                setTimeout(() => {
                    navigate("/giris")
                }, 3000)
            } else {
                console.log(res)
                toast(`${res.data}`, {
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

    return (
        <Container maxWidth="lg" sx={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            height: '100vh',
        }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4} lg={12}>
                    <Paper
                        sx={{
                            backgroundColor: "white",
                            display: "flex",
                            height: 680,
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                    >
                        <Grid
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                height: 680,
                                width: "100%"
                            }}
                        >
                            <Grid item sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "center",
                                margin: 6,
                                width: "100%"

                            }}>
                                <img src='https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5488.jpg?w=826&t=st=1662622232~exp=1662622832~hmac=0e3a350792195ee92b93862209133fc5c23e92bc9490ab0f93d22a3f0fc6f02b' alt='forgot-password' width="400" height="400" />

                            </Grid>
                            <Divider orientation='vertical' />
                            <Grid item xs={12} md={4} lg={12} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: "center",
                                justifyContent: "center",
                                margin: 10,
                            }}
                            >
                                <Container sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: 10,
                                }}>
                                    <Typography variant="h4" component="div" gutterBottom sx={{
                                        fontWeight: "bold",
                                        mb: 3,
                                        color: "#1890ff",
                                        textAlign: "center",
                                    }}>
                                        Şifremi Unuttum
                                    </Typography>
                                    <Box component={"form"} noValidate sx={{
                                        mt: 1,
                                    }} onSubmit={handleSubmit}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Adresi"
                                            name="email"
                                            autoComplete="email"
                                            type="email"
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="kullanici_adi"
                                            label="Kullanıcı Adı"
                                            name="kullanici_adi"
                                            autoComplete="kullanici_adi"
                                            type="text"
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2, backgroundColor: "#1890ff" }}
                                        >
                                            Gönder
                                        </Button>
                                    </Box>
                                </Container>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ResetPassword