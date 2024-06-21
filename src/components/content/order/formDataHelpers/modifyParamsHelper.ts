/*
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Huawei Inc.
 */

import { DeployVariable } from '../../../../xpanse-api/generated';
import { DeployParam } from '../types/DeployParam';

export const getModifyParams = (variables: DeployVariable[]): DeployParam[] => {
    const params: DeployParam[] = [];

    if (variables.length > 0) {
        for (const param of variables) {
            params.push({
                name: param.name,
                kind: param.kind,
                type: param.dataType,
                example: param.example ?? '',
                description: param.description,
                value: param.value ?? '',
                mandatory: param.mandatory,
                sensitiveScope: param.sensitiveScope ?? 'none',
                valueSchema: param.valueSchema as Record<string, unknown>,
                autoFill: param.autoFill ?? undefined,
            });
        }
    }
    return params;
};
