-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "is_admin" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sweets" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sweets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "sweet_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price_per_unit" DECIMAL(10,2) NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,
    "sweet_name" VARCHAR(255) NOT NULL,
    "sweet_category" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_sweets_name" ON "sweets"("name");

-- CreateIndex
CREATE INDEX "idx_sweets_category" ON "sweets"("category");

-- CreateIndex
CREATE INDEX "idx_sweets_price" ON "sweets"("price");

-- CreateIndex
CREATE INDEX "idx_purchases_created_at" ON "purchases"("created_at" DESC);

-- CreateIndex
CREATE INDEX "idx_purchases_sweet_id" ON "purchases"("sweet_id");

-- CreateIndex
CREATE INDEX "idx_purchases_user_id" ON "purchases"("user_id");

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_sweet_id_fkey" FOREIGN KEY ("sweet_id") REFERENCES "sweets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
