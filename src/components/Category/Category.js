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

    const AUTH = JSON.parse(localStorage.getItem("info"))[0].yetki;

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
            title: <h3 style={{
                textAlign: 'center',
                marginLeft: '40px',
            }}>??sim</h3>,
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
            render: (text, record) => {
                return (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <h3>{text}</h3>
                    </div>
                );
            }
        },
        {
            title: <h3 style={{
                textAlign: 'center',
            }}>Tahsis edilmi?? ??r??n say??s??</h3>,
            dataIndex: "tahsis_edilmis_urun_sayisi",
            width: "20%",
            render: (text, record) => {
                return (
                    record.tahsis_edilmis_urun_sayisi ? (
                        <Box sx={{
                            justifyContent: 'center',
                            display: 'flex',
                        }}>
                            <Tag color="red ">
                                <Tooltip title="Tahsis edilmi?? ??r??n say??s??">
                                    <span style={{
                                        fontSize: "20px",
                                    }}>{record.tahsis_edilmis_urun_sayisi}</span>
                                </Tooltip>
                            </Tag>
                        </Box>

                    ) : (
                        <Box sx={{
                            justifyContent: 'center',
                            display: 'flex',
                        }}>
                            <Tag color='red '>
                                <Tooltip title="Tahsis edilmi?? ??r??n say??s??">
                                    <span style={{
                                        fontSize: "20px",
                                    }}>0</span>
                                </Tooltip>
                            </Tag>
                        </Box>
                    )
                )
            },
            key: "tahsis_edilmis_urun_sayisi",
        },
        {
            title: <h3 style={{
                textAlign: 'center',
            }}>Tahsis edilmemi?? ??r??n say??s??</h3>,
            dataIndex: "tahsis_edilmemis_urun_sayisi",
            width: "20%",
            render: (text, record) => {
                return (
                    record.tahsis_edilmemis_urun_sayisi ? (
                        <Box sx={{
                            justifyContent: 'center',
                            display: 'flex',
                        }}>
                            <Tag color='green ' >
                                <Tooltip title="Tahsis edilmemi?? ??r??n say??s??">
                                    <span style={{
                                        fontSize: "20px",
                                    }}>{record.tahsis_edilmemis_urun_sayisi}</span>
                                </Tooltip>
                            </Tag>
                        </Box>
                    ) : (
                        <Box sx={{
                            justifyContent: 'center',
                            display: 'flex',
                        }}>
                            <Tag color="green ">
                                <Tooltip title="Tahsis edilmemi?? ??r??n say??s??">
                                    <span style={{
                                        fontSize: "20px",
                                    }}>0</span>
                                </Tooltip>
                            </Tag>
                        </Box>
                    )

                )
            },
            key: "tahsis_edilmis_urun_sayisi",
        },
        {
            title: <h3 style={{
                textAlign: 'center',
            }}>Toplam ??r??n say??s??</h3>,
            width: "20%",
            render: (text, record) => {
                if (record.tahsis_edilmemis_urun_sayisi === undefined) {
                    record.tahsis_edilmemis_urun_sayisi = 0;
                }
                if (record.tahsis_edilmis_urun_sayisi === undefined) {
                    record.tahsis_edilmis_urun_sayisi = 0;
                }
                return (
                    <Box sx={{
                        justifyContent: 'center',
                        display: 'flex',
                    }}>
                        <Tag color="blue ">
                            <Tooltip title="Toplam ??r??n say??s??">
                                <span style={{
                                    fontSize: "20px",
                                }}>{+record.tahsis_edilmemis_urun_sayisi + +record.tahsis_edilmis_urun_sayisi}</span>
                            </Tooltip>
                        </Tag>
                    </Box>
                )
            },
            key: "tahsis_edilmis_urun_sayisi",
        },
        AUTH[0] === "1" ?
            {
                title: <h3 style={{
                    textAlign: 'center',
                }}>????lemler</h3>,
                key: "action",
                width: "10%",
                render: (_, row) => {
                    return (
                        <>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }} >
                                <Tooltip title="D??zenle">
                                    <IconButton aria-label="D??zenle" onClick={() => {
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
            } : {}
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
                mt: 4, mb: 4
            }}>
                <Table locale={{
                    emptyText: "Kay??t bulunamad??",
                    filterConfirm: "Tamam",
                    filterReset: "S??f??rla",
                    filterTitle: "Filtrele",
                    selectAll: "T??m??n?? se??",
                    selectInvert: "Se??imi tersine ??evir",
                    sortTitle: "S??rala",
                    triggerDesc: "Azalan s??ralamak i??in t??klay??n",
                    triggerAsc: "Artan s??ralamak i??in t??klay??n",
                    cancelSort: "S??ralamay?? iptal etmek i??in t??klay??n",
                }} columns={columns} dataSource={tamTotal} pagination={{
                    pageSize: 5,
                    showTotal: (total, range) => `Toplam ${total} kay??t aras??ndan ${range[0]}-${range[1]} aras?? g??steriliyor.`

                }} title={() => {
                    return (
                        <>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <h2 style={{
                                    color: '#1890ff',
                                }}>Kategoriler</h2>
                                {AUTH[0] === "1" ? (
                                    <Tooltip title="Kategori Ekle">
                                        <Button type="primary" onClick={() => {
                                            setMod("add");
                                            setOpenModal(true)
                                        }
                                        }>
                                            <AddIcon />
                                        </Button>
                                    </Tooltip>
                                ) : null}

                            </div>
                        </>
                    )
                }} size="large" />
                <Modal style={{
                    justifyContent: 'center',
                    marginTop: '10%',
                }} title={mod === "add" ? "Kategori ekle" : mod === "edit" ? "Kategoriyi D??zenle" : "Kategoriyi sil"} visible={openModal} onCancel={() => {
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