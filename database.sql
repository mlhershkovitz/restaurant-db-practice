-- database name restaurant-list
CREATE TABLE "restaurants" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100),
  "type" VARCHAR(200)
);

INSERT INTO "restaurants" ("name", "type")
VALUES ('Zelo', 'Pasta and Seafood'),
('Fowl Play', 'Bar Food');