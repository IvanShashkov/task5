import {useEffect, useState} from "react"

import ActionBar from "./components/ActionBar"
import ToTopButton from "./components/ScrollToTopFloatButton"
import InfiniteScrollWrapper from "./components/InfiniteScrollWrapper"

import {Table} from "antd"
import userTableConfig from "./components/userTableConfig"

import {getRandomSeed, getUsers, regionsMap} from "./utils/utils"
import debounce from "./utils/debounce"
import {getUsersPayload, user} from "./types/types"

function App() {
    const [users, setUsers] = useState<user[] | []>([])
    const [region, setRegion] = useState(regionsMap.get('France'))
    const [errors, setErrors] = useState(0)
    const [seed, setSeed] = useState(getRandomSeed())

    const tableConfig = userTableConfig()
    const responseUserLength = 20

    const payload: getUsersPayload = {
        region,
        errors,
        seed,
        responseUserLength,
    }

    const debounceGetUser = debounce(() => {
        setUsers(getUsers(payload))
    }, 600)

    const getInfiniteUser = () => {
        setUsers(getUsers({
            ...payload,
            responseUserLength: users?.length + 20
        }))
    }

    useEffect(() => {
        debounceGetUser()
    }, [region, errors, seed])

    return (
        <div style={{ padding: '20px'}}>
            <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
            }}>
                <ActionBar
                    errors={{ value: errors, set: setErrors }}
                    region={{ value: region, set: setRegion }}
                    seed={{ value: seed, set: setSeed }}
                    data={users}
                />
                {users.length > 0 && (
                    <InfiniteScrollWrapper
                        lengthData={users?.length}
                        nextFunc={getInfiniteUser}
                    >
                        <Table
                            style={{ marginTop: '8px' }}
                            columns={tableConfig}
                            dataSource={users}
                            rowKey={'phone'}
                            pagination={false}
                        />
                    </InfiniteScrollWrapper>
                )}
                <ToTopButton/>
            </div>
        </div>
    )
}

export default App
