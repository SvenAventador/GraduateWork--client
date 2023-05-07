import React from 'react';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import Pagination from 'antd/lib/pagination';

const DeviceCount = observer(() => {
    const { device } = React.useContext(Context);

    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = [];

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return (
        <Pagination className={`${device.totalCount > 0 ? '' : 'is-hidden'}`}
            current={device.page}
            onChange={(page) => device.setPage(page)}
            total={device.totalCount}
            size={"large"}
            pageSize={device.limit}
        />
    );
});


export default DeviceCount;