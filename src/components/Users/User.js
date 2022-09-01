import React, { useEffect, useState } from 'react'
import useUsers from '../../hooks/useUsers'
import { Button, Input, Modal, Table, Tag, Tooltip } from "antd";
import 'antd/dist/antd.min.css';
import { Card, Grow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import UserModal from './UserModal'

function User() {
    const { getUsers } = useUsers();
    const [data, setData] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [mod, setMod] = useState();
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [registrationNumber, setRegistrationNumber] = useState();
    const [degree, setDegree] = useState();
    const [authentication, setAuthentication] = useState();


    useEffect(() => {
        getUsers().then(res => {
            setData(res.data)
        })
    }, [openModal]);

    useEffect(() => { }, [data, mod, id, name, surname, email, phone, registrationNumber, degree, authentication]);

    const columns = [
        {
            title: "Ad",
            dataIndex: "ad",
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
                return record.ad.toLowerCase().includes(value.toLowerCase());
            },
            key: "ad",
            sorter: (a, b) => a.ad.localeCompare(b.ad),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Soyad",
            dataIndex: "soyad",
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
                return record.soyad.toLowerCase().includes(value.toLowerCase());
            },
            key: "soyad",
            sorter: (a, b) => a.soyad.localeCompare(b.soyad),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Email",
            dataIndex: "email",
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
                return record.email.toLowerCase().includes(value.toLowerCase());
            },
            key: "email",
            sorter: (a, b) => a.email.localeCompare(b.email),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Telefon",
            dataIndex: "telefon",
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
                return record.telefon.toLowerCase().includes(value.toLowerCase());
            },
            key: "telefon",
        },
        {
            title: "Sicil No",
            dataIndex: "sicil_no",
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
                return record.sicil_no.toLowerCase().includes(value.toLowerCase());
            },
            key: "sicil_no",
            sorter: (a, b) => a.sicil_no.localeCompare(b.sicil_no),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Yetki",
            dataIndex: "yetki",
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
                return record.yetki.toLowerCase().includes(value.toLowerCase());
            },
            key: "yetki",
            render: (text) => {
                if (text === "Admin") {
                    return <Tag color="success">Admin</Tag>
                } else if (text === "Kullanici") {
                    return <Tag color="warning">Kullanıcı</Tag>
                } else {
                    return <Tag color="default">-</Tag>
                }
            },
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
                                setName(row.ad);
                                setSurname(row.soyad);
                                setEmail(row.email);
                                setPhone(row.telefon);
                                setRegistrationNumber(row.sicil_no);
                                setDegree(row.unvan);
                                setAuthentication(row.yetki);
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
        <>
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
                    }} columns={columns} dataSource={data} pagination={{
                        pageSize: 4,
                        showTotal: (total, range) => `Toplam ${total} kayıt arasından ${range[0]}-${range[1]} arası gösteriliyor.`

                    }} title={() => {
                        return (
                            <>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}>
                                    <h3>Kullanıcılar</h3>
                                    <Tooltip title="Yeni kullanıcı ekle">
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
                    <Modal title={mod === "add" ? "Kişi ekle" : mod === "edit" ? "Kişiyi Düzenle" : "Kişiyi sil"} visible={openModal} onCancel={() => {
                        setMod("");
                        setId(0);
                        setName("");
                        setSurname("");
                        setEmail("");
                        setPhone("");
                        setRegistrationNumber("");
                        setDegree("");
                        setAuthentication("");
                        setOpenModal(false);
                    }} okButtonProps={{
                        hidden: true
                    }} cancelButtonProps={{
                        hidden: true
                    }}  >
                        <UserModal mod={mod} openModal={openModal} setOpenModal={setOpenModal} userId={id} ad={name} soyad={surname} eposta={email} telefon={phone} sicil_no={registrationNumber} unvan={degree} yetki={authentication} />
                    </Modal>
                </Card>
            </Grow>
        </>
    )
}

export default User