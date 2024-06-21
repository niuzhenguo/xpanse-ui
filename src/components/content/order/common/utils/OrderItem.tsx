/*
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Huawei Inc.
 */

import React from 'react';
import { DeployRequest } from '../../../../../xpanse-api/generated';
import { BooleanInput } from '../../formElements/BooleanInput';
import { NumberInput } from '../../formElements/NumberInput';
import { TextInput } from '../../formElements/TextInput';
import { DeployParam } from '../../types/DeployParam';

export function OrderItem({
    item,
    csp,
    region,
}: {
    item: DeployParam;
    csp: DeployRequest['csp'];
    region: string;
}): React.JSX.Element {
    if (item.type === 'string') {
        return <TextInput item={item} csp={csp} region={region} />;
    }
    if (item.type === 'number') {
        return <NumberInput item={item} />;
    }
    if (item.type === 'boolean') {
        return <BooleanInput item={item} />;
    }

    return <></>;
}
