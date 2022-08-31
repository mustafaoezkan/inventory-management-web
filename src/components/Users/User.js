import React, { useEffect, useState } from 'react'
import useUsers from '../../hooks/useUsers'
import { Space, Table, Tag } from "antd";
import 'antd/dist/antd.css';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
    {
        title: "Ad",
        dataIndex: "ad",
        key: "ad",
        render: (text) => {
            return <Space>
                <span>{text}</span>
            </Space>
        },
        sorter: (a, b) => a.ad.localeCompare(b.ad),
        sortDirections: ["ascend", "descend"],
    },
    {
        title: "Soyad",
        dataIndex: "soyad",
        key: "soyad",
        render: (text) => {
            return <Space>
                <span>{text}</span>
            </Space>
        },
        sorter: (a, b) => a.ad.localeCompare(b.ad),
        sortDirections: ["ascend", "descend"],
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text) => {
            return <Space>
                <span>{text}</span>
            </Space>
        },
        sorter: (a, b) => a.ad.localeCompare(b.ad),
        sortDirections: ["ascend", "descend"],
    },
    {
        title: "Telefon",
        dataIndex: "telefon",
        key: "telefon",
        render: (text) => {
            return <Space>
                <span>{text}</span>
            </Space>
        },
    },
    {
        title: "Sicil No",
        dataIndex: "sicil_no",
        key: "sicil_no",
        render: (text) => {
            return <Space>
                <span>{text}</span>
            </Space>
        },
        sorter: (a, b) => a.ad.localeCompare(b.ad),
        sortDirections: ["ascend", "descend"],
    },
    {
        title: "Ünvan",
        dataIndex: "unvan",
        key: "unvan",
        render: (text) => {
            return <Space>
                <span>{text}</span>
            </Space>
        },
        sorter: (a, b) => a.ad.localeCompare(b.ad),
        sortDirections: ["ascend", "descend"],
    },
    {
        title: "Yetki",
        dataIndex: "yetki",
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
        render: () => {
            return (
                <>
                    <IconButton aria-label="Düzenle">
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Sil">
                        <DeleteIcon />
                    </IconButton>
                </>
            )


        }
    }
]

function User() {
    const { getUsers } = useUsers();
    const [data, setData] = useState();

    useEffect(() => {
        getUsers().then(res => {
            setData(res.data)
            console.log(res.data)
        })
    }, []);

    useEffect(() => { }, [data]);

    return (
        <Table columns={columns} dataSource={data} size="large" />
    )
}

export default User