import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useCategory from '../../hooks/useCategory'

function AssignedProductCount() {
    const { getAssignCategoriesCount } = useCategory();
    const [data, setData] = useState([]);
    const [assignedCount, setAssignedCount] = useState(0);
    const navigate = useNavigate();

    const seeProducts = (e) => {
        e.preventDefault();
        navigate("/urun")
    }

    useEffect(() => {
        getAssignCategoriesCount().then((res) => {
            setData(res.data);
        });
    }, []);

    useEffect(() => {
        setAssignedCount(data.reduce((a, b) => +a + +b.tahsis_edilmis_urun_sayisi, 0));
    }, [data, assignedCount]);

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
                <Typography component={"h2"} variant="h5" color="black" gutterBottom>Tahsis Edilmiş Ürün Sayısı</Typography>
                <Divider />
                <Box alignItems={"center"} justifyContent="center">
                    <Typography sx={{
                        fontFamily: "'Acme', sans-serif",
                        textAlign: "center",
                        margin: "1rem",
                        fontSize: "7rem",
                    }} align='center' component="p" variant="h1">
                        {assignedCount} <span style={{
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

export default AssignedProductCount