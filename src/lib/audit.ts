import type { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export async function writeAuditLog(input: {
  actorId?: string | null;
  action: string;
  targetType?: string;
  targetId?: string;
  meta?: Prisma.InputJsonValue;
  ip?: string | null;
}) {
  return prisma.auditLog.create({
    data: {
      actorId: input.actorId ?? null,
      action: input.action,
      targetType: input.targetType,
      targetId: input.targetId,
      meta: input.meta ?? undefined,
      ip: input.ip ?? null,
    },
  });
}
