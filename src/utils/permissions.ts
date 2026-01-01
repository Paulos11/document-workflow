export const ROLES = {
  EMPLOYEE: 'Employee',
  REVIEWER: 'Reviewer',
  ADMIN: 'Admin'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const PERMISSIONS = {
  VIEW: 'view',
  EDIT: 'edit',
  REVIEW: 'review',
  APPROVE: 'approve'
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

interface RolePermissions {
  own: Permission[];
  others: Permission[];
}

const rolePermissions: Record<Role, RolePermissions> = {
  [ROLES.EMPLOYEE]: {
    own: [PERMISSIONS.VIEW, PERMISSIONS.EDIT],
    others: [PERMISSIONS.VIEW]
  },
  [ROLES.REVIEWER]: {
    own: [PERMISSIONS.VIEW, PERMISSIONS.EDIT],
    others: [PERMISSIONS.VIEW, PERMISSIONS.REVIEW, PERMISSIONS.APPROVE]
  },
  [ROLES.ADMIN]: {
    own: [PERMISSIONS.VIEW, PERMISSIONS.EDIT, PERMISSIONS.REVIEW, PERMISSIONS.APPROVE],
    others: [PERMISSIONS.VIEW, PERMISSIONS.EDIT, PERMISSIONS.REVIEW, PERMISSIONS.APPROVE]
  }
};

/**
 * Check if a user has permission to perform an action on a document
 * @param userRole - The role of the current user
 * @param userName - The name of the current user
 * @param documentOwner - The name of the document owner
 * @param permission - The permission to check
 * @returns Whether the user has permission
 */
export const hasPermission = (
  userRole: Role,
  userName: string,
  documentOwner: string,
  permission: Permission
): boolean => {
  const isOwner = userName === documentOwner;
  const permissions = rolePermissions[userRole];

  if (!permissions) return false;

  if (isOwner) {
    return permissions.own.includes(permission);
  } else {
    return permissions.others.includes(permission);
  }
};

/**
 * Get available actions for a user on a document
 * @param userRole - The role of the current user
 * @param userName - The name of the current user
 * @param documentOwner - The name of the document owner
 * @returns Array of available permissions
 */
export const getAvailableActions = (
  userRole: Role,
  userName: string,
  documentOwner: string
): Permission[] => {
  const isOwner = userName === documentOwner;
  const permissions = rolePermissions[userRole];

  if (!permissions) return [];

  return isOwner ? permissions.own : permissions.others;
};
