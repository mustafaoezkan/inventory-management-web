import { Card, Grow, IconButton } from '@mui/material';
import { Button, Input, Modal, Table, Tag, Tooltip } from 'antd';
import 'antd/dist/antd.min.css';
import React, { useEffect, useState } from 'react'
import useCategory from '../../hooks/useCategory';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CategoryModal from './CategoryModal';
import { Box } from '@mui/system';

function Category() {
    const { getCategories, getAssignCategoriesCount, getNotAssignCategoriesCount } = useCategory();
    const [assigned, setAssigned] = useState([]);
    const [categories, setCategories] = useState([]);
    const [notAssigned, setNotAssigned] = useState([]);
    const [totalArray, setTotalArray] = useState([]);
    const [tamTotal, setTamTotal] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [mod, setMod] = useState();
    const [id, setId] = useState();
    const [name, setName] = useState();

    useEffect(() => {
        getCategories().then(res => {
            setCategories(res.data)
        })
        getAssignCategoriesCount().then(res => {
            setAssigned(res.data)
        })
        getNotAssignCategoriesCount().then(res => {
            setNotAssigned(res.data)
        })

    }, [openModal]);

    useEffect(() => {
        mergeArrays();
        mergeOtherArrays();
    }, [categories, totalArray, tamTotal]);

    useEffect(() => {
    }, [categories, mod, id, name, assigned, notAssigned, totalArray, tamTotal]);


    const mergeArrays = async () => {
        setTotalArray(
            categories.map((itemA) => ({
                ...itemA,
                ...assigned.find((itemB) => itemB.id === itemA.id),
            }))
        );
    }

    const mergeOtherArrays = async () => {
        setTamTotal(
            totalArray.map((itemA) => ({
                ...itemA,
                ...notAssigned.find((itemB) => itemB.id === itemA.id),
            }))
        );
    }

    const columns = [
        {
            title: "İsim",
            dataIndex: "isim",
            width: "40%",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <>
                        <div style={{
                            display: 'flex',
                        }}>
                            <Input autoFocus placeholder='Arama yap'
                                value={selectedKeys[0]}
                                onChange={(e) => {
                                    setSelectedKeys(e.target.value ? [e.target.value] : []);
                                    confirm({ closeDropdown: false });
                                }} onPressEnter={() => {
                                    confirm()
                                }}
                                onBlur={() => {
                                    confirm()
                                }}
                            />
                            <Button icon={<DeleteIcon />} onClick={() => { clearFilters(); confirm(); }} type="danger" />
                        </div>
                    </>
                );
            },
            filterIcon: () => {
                return <SearchIcon />;
            },
            onFilter: (value, record) => {
                return record.isim.toLowerCase().includes(value.toLowerCase());
            },
            key: "isim",
            sorter: (a, b) => a.isim.localeCompare(b.isim),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Tahsis edilmiş ürün sayısı",
            dataIndex: "tahsis_edilmis_urun_sayisi",
            width: "20%",
            render: (text, record) => {
                return (
                    record.tahsis_edilmis_urun_sayisi ? (
                        <Tag color="yellow">
                            <Tooltip title="Tahsis edilmiş ürün sayısı">
                                <span>{record.tahsis_edilmis_urun_sayisi}</span>
                            </Tooltip>
                        </Tag>
                    ) : (
                        <Tag color='yellow'>
                            <Tooltip title="Tahsis edilmiş ürün sayısı">
                                <span>0</span>
                            </Tooltip>
                        </Tag>
                    )

                )
            },
            key: "tahsis_edilmis_urun_sayisi",
        },
        {
            title: "Tahsis edilmemiş ürün sayısı",
            dataIndex: "tahsis_edilmemis_urun_sayisi",
            width: "20%",
            render: (text, record) => {
                return (
                    record.tahsis_edilmemis_urun_sayisi ? (
                        <Tag color='blue'>
                            <Tooltip title="Tahsis edilmemiş ürün sayısı">
                                <span>{record.tahsis_edilmemis_urun_sayisi}</span>
                            </Tooltip>
                        </Tag>

                    ) : (
                        <Tag color="blue">
                            <Tooltip title="Tahsis edilmemiş ürün sayısı">
                                <span>0</span>
                            </Tooltip>
                        </Tag>
                    )

                )
            },
            key: "tahsis_edilmis_urun_sayisi",
        },
        {
            title: "Toplam ürün sayısı",
            width: "20%",
            render: (text, record) => {
                if (record.tahsis_edilmemis_urun_sayisi === undefined) {
                    record.tahsis_edilmemis_urun_sayisi = 0;
                }
                if (record.tahsis_edilmis_urun_sayisi === undefined) {
                    record.tahsis_edilmis_urun_sayisi = 0;
                }
                return (
                    <Tag color="green">
                        <Tooltip title="Toplam ürün sayısı">
                            <span>{+record.tahsis_edilmemis_urun_sayisi + +record.tahsis_edilmis_urun_sayisi}</span>
                        </Tooltip>
                    </Tag>
                )
            },
            key: "tahsis_edilmis_urun_sayisi",
        },
        {
            title: "İşlemler",
            key: "action",
            render: (_, row) => {
                return (
                    <>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }} >
                            <Tooltip title="Düzenle">
                                <IconButton aria-label="Düzenle" onClick={() => {
                                    setId(row.id);
                                    setName(row.isim);
                                    setMod("edit");
                                    setOpenModal(true);
                                }}>
                                    <EditIcon color='success' />
                                </IconButton>
                            </Tooltip>
                            {row.tahsis_edilmis_urun_sayisi !== 0 ? (
                                <IconButton aria-label="Sil" disabled >
                                    <DeleteIcon color='disable' />
                                </IconButton>
                            ) : row.tahsis_edilmemis_urun_sayisi !== 0 ? (
                                <IconButton aria-label="Sil" disabled >
                                    <DeleteIcon color='disable' />
                                </IconButton>
                            ) : (
                                <Tooltip title="Sil">
                                    <IconButton aria-label="Sil" onClick={() => {
                                        setId(row.id);
                                        setMod("delete");
                                        setOpenModal(true);
                                    }}>
                                        <DeleteIcon color='error' />
                                    </IconButton>
                                </Tooltip>
                            )}

                        </Box>
                    </>
                )
            }
        }
    ]

    return (
        <Grow in={true}>
            <Card sx={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
            }}>
                <Table locale={{
                    emptyText: "Kayıt bulunamadı",
                    filterConfirm: "Tamam",
                    filterReset: "Sıfırla",
                    filterTitle: "Filtrele",
                    selectAll: "Tümünü seç",
                    selectInvert: "Seçimi tersine çevir",
                    sortTitle: "Sırala",
                    triggerDesc: "Azalan sıralamak için tıklayın",
                    triggerAsc: "Artan sıralamak için tıklayın",
                    cancelSort: "Sıralamayı iptal etmek için tıklayın",
                }} columns={columns} dataSource={tamTotal} pagination={{
                    pageSize: 5,
                    showTotal: (total, range) => `Toplam ${total} kayıt arasından ${range[0]}-${range[1]} arası gösteriliyor.`

                }} title={() => {
                    return (
                        <>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <h3>Kategoriler</h3>
                                <Tooltip title="Kategori Ekle">
                                    <Button type="primary" onClick={() => {
                                        setMod("add");
                                        setOpenModal(true)
                                    }
                                    }>
                                        <AddIcon />
                                    </Button>
                                </Tooltip>
                            </div>
                        </>
                    )
                }} />
                <Modal title={mod === "add" ? "Kategori ekle" : mod === "edit" ? "Kategoriyi Düzenle" : "Kategoriyi sil"} visible={openModal} onCancel={() => {
                    setMod("");
                    setId(0);
                    setName("");
                    setOpenModal(false);
                }} okButtonProps={{
                    hidden: true
                }} cancelButtonProps={{
                    hidden: true
                }}  >
                    <CategoryModal mod={mod} id={id} name={name} setOpenModal={setOpenModal} />
                </Modal>
            </Card>
        </Grow>
    )
}

export default Category