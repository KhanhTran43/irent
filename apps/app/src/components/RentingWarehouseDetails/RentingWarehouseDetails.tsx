import styled from "styled-components";

import { WarehouseDetailsModel } from "../../models/warehouse-details.model";

const RentingWarehouseDetails = (warehouse: WarehouseDetailsModel) => {
    const { name } = warehouse
    return <Container>
        <Title>
            Thông tin kho bãi
        </Title>
        <Body>
            <Text>Tên: {name}</Text>
            <Text>Tên: {name}</Text>
            <Text>Tên: {name}</Text>
        </Body>
    </Container>
}

const Container = styled.div``

const Title = styled.h1`
`

const Body = styled.div`
`

const Text = styled.span``


export default RentingWarehouseDetails;
