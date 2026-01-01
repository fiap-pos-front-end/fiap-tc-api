-- RedefineTables
PRAGMA foreign_keys=OFF;

-- Cria a nova tabela com o tipo correto
CREATE TABLE "Transaction_new" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "amount" TEXT NOT NULL,
    "attachments" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_categoryId_fkey"
      FOREIGN KEY ("categoryId") REFERENCES "Category"("id")
      ON DELETE RESTRICT ON UPDATE CASCADE,

    CONSTRAINT "Transaction_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Copia os dados (converte INT → TEXT)
INSERT INTO "Transaction_new" (
    id, type, date, amount, attachments, categoryId, userId
)
SELECT
    id,
    type,
    date,
    CAST(amount AS TEXT),
    attachments,
    categoryId,
    userId
FROM "Transaction";

-- Remove tabela antiga
DROP TABLE "Transaction";

-- Renomeia a nova
ALTER TABLE "Transaction_new" RENAME TO "Transaction";

PRAGMA foreign_keys=ON;
