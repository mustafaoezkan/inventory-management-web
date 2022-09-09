import { Container, Grid, Paper, Typography, Divider, Button, TextField, Grow } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import useResetPassword from '../../hooks/useResetPassword'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profil() {
    const { resetPassword } = useResetPassword();
    const [pw1, setPw1] = React.useState("");
    const [pw2, setPw2] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pw1 === pw2) {
            resetPassword(JSON.parse(localStorage.getItem("info"))[0].id, pw1, JSON.parse(localStorage.getItem("info"))[0].email);
            toast("Şifre güncellendi", {
                type: "info",
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setPw1("");
            setPw2("");
        } else {
            toast("Şifreler uyuşmuyor", {
                type: "error",
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }

    useEffect(() => { }, [pw1, pw2]);

    return (
        <Grow in={true}>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4} lg={12}>
                        <Paper
                            sx={{
                                backgroundColor: "white",
                                display: 'flex',
                                height: 680,
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            <Grid sx={{
                                display: 'flex',
                                height: 680,
                                flexDirection: "row",
                                width: "40%",
                                background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)",
                            }}  >
                                <Grid item sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: "center",
                                    ml: 15

                                }}   >
                                    <Grid sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mb: 3
                                    }}>
                                        <img style={{
                                            borderRadius: "50%",
                                            border: "1px solid #000000",
                                        }} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profil" width="180" height="180" />
                                    </Grid>
                                    <Divider sx={{
                                        height: "1px",
                                        backgroundColor: "white",
                                    }} />
                                    <Grid sx={{
                                        mt: 3
                                    }}>
                                        <Typography variant="h6" component="div" gutterBottom sx={{
                                            color: "white",
                                            fontStyle: "italic",
                                        }}>
                                            <span style={{
                                                fontStyle: "normal",
                                                fontWeight: "bold",
                                            }}>Sicil No:</span> {JSON.parse(localStorage.getItem("info"))[0].sicil_no}
                                        </Typography>
                                        <Typography variant="h6" component="div" gutterBottom sx={{
                                            fontStyle: "italic",
                                            color: "white",
                                        }}>
                                            <span style={{
                                                fontStyle: "normal",
                                                fontWeight: "bold",
                                            }}>Ad:</span> {JSON.parse(localStorage.getItem("info"))[0].ad}
                                        </Typography>
                                        <Typography variant="h6" component="div" gutterBottom sx={{
                                            fontStyle: "italic",
                                            color: "white",
                                        }}>
                                            <span style={{
                                                fontStyle: "normal",
                                                fontWeight: "bold",
                                            }}>Soyad:</span> {JSON.parse(localStorage.getItem("info"))[0].soyad}
                                        </Typography>
                                        <Typography variant="h6" component="div" gutterBottom sx={{
                                            fontStyle: "italic",
                                            color: "white",
                                        }}>
                                            <span style={{
                                                fontStyle: "normal",
                                                fontWeight: "bold",
                                            }}>Email:</span> {JSON.parse(localStorage.getItem("info"))[0].email}
                                        </Typography>
                                        <Typography variant="h6" component="div" gutterBottom sx={{
                                            fontStyle: "italic",
                                            color: "white",
                                        }}>
                                            <span style={{
                                                fontStyle: "normal",
                                                fontWeight: "bold",
                                            }}>Telefon:</span> {JSON.parse(localStorage.getItem("info"))[0].telefon}
                                        </Typography>
                                        <Typography variant="h6" component="div" gutterBottom sx={{
                                            fontStyle: "italic",
                                            color: "white",
                                        }}>
                                            <span style={{
                                                fontStyle: "normal",
                                                fontWeight: "bold",
                                            }}>Ünvan:</span> {JSON.parse(localStorage.getItem("info"))[0].unvan}
                                        </Typography>
                                        <Typography variant="h6" component="div" gutterBottom sx={{
                                            fontStyle: "italic",
                                            color: "white",
                                        }}>
                                            <span style={{
                                                fontStyle: "normal",
                                                fontWeight: "bold",
                                            }}>Yetki:</span> {JSON.parse(localStorage.getItem("info"))[0].yetki}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider orientation='vertical' />
                            <Grid item sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: "center",
                                justifyContent: "center",
                                ml: 19

                            }}>
                                <Container>
                                    <Typography variant="h4" component="div" gutterBottom sx={{
                                        fontWeight: "bold",
                                        mb: 3,
                                        color: "#1890ff",
                                        textAlign: "center",

                                    }}>
                                        Şifre Değişikliği Yap
                                    </Typography>
                                    <Box component={"form"} noValidate sx={{
                                        mt: 1,
                                    }} onSubmit={handleSubmit}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="sifre1"
                                            label="Şifre"
                                            name="sifre1"
                                            autoComplete="sifre1"
                                            type="password"
                                            value={pw1}
                                            onChange={(e) => setPw1(e.target.value)}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="sifre2"
                                            label="Şifre Tekrar"
                                            name="sifre2"
                                            autoComplete="sifre2"
                                            type="password"
                                            value={pw2}
                                            onChange={(e) => setPw2(e.target.value)}
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2, backgroundColor: "#1890ff" }}
                                        >
                                            Kaydet
                                        </Button>
                                    </Box>
                                </Container>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Profil