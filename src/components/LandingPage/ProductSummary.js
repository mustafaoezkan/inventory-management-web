import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useProduct from '../../hooks/useProduct'

function ProductSummary() {
    const { getProducts } = useProduct();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const seeProducts = (e) => {
        e.preventDefault();
        navigate("/urun")
    }

    useEffect(() => {
        getProducts().then((res) => {
            setData(res.data);
        });
    }, []);

    useEffect(() => { }, [data]);

    return (
        <>
            <Box onClick={(e) => {
                seeProducts(e);
            }} sx={{
                ":hover": {
                    cursor: "pointer",
                    scale: "1.05",
                    transition: "all 0.3s ease-in-out",
                }
            }}>
                <Typography component={"h2"} variant="h5" color="black" gutterBottom>Sisteme Kayıtlı Ürün   Sayısı</Typography>
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
                        }}>Ürün</span>
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default ProductSummary