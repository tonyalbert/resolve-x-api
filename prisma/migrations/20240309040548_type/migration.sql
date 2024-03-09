-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'user',
    "companyId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("companyId", "createdAt", "email", "id", "name", "password", "phone", "position", "type", "updatedAt") SELECT "companyId", "createdAt", "email", "id", "name", "password", "phone", "position", "type", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_operators" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'operator',
    "companyId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "operators_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_operators" ("companyId", "createdAt", "email", "id", "name", "password", "phone", "position", "type", "updatedAt") SELECT "companyId", "createdAt", "email", "id", "name", "password", "phone", "position", "type", "updatedAt" FROM "operators";
DROP TABLE "operators";
ALTER TABLE "new_operators" RENAME TO "operators";
CREATE UNIQUE INDEX "operators_email_key" ON "operators"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
