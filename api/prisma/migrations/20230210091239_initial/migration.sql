-- CreateTable
CREATE TABLE "Weather" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "queriedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "city" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lon" REAL NOT NULL,
    "temp" REAL NOT NULL,
    "pressure" REAL NOT NULL,
    "humidity" REAL NOT NULL,
    "windDeg" REAL NOT NULL,
    "windSpeed" REAL NOT NULL,
    "windGust" REAL NOT NULL,
    "cloud" REAL NOT NULL,
    "rain" REAL NOT NULL
);
