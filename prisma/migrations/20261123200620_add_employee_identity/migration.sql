-- CreateTable
CREATE TABLE "employee_identity" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,

    CONSTRAINT "employee_identity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_identity_id_key" ON "employee_identity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_identity_email_key" ON "employee_identity"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employee_identity_employee_id_key" ON "employee_identity"("employee_id");

-- AddForeignKey
ALTER TABLE "employee_identity" ADD CONSTRAINT "employee_identity_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
