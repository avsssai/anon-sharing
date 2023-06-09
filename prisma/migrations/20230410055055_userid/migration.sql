/*
  Warnings:

  - Added the required column `userID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "csrf_token" TEXT NOT NULL
);
INSERT INTO "new_User" ("csrf_token", "id", "name") SELECT "csrf_token", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
