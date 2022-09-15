import React, { useEffect, useState } from 'react'
import useUsers from '../../hooks/useUsers'
import { Button, Input, Modal, Table, Tag, Tooltip } from "antd";
import 'antd/dist/antd.min.css';
import { Box, Card, Grow, IconButton } from '@mui/material';
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
    const [categoryAuth, setCategoryAuth] = useState();
    const [productAuth, setProductAuth] = useState();
    const [userAuth, setUserAuth] = useState();

    const AUTH = JSON.parse(localStorage.getItem("info"))[0].yetki;

    useEffect(() => {
        getUsers().then(res => {
            setData(res.data)
        })
    }, [openModal]);

    useEffect(() => { }, [data, mod, id, name, surname, email, phone, registrationNumber, degree, authentication, categoryAuth, productAuth, userAuth]);

    const columns = [
        {
            title: <h3 style={{
                textAlign: 'center',
                marginLeft: '40px',
            }}>Ad</h3>,
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
            }}>Soyad</h3>,
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
            }}>Email</h3>,
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
                marginLeft: '40px',
            }}>Telefon</h3>,
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
                marginLeft: '40px',
            }}>Sicil No</h3>,
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
                marginLeft: '20px',
            }}>Yetki</h3>,
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
                if (text === "111") {
                    return (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <h3 style={{
                                fontWeight: 'normal',
                            }}>
                                <Tag color="green">Kategori</Tag>
                                <Tag color="yellow">Ürün</Tag>
                                <Tag color="blue">Kullanıcı</Tag>
                            </h3>
                        </div>
                    );
                } else if (text === "110") {
                    return (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <h3 style={{
                                fontWeight: 'normal',
                            }}>
                                <Tag color="green">Kategori</Tag>
                                <Tag color="yellow">Ürün</Tag>
                            </h3>
                        </div>
                    );
                } else if (text === "101") {
                    return (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <h3 style={{
                                fontWeight: 'normal',
                            }}>
                                <Tag color="green">Kategori</Tag>
                                <Tag color="blue">Kullanıcı</Tag>
                            </h3>
                        </div>
                    );
                } else if (text === "100") {
                    return (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <h3 style={{
                                fontWeight: 'normal',
                            }}><Tag color="green">Kategori</Tag></h3>
                        </div>
                    );
                } else if (text === "011") {
                    return (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <h3 style={{
                                fontWeight: 'normal',
                            }}>
                                <Tag color="yellow">Ürün</Tag>
                                <Tag color="blue">Kullanıcı</Tag>
                            </h3>
                        </div>
                    );
                } else if (text === "010") {
                    return (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <h3 style={{
                                fontWeight: 'normal',
                            }}>
                                <Tag color="yellow">Ürün</Tag>
                            </h3>
                        </div>
                    );
                } else if (text === "001") {
                    return (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <h3 style={{
                                fontWeight: 'normal',
                            }}>
                                <Tag color="blue">Kullanıcı</Tag>
                            </h3>
                        </div>
                    );
                } else if (text === "000") {
                    return (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <h3 style={{
                                fontWeight: 'normal',
                            }}>
                                <Tag color="red">Yetki yok</Tag>
                            </h3>
                        </div>
                    );
                }
            },
        },
        AUTH[2] === '1' ?
            {
                title: <h3 style={{
                    textAlign: 'center',
                }}>İşlemler</h3>,
                key: "action",
                render: (_, row) => {
                    return (
                        <Box style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
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
                                    if (row.yetki[0] === "1") {
                                        setCategoryAuth(true);
                                    }
                                    if (row.yetki[1] === "1") {
                                        setProductAuth(true);
                                    }
                                    if (row.yetki[2] === "1") {
                                        setUserAuth(true);
                                    }
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
                        </Box>
                    )
                }
            } : {}
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
                    mt: 4, mb: 4
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
                                    <h2 style={{
                                        color: '#1890ff',
                                    }}>Kullanıcılar</h2>
                                    {AUTH[2] === '1' ?
                                        <Tooltip title="Yeni kullanıcı ekle">
                                            <Button type="primary" onClick={() => {
                                                setMod("add");
                                                setOpenModal(true)
                                            }
                                            }>
                                                <AddIcon />
                                            </Button>
                                        </Tooltip>
                                        : (<> </>)
                                    }
                                </div>
                            </>
                        )
                    }} />
                    <Modal style={{
                        justifyContent: 'center',
                        marginTop: '3%',
                    }} title={mod === "add" ? "Kişi ekle" : mod === "edit" ? "Kişiyi Düzenle" : "Kişiyi sil"} visible={openModal} onCancel={() => {
                        setMod("");
                        setId(0);
                        setName("");
                        setSurname("");
                        setEmail("");
                        setPhone("");
                        setRegistrationNumber("");
                        setDegree("");
                        setAuthentication("");
                        setCategoryAuth(false);
                        setProductAuth(false);
                        setUserAuth(false);
                        setOpenModal(false);
                    }} okButtonProps={{
                        hidden: true
                    }} cancelButtonProps={{
                        hidden: true
                    }}  >
                        <UserModal mod={mod} openModal={openModal} setOpenModal={setOpenModal} userId={id} ad={name} soyad={surname} eposta={email} telefon={phone} sicil_no={registrationNumber} unvan={degree} yetki={authentication} yetki0={categoryAuth} yetki1={productAuth} yetki2={userAuth} />
                    </Modal>
                </Card>
            </Grow>
        </>
    )
}

export default User