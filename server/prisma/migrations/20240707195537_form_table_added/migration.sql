-- CreateTable
CREATE TABLE "Form" (
    "form_id" SERIAL NOT NULL,
    "form_title" TEXT NOT NULL,
    "form_created" TIMESTAMP(3) NOT NULL,
    "form_description" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("form_id")
);

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
