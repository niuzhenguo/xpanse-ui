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
 * - `fix_env`: Values for variable of this type are defined by the managed service provider  in the OCL template. Runtime will inject it to deployer as environment variables.  This variable is not visible to the end user. - `fix_variable`: Values for variable of this type are defined by the managed service  provider in the OCL template. Runtime will inject it to deployer as usual variables.  This variable is not visible to the end user. - `env`: Value for a variable of this type can be provided by end user.  If marked as mandatory then end user must provide value to this variable.  If marked as optional and if end user does not provide it,  then the fallback value to this variable is read by runtime (it can read from other sources,  e.g., OS env variables). This variable is injected as an environment   variable to the deployer. - `variable`: Value for a variable of this type can be provided by end user.  If marked as mandatory then end user must provide value to this variable.  If marked as optional and if end user does not provide it,  then the fallback value to this variable is read by runtime (it can read from other sources,  e.g., OS env variables). This variable is injected as a regular variable to the deployer. - `env_env`: Value to this variable is read by runtime  (it can read from other sources, e.g., OS env variables)  and injected as an environment variable to the deployer.  End user cannot see or change this variable. - `env_variable`: Value to this variable is read by runtime  (it can read from other sources, e.g., OS env variables)  and injected as a regular variable to the deployer.  End user cannot see or change this variable.
 */
export type DeployVariableKind = 'fix_env' | 'fix_variable' | 'env' | 'variable' | 'env_env' | 'env_variable';
