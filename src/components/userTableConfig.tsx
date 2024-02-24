import {Typography} from "antd"
import {user} from "../types/types"

const userTableConfig = () => ([
    {
        title: () => 'Number',
        key: 'id',
        width: 60,
        render: (text: any, row: any, index: number) => <Typography>{index + 1}</Typography>
    },
    {
        title: () => 'ID',
        key: 'id',
        width: 200,
        render: (text: any, row: any, index: number) => <Typography>{row.id}</Typography>
    },
    {
        title: () => 'Name',
        key: 'name',
        width: 250,
        render: (text: any, row: user) => <Typography>{row.name}</Typography>
    },
    {
        title: () => 'Phone',
        key: 'phone',
        width: 250,
        render: (text: any, row: user) => <Typography>{row.phone}</Typography>
    },
    {
        title: () => 'Location',
        key: 'location',
        width: 350,
        render: (text: any, row: user) => <Typography>{row.location}</Typography>
    },
])

export default userTableConfig