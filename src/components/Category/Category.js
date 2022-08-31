import { IconButton } from '@mui/material';
import { Button, Input, Modal, Table } from 'antd';
import 'antd/dist/antd.min.css';
import React, { useEffect, useState } from 'react'
import useCategory from '../../hooks/useCategory';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import CategoryModal from './CategoryModal';

function Category() {
    const { getCategories } = useCategory();
    const [data, setData] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [mod, setMod] = useState();
    const [id, setId] = useState();
    const [name, setName] = useState();

    useEffect(() => {
        getCategories().then(res => {
            setData(res.data)
        })
    }, [openModal]);

    useEffect(() => { }, [data, mod, id, name]);

    const columns = [
        {
            title: "İsim",
            dataIndex: "isim",
            width: "85%",
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
            title: "İşlemler",
            key: "action",
            render: (_, row) => {
                return (
                    <>
                        <IconButton aria-label="Düzenle" onClick={() => {
                            setId(row.id);
                            setName(row.isim);
                            setMod("edit");
                            setOpenModal(true);
                        }}>
                            <EditIcon color='success' />
                        </IconButton>
                        <IconButton aria-label="Sil" onClick={() => {
                            setId(row.id);
                            setMod("delete");
                            setOpenModal(true);
                        }}>
                            <DeleteIcon color='error' />
                        </IconButton>
                    </>
                )
            }
        }
    ]

    return (
        <Box sx={{
            width: "100%",
            height: "100%",
        }}>
            <Table columns={columns} dataSource={data} pagination={{
                pageSize: 3,
                showTotal: (total, range) => `Toplam ${total} kayıt arasından ${range[0]}-${range[1]} arası gösteriliyor.`

            }} title={() => {
                return (
                    <>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <h3>Kategoriler</h3>
                            <Button type="primary" onClick={() => {
                                setMod("add");
                                setOpenModal(true)
                            }
                            }>
                                <AddIcon />
                            </Button>
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
        </Box>
    )
}

export default Category