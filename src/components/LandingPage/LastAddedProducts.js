import { Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useProduct from "../../hooks/useProduct";

function LastAddedProducts() {
    const { getProducts } = useProduct();
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    useEffect(() => {
        getProducts().then((res) => {
            setData(res.data);
        });
    }, []);

    useEffect(() => { }, [data]);

    const seeAllProducts = (e) => {
        e.preventDefault();
        navigate("/urun")
    }

    return (
        <>
            <Typography component={"h2"} variant="h6" color="primary" gutterBottom>Son Eklenen Ürünler</Typography>
            <Table size="small" sx={{
                "& td": {
                    padding: "0.5rem",
                },
                "& th": {
                    padding: "0.5rem",
                },
            }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{
                            fontWeight: "bold",
                            width: "40%",
                        }}>Marka</TableCell>
                        <TableCell sx={{
                            fontWeight: "bold",
                            width: "40%"
                        }}>Kategori</TableCell>
                        <TableCell sx={{
                            fontWeight: "bold",
                            width: "20%"
                        }}>Renk</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.sort(function (a, b) {
                            return b.id - a.id;
                        }).slice(0, 4).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell >{row.marka}</TableCell>
                                <TableCell >{row.kategori_ismi}</TableCell>
                                <TableCell>
                                    <Tag color={row.renk} key={row.renk}>
                                        {row.renk}
                                    </Tag>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <Link color="primary" href="/urun" onClick={seeAllProducts} sx={{ mt: 3 }}>
                Tüm Ürünleri Gör
            </Link>
        </>
    )
}

export default LastAddedProducts