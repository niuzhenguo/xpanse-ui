/*
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Huawei Inc.
 */

/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployedService = {
    /**
     * The ID of the service
     */
    id: string;
    /**
     * The catalog of the service
     */
    category: DeployedService.category;
    /**
     * The name of the service
     */
    name: string;
    /**
     * Customer's name for the service. Used only for customer's reference.If not provided, this value will be auto-generated
     */
    customerServiceName?: string;
    /**
     * The version of the service
     */
    version: string;
    /**
     * The provider of the service
     */
    csp: DeployedService.csp;
    /**
     * The flavor of the service
     */
    flavor?: string;
    /**
     * The deployment state of the service
     */
    serviceDeploymentState: DeployedService.serviceDeploymentState;
    /**
     * The run state of the service
     */
    serviceState: DeployedService.serviceState;
    /**
     * Defines which cloud service account is used for deploying cloud resources.
     */
    serviceHostingType: DeployedService.serviceHostingType;
    /**
     * Time of register service.
     */
    createTime: string;
    /**
     * Time of update service.
     */
    lastModifiedTime: string;
    /**
     * Time of start service.
     */
    lastStartedAt?: string;
    /**
     * Time of stop service.
     */
    lastStoppedAt?: string;
};

export namespace DeployedService {
    /**
     * The catalog of the service
     */
    export enum category {
        AI = 'ai',
        COMPUTE = 'compute',
        CONTAINER = 'container',
        STORAGE = 'storage',
        NETWORK = 'network',
        DATABASE = 'database',
        MEDIA_SERVICE = 'mediaService',
        SECURITY = 'security',
        MIDDLEWARE = 'middleware',
        OTHERS = 'others',
    }

    /**
     * The provider of the service
     */
    export enum csp {
        HUAWEI = 'huawei',
        FLEXIBLE_ENGINE = 'flexibleEngine',
        OPENSTACK = 'openstack',
        SCS = 'scs',
        ALICLOUD = 'alicloud',
        AWS = 'aws',
        AZURE = 'azure',
        GOOGLE = 'google',
    }

    /**
     * The deployment state of the service
     */
    export enum serviceDeploymentState {
        DEPLOYING = 'deploying',
        DEPLOYMENT_SUCCESSFUL = 'deployment successful',
        DEPLOYMENT_FAILED = 'deployment failed',
        DESTROYING = 'destroying',
        DESTROY_SUCCESSFUL = 'destroy successful',
        DESTROY_FAILED = 'destroy failed',
        MIGRATING = 'migrating',
        MIGRATION_SUCCESSFUL = 'migration successful',
        MIGRATION_FAILED = 'migration failed',
        MANUAL_CLEANUP_REQUIRED = 'manual cleanup required',
        ROLLBACK_FAILED = 'rollback failed',
    }

    /**
     * The run state of the service
     */
    export enum serviceState {
        NOT_RUNNING = 'not running',
        RUNNING = 'running',
        STARTING = 'starting',
        STARTING_FAILED = 'starting failed',
        STOPPING = 'stopping',
        STOPPED = 'stopped',
        STOPPING_FAILED = 'stopping failed',
    }

    /**
     * Defines which cloud service account is used for deploying cloud resources.
     */
    export enum serviceHostingType {
        SELF = 'self',
        SERVICE_VENDOR = 'service-vendor',
    }
}
