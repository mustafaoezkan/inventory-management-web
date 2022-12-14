import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Card, Grow, IconButton } from '@mui/material';
import { Button, Input, Modal, Table, Tooltip, Tag } from 'antd';
import 'antd/dist/antd.min.css';
import ProductModal from "./ProductModal";
import useProduct from "../../hooks/useProduct";
import ViewModal from './ViewModal';
import { Box } from '@mui/system';

function Product() {
    const { getProducts } = useProduct();

    const [data, setData] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [mod, setMod] = useState();
    const [id, setId] = useState();
    const [serial_number, setSerialNumber] = useState();
    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [size, setSize] = useState();
    const [color, setColor] = useState();
    const [status, setStatus] = useState();
    const [description, setDescription] = useState();
    const [category_name, setCategoryName] = useState();
    const [category_id, setCategoryId] = useState();

    const AUTH = JSON.parse(localStorage.getItem("info"))[0].yetki;

    useEffect(() => {
        getProducts().then(res => {
            setData(res.data);
        })
    }, [openModal, openViewModal]);

    useEffect(() => { }, [data, mod, id, serial_number, brand, model, size, color, status, description, category_name, category_id]);

    const columns = [
        {
            title: <h3 style={{
                textAlign: 'center',
                marginLeft: '40px',
            }}>Seri No</h3>,
            dataIndex: "seri_no",
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
                return record.seri_no.toLowerCase().includes(value.toLowerCase());
            },
            key: "seri_no",
            sorter: (a, b) => a.seri_no.localeCompare(b.seri_no),
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
                marginLeft: '40px',
            }}>Marka</h3>,
            dataIndex: "marka",
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
                return record.marka.toLowerCase().includes(value.toLowerCase());
            },
            key: "marka",
            sorter: (a, b) => a.marka.localeCompare(b.marka),
            sortDirections: ["ascend", "descend"],
            render: (text, record) => {
                return (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <h3 style={{
                            fontWeight: 'normal',
                        }}>{text}</h3>
                    </div>
                );
            }
        },
        {
            title: <h3 style={{
                textAlign: 'center',
            }}>Renk</h3>,
            dataIndex: "renk",
            render: (text) => {
                return (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <Tag style={{
                            fontSize: '0.9rem',
                        }} color={text}>{text}</Tag>
                    </Box>


                )
            },
            key: "isim",
            sorter: (a, b) => a.renk.localeCompare(b.renk),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: <h3 style={{
                textAlign: 'center',
            }}>Durum</h3>,
            dataIndex: "durum",
            render: (text) => {
                if (text === "Tahsis edilmi??") {
                    return (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Tag style={{
                                fontSize: '0.9rem',
                            }} color="red">{text}</Tag>
                        </Box>
                    )
                } else {
                    return (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Tag style={{
                                fontSize: '0.9rem',
                            }} color="green">{text}</Tag>
                        </Box>
                    )
                }
            },
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
                return record.durum.toLowerCase().includes(value.toLowerCase());
            },
            key: "isim",
            sorter: (a, b) => a.durum.localeCompare(b.durum),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: <h3 style={{
                textAlign: 'center',
                marginLeft: '40px',
            }}>Kategori ??smi</h3>,
            dataIndex: "kategori_ismi",
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
                return record.kategori_ismi.toLowerCase().includes(value.toLowerCase());
            },
            key: "isim",
            sorter: (a, b) => a.kategori_ismi.localeCompare(b.kategori_ismi),
            sortDirections: ["ascend", "descend"],
            render: (text, record) => {
                return (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <h3 style={{
                            fontWeight: 'normal',
                        }}>{text}</h3>
                    </div>
                );
            }
        },
        AUTH[1] === "1" ?
            {
                title: <h3 style={{
                    textAlign: 'center',
                }}>????lemler</h3>,
                key: "action",
                render: (_, row) => {
                    return (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                            <Tooltip title="D??zenle">
                                <IconButton aria-label="D??zenle" onClick={() => {
                                    setId(row.id);
                                    setSerialNumber(row.seri_no);
                                    setBrand(row.marka);
                                    setModel(row.model);
                                    setSize(row.boyut);
                                    setColor(row.renk);
                                    setStatus(row.durum);
                                    setDescription(row.aciklama);
                                    setCategoryName(row.kategori_ismi);
                                    setCategoryId(row.kategori_id);
                                    setMod("edit");
                                    setOpenModal(true);
                                }}>
                                    <EditIcon color='success' />
                                </IconButton>
                            </Tooltip>
                            {row.durum === "Tahsis edilmi??" ? (
                                <IconButton aria-label="Sil" disabled>
                                    <DeleteIcon color="disabled" />
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
                            {row.durum === "Tahsis edilmi??" ? (
                                <IconButton disabled aria-label="Tahsis Et" onClick={() => {

                                }}>
                                    <AccountBoxIcon color='disabled' />
                                </IconButton>
                            ) : (
                                <Tooltip title="Tahsis Et">
                                    <IconButton aria-label="Tahsis Et" onClick={() => {
                                        setId(row.id);
                                        setSerialNumber(row.seri_no);
                                        setBrand(row.marka);
                                        setModel(row.model);
                                        setSize(row.boyut);
                                        setColor(row.renk);
                                        setStatus(row.durum);
                                        setDescription(row.aciklama);
                                        setCategoryName(row.kategori_ismi);
                                        setCategoryId(row.kategori_id);
                                        setMod("assign");
                                        setOpenModal(true);
                                    }}>
                                        <AccountBoxIcon color='primary' />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </div>
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
                mt: 4, mb: 4,

            }}>
                <Table onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setId(record.id);
                            setSerialNumber(record.seri_no);
                            setBrand(record.marka);
                            setModel(record.model);
                            setSize(record.boyut);
                            setColor(record.renk);
                            setStatus(record.durum);
                            setDescription(record.aciklama);
                            setCategoryName(record.kategori_ismi);
                            setCategoryId(record.kategori_id);
                            setOpenViewModal(true);
                        },
                    }
                }} locale={{
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
                }} key={data} columns={columns} dataSource={data} pagination={{
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
                                }}>??r??nler</h2>
                                {AUTH[1] === "1" ? (
                                    <Tooltip title="Yeni ??r??n ekle">
                                        <Button type="primary" onClick={() => {
                                            setMod("add");
                                            setOpenModal(true)
                                        }
                                        }>
                                            <AddIcon />
                                        </Button>
                                    </Tooltip>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </>
                    )
                }} />
                <Modal style={{
                    justifyContent: 'center',
                    marginTop: '3%',
                }} title={mod === "add" ? "??r??n ekle" : mod === "edit" ? "??r??n?? d??zenle" : mod === "delete" ? "??r??n?? sil" : mod === "assign" ? "??r??n?? tahsis et" : "??r??n Detay??"} visible={openModal || openViewModal} onCancel={() => {
                    setMod("");
                    setId(0);
                    setSerialNumber("");
                    setBrand("");
                    setModel("");
                    setSize("");
                    setColor("");
                    setStatus("");
                    setDescription("");
                    setCategoryName("");
                    setOpenModal(false);
                    setOpenViewModal(false);
                }} okButtonProps={{
                    hidden: true
                }} cancelButtonProps={{
                    hidden: true
                }}  >
                    <ProductModal mod={mod} id={id} seri_no={serial_number} marka={brand} modeli={model} boyut={size} renk={color} durum={status} aciklama={description} kategori_ismi={category_name} kategori_id={category_id} setOpenModal={setOpenModal} />
                    {mod === "add" ? (<></>) : mod === "edit" ? (<></>) : mod === "assign" ? (<></>) : mod === "delete" ? (<></>) : (<ViewModal id={id} seri_no={serial_number} marka={brand} modeli={model} boyut={size} renk={color} durum={status} aciklama={description} kategori_ismi={category_name} kategori_id={category_id} setOpenViewModal={setOpenViewModal} />)}
                </Modal>
            </Card>
        </Grow>
    )
}

export default Product