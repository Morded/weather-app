/*
  Warnings:

  - You are about to drop the column `lat` on the `Weather` table. All the data in the column will be lost.
  - You are about to drop the column `lon` on the `Weather` table. All the data in the column will be lost.
  - Added the required column `icon` to the `Weather` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Coordinate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lon" REAL NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Weather" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "queriedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "city" TEXT NOT NULL,
    "temp" REAL NOT NULL,
    "pressure" REAL NOT NULL,
    "humidity" REAL NOT NULL,
    "windDeg" REAL NOT NULL,
    "windSpeed" REAL NOT NULL,
    "windGust" REAL NOT NULL,
    "cloud" REAL NOT NULL,
    "rain" REAL NOT NULL,
    "icon" TEXT NOT NULL
);
INSERT INTO "new_Weather" ("city", "cloud", "humidity", "id", "pressure", "queriedAt", "rain", "temp", "windDeg", "windGust", "windSpeed") SELECT "city", "cloud", "humidity", "id", "pressure", "queriedAt", "rain", "temp", "windDeg", "windGust", "windSpeed" FROM "Weather";
DROP TABLE "Weather";
ALTER TABLE "new_Weather" RENAME TO "Weather";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
