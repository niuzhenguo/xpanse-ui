/*
 * SPDX-License-Identifier: Apache-2.0
 * SPDX-FileCopyrightText: Huawei Inc.
 */

import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Image, Input, InputNumber, Select, Table, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ColumnsType } from 'antd/es/table';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import credentialStyles from '../../../styles/credential.module.css';
import cspSelectStyles from '../../../styles/csp-select-drop-down.module.css';
import {
    AddIsvCloudCredentialData,
    AddUserCloudCredentialData,
    ApiError,
    CloudServiceProvider,
    CreateCredential,
    CredentialVariable,
    CredentialVariables,
    GetCredentialCapabilitiesData,
    GetCredentialTypesData,
    Response,
    addIsvCloudCredential,
    addUserCloudCredential,
    getActiveCsps,
    getCredentialCapabilities,
    getCredentialTypes,
} from '../../../xpanse-api/generated';
import { cspMap } from '../common/csp/CspLogo';
import { CredentialApiDoc } from './CredentialApiDoc';
import { CredentialTip } from './CredentialTip';
import useCredentialsListQuery from './query/queryCredentialsList';

function AddCredential({ role, onCancel }: { role: string | undefined; onCancel: () => void }): React.JSX.Element {
    const [form] = Form.useForm();
    const [currentCsp, setCurrentCsp] = useState<CredentialVariables['csp'] | undefined>(undefined);
    const [typeDisabled, setTypeDisabled] = useState<boolean>(true);
    const [nameDisable, setNameDisable] = useState<boolean>(true);
    const [currentType, setCurrentType] = useState<CredentialVariables['type'] | undefined>(undefined);
    const [currentName, setCurrentName] = useState<string | undefined>(undefined);
    const activeCspList = useRef<CredentialVariables['csp'][]>([]);
    const credentialTypeList = useRef<CredentialVariables['type'][]>([]);
    const nameList = useRef<string[]>([]);
    const [credentialVariableList, setCredentialVariableList] = useState<CredentialVariable[]>([]);
    const [tipMessage, setTipMessage] = useState<string>('');
    const [tipType, setTipType] = useState<'error' | 'success' | undefined>(undefined);
    const credentialsQuery = useCredentialsListQuery();

    const getActiveCspsQuery = useQuery({
        queryKey: ['getActiveCspsQuery'],
        queryFn: () => getActiveCsps(),
        staleTime: 60000,
    });

    const getTipInfo = (tipType: 'error' | 'success' | undefined, tipMessage: string) => {
        setTipType(tipType);
        setTipMessage(tipMessage);
    };

    const credentialTypesQuery = useQuery({
        queryKey: ['credentialTypesQuery', currentCsp],
        queryFn: () => {
            const data: GetCredentialTypesData = {
                cspName: currentCsp,
            };
            return getCredentialTypes(data);
        },
        staleTime: 60000,
        enabled: currentCsp !== undefined,
    });

    if (credentialTypesQuery.isSuccess) {
        credentialTypeList.current = credentialTypesQuery.data as CredentialVariables['type'][];
    }

    if (getActiveCspsQuery.isSuccess) {
        activeCspList.current = getActiveCspsQuery.data as CredentialVariables['csp'][];
    }

    const credentialCapabilitiesQuery = useQuery({
        queryKey: ['credentialCapabilitiesQuery', currentCsp, currentType],
        queryFn: () => {
            const data: GetCredentialCapabilitiesData = {
                cspName: currentCsp ?? 'huawei',
                type: currentType,
            };
            return getCredentialCapabilities(data);
        },
        staleTime: 60000,
        enabled: currentCsp !== undefined && currentType !== undefined,
    });

    if (credentialCapabilitiesQuery.isSuccess) {
        const credentials = credentialCapabilitiesQuery.data;
        const names: string[] = [];
        if (credentials.length > 0) {
            credentials.forEach((credential: CredentialVariables) => {
                names.push(credential.name);
            });
        }
        nameList.current = names;
    }

    if (credentialCapabilitiesQuery.error) {
        if (currentCsp !== undefined && currentType !== undefined) {
            if (
                credentialCapabilitiesQuery.error instanceof ApiError &&
                credentialCapabilitiesQuery.error.body &&
                typeof credentialCapabilitiesQuery.error.body === 'object' &&
                'details' in credentialCapabilitiesQuery.error.body
            ) {
                const response: Response = credentialCapabilitiesQuery.error.body as Response;
                getTipInfo('error', response.details.join());
            } else if (credentialCapabilitiesQuery.error instanceof Error) {
                getTipInfo('error', credentialCapabilitiesQuery.error.message);
            }
        }
    }

    const addCredentialRequest = useMutation({
        mutationFn: (createCredential: CreateCredential) => {
            return addCredentialByRole(createCredential);
        },
        onSuccess: () => {
            void credentialsQuery.refetch();
            getTipInfo('success', 'Adding Credential Successful.');
        },
        onError: (error: Error) => {
            if (error instanceof ApiError && error.body && typeof error.body === 'object' && 'details' in error.body) {
                const response: Response = error.body as Response;
                getTipInfo('error', response.details.join());
            } else {
                getTipInfo('error', error.message);
            }
        },
    });

    const addCredentialByRole = useCallback(
        (createCredential: CreateCredential) => {
            if (role === 'user') {
                const data: AddUserCloudCredentialData = {
                    requestBody: createCredential,
                };
                return addUserCloudCredential(data);
            } else {
                const data: AddIsvCloudCredentialData = {
                    requestBody: createCredential,
                };
                return addIsvCloudCredential(data);
            }
        },
        [role]
    );

    // useEffect to update Form DOM after the rendering for first 3 drop downs are completed.
    useEffect(() => {
        if (currentCsp && currentType && currentName) {
            const credentials = credentialCapabilitiesQuery.data;
            if (credentials !== undefined && credentials.length > 0) {
                credentials.forEach((credential: CredentialVariables) => {
                    if (
                        credential.csp === currentCsp &&
                        credential.type === currentType &&
                        credential.name === currentName
                    ) {
                        const credentialVariables: CredentialVariable[] = [];
                        credential.variables.forEach((credentialVariable) => {
                            credentialVariable.value = '';
                            credentialVariables.push(credentialVariable);
                        });
                        form.setFieldsValue({ variables: credentialVariables });
                        form.setFieldsValue({ description: credential.description });
                    }
                    setCredentialVariableList(credential.variables);
                });
            }
        }
    }, [currentCsp, currentName, currentType, form, credentialCapabilitiesQuery.data]);

    const handleCspSelect = useCallback(
        (cspName: CredentialVariables['csp']) => {
            setCurrentCsp(cspName);

            setTypeDisabled(false);
            setCurrentType(undefined);
            form.setFieldsValue({ type: undefined });

            setNameDisable(true);
            setCurrentName(undefined);
            form.setFieldsValue({ name: undefined });

            setCredentialVariableList([]);
            form.setFieldsValue({ variables: [] });
            form.setFieldsValue({ description: '' });

            getTipInfo(undefined, '');
        },
        [form]
    );

    const handleCredentialTypeSelect = useCallback(
        (type: CredentialVariables['type']) => {
            setCurrentType(type);

            setNameDisable(false);
            setCurrentName(undefined);
            form.setFieldsValue({ name: undefined });

            setCredentialVariableList([]);
            form.setFieldsValue({ variables: [] });
            form.setFieldsValue({ description: '' });
        },
        [form]
    );

    const handleCredentialNameSelect = useCallback(
        (name: string) => {
            setCurrentName(name);
            form.setFieldsValue({ name: name });
        },
        [form]
    );

    function setVariablesValue(fieldName: string, e: ChangeEvent<HTMLInputElement>) {
        credentialVariableList.forEach((credentialVariable) => {
            if (credentialVariable.name === fieldName) {
                credentialVariable.value = e.target.value;
            }
        });
        form.setFieldsValue({ variables: credentialVariableList });
    }

    const columns: ColumnsType<CredentialVariable> = [
        {
            title: 'name',
            dataIndex: 'name',
            ellipsis: {
                showTitle: false,
            },
            render: (value: string, record) =>
                record.isMandatory ? (
                    <Tooltip placement='topLeft' title={value}>
                        <span className={credentialStyles.addCredentialFormVariablesValue}>*</span>
                        {value}
                    </Tooltip>
                ) : (
                    <Tooltip placement='topLeft' title={value}>
                        {value}
                    </Tooltip>
                ),
        },
        {
            title: 'value',
            dataIndex: 'value',
            render: (value: string, record) =>
                record.isMandatory ? (
                    <Form.Item
                        name={record.name}
                        rules={[
                            {
                                required: !value,
                                message: 'mandatory field',
                            },
                        ]}
                    >
                        {record.isSensitive ? (
                            <Input.Password
                                onChange={(e) => {
                                    setVariablesValue(record.name, e);
                                }}
                            />
                        ) : (
                            <Input
                                onChange={(e) => {
                                    setVariablesValue(record.name, e);
                                }}
                            />
                        )}
                    </Form.Item>
                ) : (
                    <Form.Item name='value'>
                        {record.isSensitive ? (
                            <Input.Password
                                onChange={(e) => {
                                    setVariablesValue(record.name, e);
                                }}
                            />
                        ) : (
                            <Input
                                onChange={(e) => {
                                    setVariablesValue(record.name, e);
                                }}
                            />
                        )}
                    </Form.Item>
                ),
        },
        {
            title: 'description',
            dataIndex: 'description',
            ellipsis: {
                showTitle: false,
            },
            render: (description: string) => (
                <Tooltip placement='topLeft' title={description}>
                    {description}
                </Tooltip>
            ),
        },
    ];

    const isContainsEmpty = (credentialVariableList: CredentialVariable[]) => {
        if (credentialVariableList.length === 0) {
            return false;
        }
        return credentialVariableList.some(
            (credentialVariable) => credentialVariable.isMandatory && !credentialVariable.value
        );
    };

    const submit = (createCredential: CreateCredential) => {
        if (!isContainsEmpty(createCredential.variables)) {
            // necessary to create the object again since the values sent from form contains each credential variable also as parent key in JSON.
            // It must be only in the variables map.
            const createCredentialRequest: CreateCredential = {
                csp: createCredential.csp,
                description: createCredential.description,
                name: createCredential.name,
                type: createCredential.type,
                timeToLive: createCredential.timeToLive,
                variables: createCredential.variables,
            };
            addCredentialRequest.mutate(createCredentialRequest);
        }
    };

    const clear = () => {
        setCurrentCsp(undefined);
        setCurrentType(undefined);
        setCurrentName(undefined);
        nameList.current = [];
        credentialTypeList.current = [];
        setCredentialVariableList([]);
        form.resetFields();
    };

    const onReset = () => {
        addCredentialRequest.reset();
        clear();
        form.resetFields();
        getTipInfo(undefined, '');
        setTypeDisabled(true);
        setNameDisable(true);
    };

    const onRemove = () => {
        onReset();
        onCancel();
        void credentialsQuery.refetch();
    };

    return (
        <div>
            <CredentialApiDoc
                csp={currentCsp ?? 'huawei'}
                credentialType={currentType ?? 'variables'}
                styleClass={credentialStyles.addCredentialApiDoc}
            />

            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout='horizontal'
                style={{ maxWidth: 1000 }}
                onFinish={submit}
            >
                <CredentialTip type={tipType} msg={tipMessage} onRemove={onRemove}></CredentialTip>
                <div className={credentialStyles.credentialFormInput}>
                    <Form.Item label='Csp' name='csp' rules={[{ required: true, message: 'Please select Csp' }]}>
                        <Select loading={getActiveCspsQuery.isLoading} onSelect={handleCspSelect} size={'large'}>
                            {activeCspList.current.map((csp: CredentialVariables['csp']) => {
                                return (
                                    <Select.Option key={csp} value={csp} className={cspSelectStyles.cspSelectDropDown}>
                                        <Image
                                            className={credentialStyles.customSelect}
                                            width={100}
                                            preview={false}
                                            src={cspMap.get(csp.valueOf() as CloudServiceProvider['name'])?.logo}
                                        />
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Type'
                        name='type'
                        rules={[{ required: true, message: 'Please select the type of credential' }]}
                    >
                        <Select
                            loading={
                                (credentialTypesQuery.isLoading || credentialTypesQuery.isRefetching) &&
                                credentialTypesQuery.fetchStatus !== 'idle'
                            }
                            disabled={typeDisabled}
                            onSelect={handleCredentialTypeSelect}
                        >
                            {credentialTypeList.current.map((type: CredentialVariables['type']) => {
                                return (
                                    <Select.Option key={type} value={type}>
                                        {type}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Name'
                        name='name'
                        rules={[{ required: true, message: 'Please select the name of credential' }]}
                    >
                        <Select
                            loading={
                                (credentialTypesQuery.isLoading || credentialTypesQuery.isRefetching) &&
                                credentialTypesQuery.fetchStatus !== 'idle'
                            }
                            disabled={nameDisable}
                            onSelect={handleCredentialNameSelect}
                        >
                            {nameList.current.map((name: string) => {
                                return (
                                    <Select.Option key={name} value={name}>
                                        {name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label='Description' name='description'>
                        <TextArea rows={1} disabled={true} />
                    </Form.Item>
                    <Form.Item label='TimeToLive (In Seconds)' name='timeToLive'>
                        <InputNumber />
                    </Form.Item>
                    {credentialVariableList.length > 0 ? (
                        <Form.Item label='Variables' name='variables'>
                            <Table
                                rowKey={'name'}
                                pagination={false}
                                columns={columns}
                                dataSource={credentialVariableList}
                            ></Table>
                        </Form.Item>
                    ) : (
                        <></>
                    )}
                </div>
                <Form.Item className={credentialStyles.credentialFormButton}>
                    <Button
                        type='primary'
                        loading={addCredentialRequest.isPending}
                        disabled={addCredentialRequest.isSuccess}
                        htmlType='submit'
                    >
                        Add
                    </Button>
                    <Button
                        htmlType='button'
                        className={credentialStyles.addCredentialFormButtonReset}
                        onClick={onReset}
                    >
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddCredential;
