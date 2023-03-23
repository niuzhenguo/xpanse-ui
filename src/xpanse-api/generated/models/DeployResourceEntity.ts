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

import { DeployServiceEntity } from './DeployServiceEntity';
import { HttpFile } from '../http/http';

export class DeployResourceEntity {
    'createTime'?: Date;
    'lastModifiedTime'?: Date;
    'id'?: string;
    'resourceId'?: string;
    'name'?: string;
    'kind'?: DeployResourceEntityKindEnum;
    'deployService'?: DeployServiceEntity;
    'property'?: { [key: string]: string };

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
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
            name: 'id',
            baseName: 'id',
            type: 'string',
            format: 'uuid',
        },
        {
            name: 'resourceId',
            baseName: 'resourceId',
            type: 'string',
            format: '',
        },
        {
            name: 'name',
            baseName: 'name',
            type: 'string',
            format: '',
        },
        {
            name: 'kind',
            baseName: 'kind',
            type: 'DeployResourceEntityKindEnum',
            format: '',
        },
        {
            name: 'deployService',
            baseName: 'deployService',
            type: 'DeployServiceEntity',
            format: '',
        },
        {
            name: 'property',
            baseName: 'property',
            type: '{ [key: string]: string; }',
            format: '',
        },
    ];

    static getAttributeTypeMap() {
        return DeployResourceEntity.attributeTypeMap;
    }

    public constructor() {}
}

export type DeployResourceEntityKindEnum = 'vm' | 'container' | 'public_ip' | 'vpc';
