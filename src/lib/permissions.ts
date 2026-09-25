import { UserRole } from "@prisma/client";

export const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_OWNER: "Super Owner",
  PLATFORM_ADMIN: "Platform Admin",
  FINANCE_ADMIN: "Finance Admin",
  MODERATOR: "Moderator",
  SUPPORT: "Support",
  DEVELOPER: "Developer",
  USER: "User",
};

export const ROLE_CAPABILITIES: Record<UserRole, string[]> = {
  SUPER_OWNER: [
    "Full platform control",
    "Manage owner accounts",
    "Financial configuration",
    "All moderation & security",
  ],
  PLATFORM_ADMIN: [
    "Manage applications",
    "Manage users",
    "View analytics",
    "System configuration",
  ],
  FINANCE_ADMIN: [
    "View wallet ledgers",
    "Approve withdrawals",
    "Configure coin rates",
    "Refunds & fees",
  ],
  MODERATOR: [
    "Review reports",
    "Suspend content",
    "Investigate users",
  ],
  SUPPORT: ["View user profiles", "Assist account recovery", "Read audit logs"],
  DEVELOPER: ["API keys", "Webhooks", "App registration", "Usage logs"],
  USER: ["Use UFX application features"],
};

export function canAccessControlCenter(role: UserRole): boolean {
  return role !== UserRole.USER;
}

export function canManageUsers(role: UserRole): boolean {
  return (
    role === UserRole.SUPER_OWNER ||
    role === UserRole.PLATFORM_ADMIN ||
    role === UserRole.MODERATOR
  );
}
