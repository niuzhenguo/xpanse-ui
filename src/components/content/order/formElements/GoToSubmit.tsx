/*
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Huawei Inc.
 */

import {
    CreateRequestCategoryEnum,
    CreateRequestCspEnum,
    Ocl,
    RegisteredServiceVo,
} from '../../../../xpanse-api/generated';
import { DeployParam } from './CommonTypes';
import { Button } from 'antd';
import { OrderSubmitProps } from '../OrderSubmit';
import { useNavigate } from 'react-router-dom';

export default function GoToSubmit({
    categoryName,
    serviceName,
    selectVersion,
    selectCsp,
    selectRegion,
    selectFlavor,
    versionMapper,
}: {
    categoryName: string;
    serviceName: string;
    selectVersion: string;
    selectCsp: string;
    selectRegion: string;
    selectFlavor: string;
    versionMapper: Map<string, RegisteredServiceVo[]>;
}): JSX.Element {
    const navigate = useNavigate();

    const gotoOrderSubmit = function () {
        let service: Ocl = new Ocl();
        versionMapper.forEach((v, k) => {
            if (k === selectVersion) {
                const oclList: Ocl[] = [];
                for (const registeredServiceVo of v) {
                    oclList.push(registeredServiceVo.ocl);
                }
                oclList.forEach((item) => {
                    if (item.serviceVersion === selectVersion && item.cloudServiceProvider.name === selectCsp) {
                        service = item;
                    }
                });
            }
        });

        const props: OrderSubmitProps = {
            category: categoryName as CreateRequestCategoryEnum,
            name: serviceName,
            version: selectVersion,
            region: selectRegion,
            csp: selectCsp as CreateRequestCspEnum,
            flavor: selectFlavor,
            params: new Array<DeployParam>(),
        };

        for (const param of service.deployment.context) {
            props.params.push({
                name: param.name,
                kind: param.kind,
                type: param.type,
                example: param.example === undefined ? '' : param.example,
                description: param.description,
                value: param.value === undefined ? '' : param.value,
                mandatory: param.mandatory,
                validator: param.validator === undefined ? '' : param.validator,
            });
        }

        navigate('/order', {
            state: {
                props: props,
            },
        });
    };

    return (
        <>
            <div className={'order-param-item-row'}>
                <div className={'order-param-item-left'} />
                <div className={'order-param-submit'}>
                    <Button type='primary' onClick={gotoOrderSubmit}>
                        &nbsp;&nbsp;Next&nbsp;&nbsp;
                    </Button>
                </div>
            </div>
        </>
    );
}
