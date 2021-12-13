import { IAvailablePermissions, IPermission } from '../model';
import { Store } from './store';

export interface IUserPermission {
    project?: string;
    environment?: string;
    permission: string;
}

export interface IRole {
    id: number;
    name: string;
    description?: string;
    type: string;
}

export interface IUserRole {
    roleId: number;
    userId: number;
}
export interface IAccessStore extends Store<IRole, number> {
    getAvailablePermissions(): Promise<IAvailablePermissions>;
    getPermissionsForUser(userId: number): Promise<IUserPermission[]>;
    getPermissionsForRole(roleId: number): Promise<IUserPermission[]>;
    getRoles(): Promise<IRole[]>;
    getRolesForProject(projectId: string): Promise<IRole[]>;
    getRootRoles(): Promise<IRole[]>;
    removeRolesForProject(projectId: string): Promise<void>;
    getRolesForUserId(userId: number): Promise<IRole[]>;
    getUserIdsForRole(roleId: number): Promise<number[]>;
    addEnvironmentPermissionsToRole(
        role_id: number,
        permissions: IPermission[],
    ): Promise<void>;
    setupPermissionsForEnvironment(
        environmentName: string,
        permissions: string[],
    ): Promise<void>;
    addUserToRole(
        userId: number,
        roleId: number,
        projectId: string,
    ): Promise<void>;
    removeUserFromRole(userId: number, roleId: number): Promise<void>;
    removeRolesOfTypeForUser(userId: number, roleType: string): Promise<void>;
    createRole(
        name: string,
        type: string,
        project?: string,
        description?: string,
    ): Promise<IRole>;
    addPermissionsToRole(
        role_id: number,
        permissions: string[],
        environment?: string,
    ): Promise<void>;
    removePermissionFromRole(
        roleId: number,
        permission: string,
        projectId?: string,
    ): Promise<void>;
    getRootRoleForAllUsers(): Promise<IUserRole[]>;
}
