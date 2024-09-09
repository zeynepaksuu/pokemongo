-- SQLite
-- UUID fonksiyonunu etkinleştir
PRAGMA foreign_keys = ON;

-- user tablosunu oluştur
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- lobbies tablosunu oluştur
CREATE TABLE IF NOT EXISTS lobbies (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' || substr(hex(randomblob(2)), 2) || '-' || substr('89ab', 1 + (abs(random()) % 4), 1) || substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6)))),
    creator_email TEXT NOT NULL,
    other_player_email TEXT,
    title TEXT,
    FOREIGN KEY (creator_email) REFERENCES user(email),
    FOREIGN KEY (other_player_email) REFERENCES user(email)
);