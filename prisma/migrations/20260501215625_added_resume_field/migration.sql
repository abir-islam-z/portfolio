-- AlterTable
ALTER TABLE "Footer" ALTER COLUMN "bio" SET DEFAULT 'Full Stack Developer specializing in modern web technologies. Based in Silicon Valley, CA.',
ALTER COLUMN "email" SET DEFAULT 'hello@johndoe.com';

-- AlterTable
ALTER TABLE "Hero" ADD COLUMN     "resumeUrl" TEXT NOT NULL DEFAULT '#',
ALTER COLUMN "title" SET DEFAULT 'Meet John';
