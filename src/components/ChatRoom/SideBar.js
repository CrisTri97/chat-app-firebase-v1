import { Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'
import RoomList from './RoomList'
import UserInfo from './UserInfo'

const SideBarStyled = styled.div`
background:#3f0e40;
color:white;
height:100vh;
`;

function SideBar() {
    return (
        <SideBarStyled>
            <Row justify='space-between'>
                <Col span={24} >
                    <UserInfo />
                </Col>
                <Col span={24}>
                    <RoomList />
                </Col>
            </Row>
        </SideBarStyled>
    )
}

export default SideBar