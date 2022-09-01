import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Card, Grow, IconButton } from '@mui/material';
import { Button, Input, Modal, Table, Tooltip, Tag } from 'antd';
import 'antd/dist/antd.min.css';
import ProductModal from "./ProductModal";
import useProduct from "../../hooks/useProduct";

function Product() {
    const { getProducts } = useProduct();

    const [data, setData] = useState();
    const [openModal, setOpenModal] = useState(false);
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

    useEffect(() => {
        getProducts().then(res => {
            setData(res.data);
        })
    }, [openModal]);

    useEffect(() => { }, [data, mod, id, serial_number, brand, model, size, color, status, description, category_name, category_id]);

    const columns = [
        {
            title: "Seri No",
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
        },
        {
            title: "Marka",
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
            key: "isim",
            sorter: (a, b) => a.marka.localeCompare(b.marka),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Model",
            dataIndex: "model",
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
                return record.model.toLowerCase().includes(value.toLowerCase());
            },
            key: "isim",
            sorter: (a, b) => a.model.localeCompare(b.model),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Boyut",
            dataIndex: "boyut",
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
                return record.boyut.toLowerCase().includes(value.toLowerCase());
            },
            key: "isim",
            sorter: (a, b) => a.boyut.localeCompare(b.boyut),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Renk",
            dataIndex: "renk",
            render: (text) => {
                return (
                    <Tag color={text}>{text}</Tag>

                )
            },
            key: "isim",
            sorter: (a, b) => a.renk.localeCompare(b.renk),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Durum",
            dataIndex: "durum",
            render: (text) => {
                if (text === "Kullanımda") {
                    return (
                        <Tag color="red">{text}</Tag>
                    )
                } else {
                    return (
                        <Tag color="green">{text}</Tag>
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
            title: "Açıklama",
            dataIndex: "aciklama",
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
                return record.aciklama.toLowerCase().includes(value.toLowerCase());
            },
            key: "isim",
            sorter: (a, b) => a.aciklama.localeCompare(b.aciklama),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Kategori İsmi",
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
        },
        {
            title: "İşlemler",
            key: "action",
            render: (_, row) => {
                return (
                    <>
                        <Tooltip title="Düzenle">
                            <IconButton aria-label="Düzenle" onClick={() => {
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
                        <Tooltip title="Sil">
                            <IconButton aria-label="Sil" onClick={() => {
                                setId(row.id);
                                setMod("delete");
                                setOpenModal(true);
                            }}>
                                <DeleteIcon color='error' />
                            </IconButton>
                        </Tooltip>
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
                }} key={data} columns={columns} dataSource={data} pagination={{
                    pageSize: 4,
                    showTotal: (total, range) => `Toplam ${total} kayıt arasından ${range[0]}-${range[1]} arası gösteriliyor.`

                }} title={() => {
                    return (
                        <>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <h3>Ürünler</h3>
                                <Tooltip title="Yeni ürün ekle">
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
                <Modal title={mod === "add" ? "Ürün ekle" : mod === "edit" ? "Ürünü düzenle" : "Ürünü sil"} visible={openModal} onCancel={() => {
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
                }} okButtonProps={{
                    hidden: true
                }} cancelButtonProps={{
                    hidden: true
                }}  >
                    <ProductModal mod={mod} id={id} seri_no={serial_number} marka={brand} modeli={model} boyut={size} renk={color} durum={status} aciklama={description} kategori_ismi={category_name} kategori_id={category_id} setOpenModal={setOpenModal} />
                </Modal>
            </Card>
        </Grow>
    )
}

export default Product