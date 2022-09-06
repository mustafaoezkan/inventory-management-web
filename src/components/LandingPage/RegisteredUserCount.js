import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useUsers from '../../hooks/useUsers';

function RegisteredUserCount() {
    const { getUsers } = useUsers();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const seeUsers = (e) => {
        e.preventDefault();
        navigate("/kullanici")
    }

    useEffect(() => {
        getUsers().then((res) => {
            setData(res.data);
        });
    }, []);

    useEffect(() => { }, [data]);

    return (
        <>
            <Box onClick={(e) => {
                seeUsers(e);
            }} sx={{
                ":hover": {
                    cursor: "pointer",
                    scale: "1.05",
                    transition: "all 0.3s ease-in-out",
                }
            }}>
                <Typography component={"h2"} variant="h5" color="black" gutterBottom>Sisteme Kayıtlı Kullanıcı Sayısı</Typography>
                <Divider />
                <Box alignItems={"center"} justifyContent="center">
                    <Typography sx={{
                        fontFamily: "'Acme', sans-serif",
                        textAlign: "center",
                        margin: "1rem",
                        fontSize: "7rem",
                    }} align='center' component="p" variant="h1">
                        {data.length} <span style={{
                            fontFamily: "'Poppins',sans-serif",
                            fontSize: "1.5rem",
                            color: "gray",
                        }}>Kişi</span>
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default RegisteredUserCount