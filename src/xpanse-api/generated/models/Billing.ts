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

import { HttpFile } from '../http/http';

/**
 * The billing policy of the managed service
 */
export class Billing {
    /**
     * The business model of the managed service
     */
    'model': string;
    /**
     * The rental period of the managed service
     */
    'period': BillingPeriodEnum;
    /**
     * The billing currency of the managed service, valid values: euro,uso
     */
    'currency': BillingCurrencyEnum;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
        {
            name: 'model',
            baseName: 'model',
            type: 'string',
            format: '',
        },
        {
            name: 'period',
            baseName: 'period',
            type: 'BillingPeriodEnum',
            format: '',
        },
        {
            name: 'currency',
            baseName: 'currency',
            type: 'BillingCurrencyEnum',
            format: '',
        },
    ];

    static getAttributeTypeMap() {
        return Billing.attributeTypeMap;
    }

    public constructor() {}
}

export type BillingPeriodEnum = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type BillingCurrencyEnum = 'usd' | 'euro' | 'gbp' | 'cad' | 'dem' | 'frf' | 'cny';
