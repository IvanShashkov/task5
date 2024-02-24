import {FloatButton} from "antd"
import {ArrowUpOutlined} from "@ant-design/icons"

import { useEffect, useState } from "react"


const ToTopButton = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const listener = () => {
            const scrolled = document.documentElement.scrollTop
            scrolled > 200 ? setVisible(true) : setVisible(false)
        }

        window.addEventListener('scroll', listener)

        return () => {
            window.removeEventListener('scroll', listener)
        }
    }, [])

    return (
        <>
            {visible &&
                <FloatButton
                    icon={ <ArrowUpOutlined /> }
                    type={'primary'}
                    style={{
                        right: '40px',
                        zIndex: 10,
                    }}
                    onClick={() => document.documentElement.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })}
                />
            }
        </>
    )
}

export default ToTopButton