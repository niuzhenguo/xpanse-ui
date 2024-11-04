/*
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Huawei Inc.
 */

import { Descriptions } from 'antd';
import React from 'react';
import catalogStyles from '../../../styles/catalog.module.css';
import oclDisplayStyles from '../../../styles/ocl-display.module.css';
import { ServiceConfigurationManage } from '../../../xpanse-api/generated';
import { ConfigurationManageScriptText } from './ConfigurationManageScriptText';
import { getServiceConfigurationToolIcon } from './getServiceConfigurationToolIcon';

function ServiceConfigurationScripts({
    configurationManage,
}: {
    configurationManage: ServiceConfigurationManage;
}): React.JSX.Element {
    return (
        <>
            <div className={`${catalogStyles.catalogDetailsH6} ${catalogStyles.managementInfo}`}>
                &nbsp;Configuration Scripts
            </div>
            <Descriptions column={1} bordered className={oclDisplayStyles.oclDataInfoTable}>
                <Descriptions.Item label='Type'>
                    <img
                        src={getServiceConfigurationToolIcon(configurationManage.type.valueOf())}
                        alt={configurationManage.type}
                    />
                </Descriptions.Item>
                <Descriptions.Item label='Agent Version'>{configurationManage.agentVersion}</Descriptions.Item>
                <Descriptions.Item label='ConfigManage Scripts'>
                    <ConfigurationManageScriptText configManageScripts={configurationManage.configManageScripts} />
                </Descriptions.Item>
            </Descriptions>
        </>
    );
}

export default ServiceConfigurationScripts;