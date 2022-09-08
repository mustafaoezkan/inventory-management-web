import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useLogin from '../../hooks/useLogin';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://bidb.erciyes.edu.tr/">
                Erciyes Üniversitesi Bilgi İşlem Daire Başkanlığı
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignIn() {

    const { login } = useLogin();
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        login(username, password).then(response => {
            if (response.status === 200) {
                navigate(from, { replace: true });
                toast("Başarı ile giriş yapıldı!", {
                    type: "success",
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast("Giriş yapılamadı!", {
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

    React.useEffect(() => {

    }, [username, password]);

    return (
        <Container component="main" maxWidth="xs"  >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* <LockOutlinedIcon /> */}
                <img
                    src="https://i.hizliresim.com/2mlhjih.png"
                    alt="Erciyes Üniversitesi"
                    style={{
                        width: "200px",
                        height: "auto",
                    }}
                />
                <Typography sx={{ mt: 2 }} component="h1" variant="h5">
                    Giriş Yap
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="kullaniciAdi"
                        label="Kullanıcı Adı"
                        name="kullaniciAdi"
                        autoComplete="kullaniciAdi"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="sifre"
                        label="Şifre"
                        type="password"
                        id="sifre"
                        autoComplete="sifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Grid container alignItems={"baseline"} style={{
                        justifyContent: 'space-between',
                    }} >
                        <Grid>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Beni Hatırla"
                            />
                        </Grid>
                        <Grid >
                            <Link href="/sifremi-unuttum" variant="body2">
                                Şifremi unuttum
                            </Link>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Giriş Yap
                    </Button>
                </Box>
            </Box>
            <Copyright sx={{ mt: 2, mb: 1 }} />
        </Container>
    );
}