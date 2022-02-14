-- Deploy days_in_paris:alter_columns_name to pg

BEGIN;

ALTER TABLE user_info
RENAME TO "user";

ALTER TABLE "user"
RENAME COLUMN pseudo TO first_name;
ADD COLUMN last_name VARCHAR(32) NOT NULL;
RENAME COLUMN psw TO password;
ALTER COLUMN password TYPE VARCHAR(64);
ADD COLUMN is_admin BOOLEAN DEFAULT false,
ADD CONSTRAINT constr_unique UNIQUE email;

COMMIT;
