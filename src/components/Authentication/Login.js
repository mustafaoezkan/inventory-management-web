import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useLogin from '../../hooks/useLogin';
import { useNavigate, useLocation } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            Stok Takip Sistemi{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

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
            console.log(response);
            navigate(from, { replace: true });
        }).catch(err => {
            console.log(err);
        })
    };

    React.useEffect(() => {

    }, [username, password]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Giriş Yap
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="kullaniciAdi"
                            label="Kullanıcı Adı"
                            name="kullaaniciAdi"
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
                                <Link href="#" variant="body2">
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
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider >
    );
}