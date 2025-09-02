// resources/js/hooks/useAuth.ts
import { usePage } from '@inertiajs/react';

// Define the User interface
export interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
}

// Define the Auth interface
export interface Auth {
    user: User | null;
}

// Define the page props interface that includes auth
export interface PageProps {
    auth: Auth;
    [key: string]: any;
}

// Define the return type of the hook
export interface UseAuthReturn {
    user: User | null;
    hasRole: (role: string) => boolean;
    hasPermission: (permission: string) => boolean;
    hasAnyRole: (roles: string[]) => boolean;
    hasAllRoles: (roles: string[]) => boolean;
    hasAnyPermission: (permissions: string[]) => boolean;
    hasAllPermissions: (permissions: string[]) => boolean;
    isAdmin: () => boolean;
    isAuthenticated: boolean;
}

export function useAuth(): UseAuthReturn {
    const { auth } = usePage<PageProps>().props;
    
    const hasRole = (role: string): boolean => {
        return auth.user?.roles?.includes(role) || false;
    };
    
    const hasPermission = (permission: string): boolean => {
        return auth.user?.permissions?.includes(permission) || false;
    };
    
    const hasAnyRole = (roles: string[]): boolean => {
        return roles.some(role => hasRole(role));
    };
    
    const hasAllRoles = (roles: string[]): boolean => {
        return roles.every(role => hasRole(role));
    };
    
    const hasAnyPermission = (permissions: string[]): boolean => {
        return permissions.some(permission => hasPermission(permission));
    };
    
    const hasAllPermissions = (permissions: string[]): boolean => {
        return permissions.every(permission => hasPermission(permission));
    };
    
    const isAdmin = (): boolean => hasRole('admin');
    
    const isAuthenticated = (): boolean => auth.user !== null;
    
    return {
        user: auth.user,
        hasRole,
        hasPermission,
        hasAnyRole,
        hasAllRoles,
        hasAnyPermission,
        hasAllPermissions,
        isAdmin,
        isAuthenticated: isAuthenticated(),
    };
}