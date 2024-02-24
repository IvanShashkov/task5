import InfiniteScroll from "react-infinite-scroll-component"
import { Flex, Spin } from "antd"

type props = {
    children: any,
    lengthData: number,
    nextFunc: any,
}

const InfiniteScrollWrapper = ({ children, lengthData, nextFunc  }: props) => {
    return (
        <InfiniteScroll
            dataLength={lengthData}
            next={nextFunc}
            hasMore={true}
            loader={
                <Flex style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60px'
                }}>
                    <Spin/>
                </Flex>
            }
        >
            {children}
        </InfiniteScroll>
    )
}

export default InfiniteScrollWrapper