import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useCategory from '../../hooks/useCategory'

function MostHaveProduct() {
    const { getCategoriesHaveProduct } = useCategory();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [maxValue, setMaxValue] = useState(0);
    const [maxCategory, setMaxCategory] = useState("");

    const seeCategories = (e) => {
        e.preventDefault();
        navigate("/kategori")
    }

    useEffect(() => {
        getCategoriesHaveProduct().then((res) => {
            setData(res.data);
            console.log(res.data);
            setMaxValue(Math.max(...res.data.map((item) => item.urun_sayisi)));
        });
    }, [])

    useEffect(() => {
        setMaxCategory(data.find((item) => parseInt(item.urun_sayisi) === maxValue)?.isim);
    }, [data, maxValue, maxCategory])

    return (
        <>
            <Box
                onClick={(e) => {
                    seeCategories(e);
                }} sx={{
                    ":hover": {
                        cursor: "pointer",
                        scale: "1.05",
                        transition: "all 0.3s ease-in-out",
                    }
                }}>
                <Typography component="h2" variant="h5" color="black" gutterBottom >En Çok Ürüne Sahip Kategori</Typography>
                <Divider />
                <Box alignItems="center" justifyContent="center">
                    <Typography sx={{
                        fontFamily: "'Acme', sans-serif",
                        textAlign: "center",
                        margin: "1rem",
                        fontSize: "7rem",
                    }} align='center' component="p" variant="h1">
                        {maxValue} <span style={{
                            fontFamily: "'Poppins',sans-serif",
                            fontSize: "1.5rem",
                            color: "gray",
                        }}>{maxCategory}</span>
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default MostHaveProduct