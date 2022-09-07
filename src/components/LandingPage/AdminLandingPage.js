import { Container, Grid, Paper, Slide } from '@mui/material'
import React from 'react'
import AssignedProductCount from './AssignedProductCount'
import LastAddedProducts from './LastAddedProducts'
import MostHaveProduct from './MostHaveProduct'
import ProductSummary from './ProductSummary'
import RegisteredUserCount from './RegisteredUserCount'

function AdminLandingPage() {
    return (
        <>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={4}>
                    <Slide in={true}>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper
                                sx={{
                                    backgroundColor: "#fef3bd",
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                    alignItems: "center",
                                }}
                            >
                                <ProductSummary />
                            </Paper>
                        </Grid>
                    </Slide>
                    <Slide in={true}>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper
                                sx={{
                                    backgroundColor: "#c4def6",
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <MostHaveProduct />
                            </Paper>
                        </Grid>
                    </Slide>
                    <Slide in={true}>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper
                                sx={{
                                    backgroundColor: "#c1e1c5",
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <RegisteredUserCount />
                            </Paper>
                        </Grid>
                    </Slide>
                    <Slide in={true}>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper
                                sx={{
                                    backgroundColor: "#eb9694",
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <AssignedProductCount />
                            </Paper>
                        </Grid>
                    </Slide>
                    <Slide direction='up' in={true}>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <LastAddedProducts />
                            </Paper>
                        </Grid>
                    </Slide>
                </Grid>
            </Container>
        </>
    )
}

export default AdminLandingPage