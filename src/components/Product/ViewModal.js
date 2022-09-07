import { Fab, Grid, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system'
import { Modal, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import useAssignment from '../../hooks/useAssignment'
import useProduct from '../../hooks/useProduct';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewModal({ id, seri_no, marka, modeli, boyut, renk, durum, aciklama, kategori_ismi, kategori_id, openViewModal, setOpenViewModal }) {
    const { getAssignments, deleteAssignment } = useAssignment();
    const { putProduct } = useProduct();

    const [data, setData] = useState([]);
    const [date, setDate] = useState();
    const [dateForDiff, setDateForDiff] = useState();
    const [nowDate, setNowDate] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isYesNoModal, setIsYesNoModal] = useState(false);

    const dateConverter = (startDate, timeEnd) => {
        const newStartDate = new Date(startDate);
        const newEndDate = new Date(timeEnd);
        let result = moment(newStartDate).diff(newEndDate, 'days')
        return result
    };

    const removeAssign = (e) => {
        e.preventDefault();
        let assingId = data?.filter((item) => item.urun_id === id).map((item) => item.id);
        let result = parseInt(assingId);

        deleteAssignment(result).then((res) => {
            if (res.status === 200) {
                putProduct(id, seri_no, marka, modeli, boyut, renk, "Tahsis edilmemiş", aciklama, kategori_id).then((res) => {
                    if (res.status === 200) {
                        setOpenViewModal(false);
                        toast("Tahsis kaldırıldı", {
                            type: "info",
                            position: "top-right",
                            autoClose: 3000,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        })
                    } else {
                        setOpenViewModal(false);
                        toast("Tahsis kaldırılamadı", {
                            type: "error",
                            position: "top-right",
                            autoClose: 3000,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        })
                    }
                })
            }
        })
    }

    useEffect(() => {
        getAssignments().then((res) => {
            setData(res.data);
        });
    }, []);


    useEffect(() => {
        let date = data?.filter((item) => item.urun_id === id).map((item) => item.tahsis_tarihi);
        date = date.toString();

        let month = date.substring(5, 7);
        let day = date.substring(8, 10);
        let year = date.substring(0, 4);

        let newDate = day + "/" + month + "/" + year;
        setDate(newDate);

        let dateDiff = month + "/" + day + "/" + year;
        setDateForDiff(dateDiff);

        let now = new Date();
        let nowString = ('0' + (now.getMonth() + 1)).slice(-2) + '/' + ('0' + now.getDate()).slice(-2) + '/' + now.getFullYear();

        setNowDate(nowString);
    }, [isOpen]);

    useEffect(() => { }, [data, date, nowDate, dateForDiff, isOpen, isYesNoModal]);

    return (
        <Container maxWidth="lg" sx={{ mt: 1, mb: 1 }} onMouseEnter={() => {
            setIsOpen(!isOpen);
        }} >
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} >
                    <Paper
                        sx={{
                            backgroundColor: "#fef3bd",
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: durum === "Tahsis edilmiş" ? 350 : 200,
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h2" variant="h4" color="primary" gutterBottom>
                            {marka} {kategori_ismi}
                        </Typography>
                        <Typography component="p" variant="h6">
                            Seri no: {seri_no}
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1, textDecoration: "underline", fontWeight: "bold" }}>
                            Özellikler
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1, fontStyle: "italic" }}>
                            <span style={{
                                padding: "10px",
                            }}>{boyut}</span><Tag color={renk}>{renk}</Tag><span>{modeli}</span>
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1, fontWeight: "bold" }}>
                            Açıklama: <span style={{
                                fontWeight: "normal",
                            }}>{aciklama}</span>
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1, fontWeight: "bold" }}>
                            Durum: <span style={{
                                fontWeight: "normal",
                                color: durum === "Tahsis edilmiş" ? "red" : "green"
                            }}>{durum}</span>
                        </Typography>
                        {durum === "Tahsis edilmiş" ? <Typography color="text.secondary" sx={{ flex: 1, fontWeight: "bold" }}>
                            Tahsis edilen kişi: <span style={{
                                fontWeight: "normal",
                            }}>{data.filter((item) => item.urun_id === id).map((item) => item.tahsis_edilen_kisi)}</span>
                        </Typography> : null}
                        {durum === "Tahsis edilmiş" ? <Typography color="text.secondary" sx={{ flex: 1, fontWeight: "bold" }}>
                            Tahsis edilen tarih: <span style={{
                                fontWeight: "normal",
                            }}>{
                                    date
                                }</span>
                        </Typography> : null}
                        {durum === "Tahsis edilmiş" ? <Typography color="text.secondary" sx={{ flex: 1, fontWeight: "bold" }}>
                            Tahsis edilen süre: <span style={{
                                fontWeight: "normal",
                            }}>
                                {
                                    dateConverter(nowDate, dateForDiff)
                                } gün</span>
                        </Typography> : null}
                        {durum === "Tahsis edilmiş" ?
                            <Fab color="primary" variant='extended' aria-label="remove" onClick={(e) => {
                                setIsYesNoModal(true);
                            }} >
                                <PersonRemoveIcon sx={{ mr: 1 }} />
                                Tahsisi kaldır
                            </Fab> : null}
                    </Paper >
                </Grid >
            </Grid >
            <Modal title={"Tahsis kaldırma işlemi"} visible={isYesNoModal} onCancel={() => {
                setIsYesNoModal(false);
            }} onOk={(e) => {
                removeAssign(e);
                setIsYesNoModal(false);
            }} okText="Evet" cancelText="Hayır" >
                <Typography color="text.secondary" sx={{ flex: 1, fontWeight: "bold" }}>
                    Tahsisi kaldırmak istediğinize emin misini? (Bu işlem geri alınamaz!)
                </Typography>
            </Modal>
        </Container >
    )
}

export default ViewModal