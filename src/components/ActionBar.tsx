import React from 'react'

import {
    Flex,
    Select,
    Slider,
    Typography,
    Input, Button
} from "antd"
import {RedoOutlined} from '@ant-design/icons'

import { CSVLink } from "react-csv"

import {getRandomSeed, regionsMap} from "../utils/utils"
import {user} from "../types/types"

type props = {
    region: { value: string | undefined, set: React.Dispatch<string> }
    errors: { value: number, set: React.Dispatch<number> }
    seed: { value: number, set: React.Dispatch<number> }
    data: user[] | []
}

const notValidateInput = (value: string) => isNaN(Number(value))

const ActionItem = ({ children, label}: { children: any, label: string }) => {
    return (
        <Flex
            gap={8}
            style={{ alignItems: 'center' }}
        >
            <Typography style={{ whiteSpace: 'nowrap' }}>{label}:</Typography>
            {children}
        </Flex>
    )
}

const ActionBar = ({ region, seed, errors, data } : props) => {
    return (
        <Flex justify={'center'} gap={60}>
            <ActionItem label={'Region'}>
                <Select
                    options={Array.from(regionsMap).map(([label, value]) => ({label, value}))}
                    onChange={(value) => region.set(value)}
                    value={region.value}
                />
            </ActionItem>
            <ActionItem label={'Errors'}>
                <Slider
                    style={{ width: '200px'}}
                    min={0}
                    max={1000}
                    onChange={(newValue) => errors.set(newValue)}
                    value={Number(errors.value)}
                />
                <Input
                    style={{ width: '80px'}}
                    value={errors.value}
                    onChange={event => {
                        const value = event.target.value
                        if (notValidateInput(value) || Number(value) > 1000) {
                            return
                        }
                        errors.set(Number(value))}
                    }
                    max={1000}
                />
            </ActionItem>
            <ActionItem label={'Seed'}>
                <Input
                    value={Number(seed.value)}
                    onChange={event => {
                        const value = event.target.value
                        if (notValidateInput(value) || Number(value) > 10000000) {
                            return
                        }
                        seed.set(Number(value))}
                    }
                />
                <Button
                    type={'primary'}
                    icon={ <RedoOutlined/> }
                    onClick={() => seed.set(getRandomSeed())}
                />
            </ActionItem>

            <CSVLink data={data}>
                <Button size={'large'}>
                    Export
                </Button>
            </CSVLink>
        </Flex>
    )
}

export default ActionBar