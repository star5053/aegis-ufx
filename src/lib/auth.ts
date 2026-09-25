import { createHash } from "crypto";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import type { User, UserRole } from "@prisma/client";

const COOKIE_NAME = "aegis_session";
const SESSION_DAYS = 14;

function getSecret() {
  const secret =
    process.env.AUTH_SECRET ||
    (process.env.NODE_ENV !== "production"
      ? "aegis-ufx-mvp-dev-secret"
      : undefined);
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

/** Fast deterministic hash for session lookup (not for passwords). */
export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export type SessionUser = {
  id: string;
  publicId: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  role: UserRole;
  twoFactorEnabled: boolean;
  applicationId: string | null;
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function toSessionUser(user: User): SessionUser {
  return {
    id: user.id,
    publicId: user.publicId,
    email: user.email,
    username: user.username,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    role: user.role,
    twoFactorEnabled: user.twoFactorEnabled,
    applicationId: user.applicationId,
  };
}

function cookieOptions(expiresAt: Date) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  };
}

export async function createSession(userId: string, ip?: string | null) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DAYS);

  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getSecret());

  await prisma.session.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      deviceName: "Web Client",
      ip: ip ?? null,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, cookieOptions(expiresAt));

  return token;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) {
    await prisma.session.deleteMany({
      where: { tokenHash: hashToken(token) },
    });
  }
  cookieStore.set(COOKIE_NAME, "", {
    ...cookieOptions(new Date(0)),
    maxAge: 0,
  });
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const userId = payload.sub;
    if (!userId) return null;

    const session = await prisma.session.findUnique({
      where: { tokenHash: hashToken(token) },
    });
    if (!session || session.expiresAt < new Date()) {
      return null;
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.status !== "ACTIVE") return null;

    return toSessionUser(user);
  } catch {
    return null;
  }
}

export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export async function nextPublicId(prefix = "UFX") {
  const count = await prisma.user.count();
  return `${prefix}-${String(count + 1).padStart(6, "0")}`;
}
