// Role-based permissions for document actions
export const ROLES = {
  EMPLOYEE: 'Employee',
  REVIEWER: 'Reviewer',
  ADMIN: 'Admin'
};

export const PERMISSIONS = {
  VIEW: 'view',
  EDIT: 'edit',
  DELETE: 'delete',
  REVIEW: 'review',
  APPROVE: 'approve'
};

// Permission matrix defining what each role can do
const rolePermissions = {
  [ROLES.EMPLOYEE]: {
    own: [PERMISSIONS.VIEW, PERMISSIONS.EDIT, PERMISSIONS.DELETE],
    others: [PERMISSIONS.VIEW]
  },
  [ROLES.REVIEWER]: {
    own: [PERMISSIONS.VIEW, PERMISSIONS.EDIT, PERMISSIONS.DELETE],
    others: [PERMISSIONS.VIEW, PERMISSIONS.REVIEW, PERMISSIONS.APPROVE]
  },
  [ROLES.ADMIN]: {
    own: [PERMISSIONS.VIEW, PERMISSIONS.EDIT, PERMISSIONS.DELETE, PERMISSIONS.REVIEW, PERMISSIONS.APPROVE],
    others: [PERMISSIONS.VIEW, PERMISSIONS.EDIT, PERMISSIONS.DELETE, PERMISSIONS.REVIEW, PERMISSIONS.APPROVE]
  }
};

/**
 * Check if a user has permission to perform an action on a document
 * @param {string} userRole - The role of the current user
 * @param {string} userName - The name of the current user
 * @param {string} documentOwner - The name of the document owner
 * @param {string} permission - The permission to check
 * @returns {boolean} - Whether the user has permission
 */
export const hasPermission = (userRole, userName, documentOwner, permission) => {
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
 * @param {string} userRole - The role of the current user
 * @param {string} userName - The name of the current user
 * @param {string} documentOwner - The name of the document owner
 * @returns {Array} - Array of available permissions
 */
export const getAvailableActions = (userRole, userName, documentOwner) => {
  const isOwner = userName === documentOwner;
  const permissions = rolePermissions[userRole];

  if (!permissions) return [];

  return isOwner ? permissions.own : permissions.others;
};
