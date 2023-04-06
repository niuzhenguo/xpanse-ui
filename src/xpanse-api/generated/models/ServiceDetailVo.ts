/*
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Huawei Inc.
 */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: v0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { CreateRequest } from './CreateRequest';
import { DeployResource } from './DeployResource';

export class ServiceDetailVo {
    /**
     * The ID of the service
     */
    'id': string;
    /**
     * The catalog of the service
     */
    'category': ServiceDetailVoCategoryEnum;
    /**
     * The name of the service
     */
    'name': string;
    /**
     * The version of the service
     */
    'version': string;
    /**
     * The provider of the service
     */
    'csp': ServiceDetailVoCspEnum;
    /**
     * The flavor of the service
     */
    'flavor'?: string;
    /**
     * The state of the service
     */
    'serviceState': ServiceDetailVoServiceStateEnum;
    /**
     * Time of register service.
     */
    'createTime': Date;
    /**
     * Time of update service.
     */
    'lastModifiedTime': Date;
    'createRequest': CreateRequest;
    /**
     * The resource list of the deployed service.
     */
    'deployResources'?: Array<DeployResource>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'id',
            baseName: 'id',
            type: 'string',
            format: 'uuid',
        },
        {
            name: 'category',
            baseName: 'category',
            type: 'ServiceDetailVoCategoryEnum',
            format: '',
        },
        {
            name: 'name',
            baseName: 'name',
            type: 'string',
            format: '',
        },
        {
            name: 'version',
            baseName: 'version',
            type: 'string',
            format: '',
        },
        {
            name: 'csp',
            baseName: 'csp',
            type: 'ServiceDetailVoCspEnum',
            format: '',
        },
        {
            name: 'flavor',
            baseName: 'flavor',
            type: 'string',
            format: '',
        },
        {
            name: 'serviceState',
            baseName: 'serviceState',
            type: 'ServiceDetailVoServiceStateEnum',
            format: '',
        },
        {
            name: 'createTime',
            baseName: 'createTime',
            type: 'Date',
            format: 'date-time',
        },
        {
            name: 'lastModifiedTime',
            baseName: 'lastModifiedTime',
            type: 'Date',
            format: 'date-time',
        },
        {
            name: 'createRequest',
            baseName: 'createRequest',
            type: 'CreateRequest',
            format: '',
        },
        {
            name: 'deployResources',
            baseName: 'deployResources',
            type: 'Array<DeployResource>',
            format: '',
        },
    ];

    static getAttributeTypeMap() {
        return ServiceDetailVo.attributeTypeMap;
    }

    public constructor() {}
}

export type ServiceDetailVoCategoryEnum =
    | 'ai'
    | 'compute'
    | 'container'
    | 'storage'
    | 'network'
    | 'database'
    | 'mediaService'
    | 'security'
    | 'middleware'
    | 'others';
export type ServiceDetailVoCspEnum = 'aws' | 'azure' | 'alicloud' | 'huawei' | 'openstack' | 'flexibleEngine';
export type ServiceDetailVoServiceStateEnum =
    | 'REGISTERED'
    | 'UPDATED'
    | 'DEPLOYING'
    | 'DEPLOY_SUCCESS'
    | 'DEPLOY_FAILED'
    | 'DESTROYING'
    | 'DESTROY_SUCCESS'
    | 'DESTROY_FAILED';
